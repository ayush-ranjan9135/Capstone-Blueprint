/**
 * Structured telemetry service for application logging.
 * In production, this can be easily adapted to send logs to CloudWatch, Datadog, or Sentry.
 */
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogPayload {
  level: LogLevel;
  message: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

class Logger {
  private emit(level: LogLevel, message: string, metadata?: Record<string, unknown>) {
    const payload: LogPayload = {
      level,
      message,
      timestamp: new Date().toISOString(),
      metadata,
    };

    // For local development, emit structured JSON to the console
    const logString = JSON.stringify(payload);
    
    switch (level) {
      case 'info':
        console.info(logString);
        break;
      case 'warn':
        console.warn(logString);
        break;
      case 'error':
        console.error(logString);
        break;
      case 'debug':
        console.debug(logString);
        break;
    }
  }

  info(message: string, metadata?: Record<string, unknown>) {
    this.emit('info', message, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>) {
    this.emit('warn', message, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>) {
    this.emit('error', message, metadata);
  }

  debug(message: string, metadata?: Record<string, unknown>) {
    this.emit('debug', message, metadata);
  }
}

export const logger = new Logger();
