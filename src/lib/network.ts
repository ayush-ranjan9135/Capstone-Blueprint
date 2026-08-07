import { logger } from './logger';

interface RetryOptions {
  maxRetries?: number;
  initialDelayMs?: number;
  maxDelayMs?: number;
}

/**
 * Executes a fetch request with exponential backoff and jitter.
 * Designed for reliability in the face of transient network or server errors.
 */
export async function fetchWithRetry(
  input: RequestInfo | URL,
  init?: RequestInit,
  options: RetryOptions = {}
): Promise<Response> {
  const { maxRetries = 3, initialDelayMs = 500, maxDelayMs = 5000 } = options;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const response = await fetch(input, init);

      if (response.ok) {
        return response;
      }

      // We only retry on 5xx server errors or 429 Too Many Requests
      if (response.status < 500 && response.status !== 429) {
        return response;
      }

      logger.warn(`Fetch returned ${response.status}`, { url: input, attempt });
      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      if (attempt === maxRetries) {
        logger.error('Max retries reached', { url: input, attempt });
        throw error;
      }

      attempt++;
      // Exponential backoff with jitter
      const backoff = Math.min(initialDelayMs * Math.pow(2, attempt - 1), maxDelayMs);
      const jitter = Math.random() * 200; // up to 200ms jitter
      const delay = backoff + jitter;

      logger.warn(`Network request failed. Retrying in ${Math.round(delay)}ms...`, {
        url: input,
        attempt,
        error: String(error),
      });

      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error('Unreachable: fetchWithRetry exceeded max retries');
}
