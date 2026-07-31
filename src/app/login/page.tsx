'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('alex@taskmatrix.dev');
  const [password, setPassword] = useState('password123');
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    await login(email, password);
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) router.push('/dashboard');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .login-root {
          min-height: 100vh;
          background: #080810;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', system-ui, sans-serif;
        }

        /* ── Mesh gradient orbs ── */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          animation: orb-drift 18s ease-in-out infinite alternate;
        }
        .orb-1 {
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -200px; left: -100px;
          animation-duration: 20s;
        }
        .orb-2 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
          bottom: -150px; right: -100px;
          animation-duration: 25s;
          animation-direction: alternate-reverse;
        }
        .orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
          top: 50%; left: 60%;
          animation-duration: 15s;
        }
        @keyframes orb-drift {
          0%   { transform: translate(0, 0) scale(1); }
          50%  { transform: translate(30px, -20px) scale(1.05); }
          100% { transform: translate(-20px, 30px) scale(0.97); }
        }

        /* ── Dot grid ── */
        .dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.045) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
        }

        /* ── Vignette ── */
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(8,8,16,0.85) 100%);
          pointer-events: none;
        }

        /* ── Glass card ── */
        .glass-card {
          position: relative;
          width: 100%;
          max-width: 400px;
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 40px 36px;
          backdrop-filter: blur(32px);
          -webkit-backdrop-filter: blur(32px);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.04) inset,
            0 32px 64px rgba(0,0,0,0.5),
            0 0 80px rgba(99,102,241,0.06);
          z-index: 10;
        }

        /* ── Logo ── */
        .logo-mark {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(99,102,241,0.4);
        }
        .logo-name {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.3px;
        }

        /* ── Headline ── */
        .headline {
          font-size: 24px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.5px;
          color: #fff;
          margin: 0 0 4px;
        }
        .subline {
          font-size: 13px;
          color: rgba(255,255,255,0.38);
          font-weight: 400;
          margin: 0;
        }

        /* ── Form fields ── */
        .field-label {
          display: block;
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.45);
          margin-bottom: 6px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
        }
        .field-wrap {
          position: relative;
        }
        .field-input {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 14px;
          color: #fff;
          outline: none;
          transition: border-color 0.15s ease, background 0.15s ease, box-shadow 0.15s ease;
          font-family: inherit;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus {
          border-color: rgba(99,102,241,0.7);
          background: rgba(99,102,241,0.06);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.15);
        }
        .field-input.has-error {
          border-color: rgba(239,68,68,0.6);
        }

        /* ── Forgot link ── */
        .forgot-link {
          font-size: 12px;
          color: rgba(99,102,241,0.8);
          text-decoration: none;
          cursor: pointer;
          background: none;
          border: none;
          font-family: inherit;
          padding: 0;
          transition: color 0.15s;
        }
        .forgot-link:hover { color: #a5b4fc; }

        /* ── Primary button ── */
        .btn-primary {
          width: 100%;
          padding: 11px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%);
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          letter-spacing: -0.1px;
          transition: opacity 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease;
          box-shadow: 0 4px 16px rgba(99,102,241,0.3);
        }
        .btn-primary:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.4);
        }
        .btn-primary:active:not(:disabled) {
          transform: translateY(0);
        }
        .btn-primary:disabled {
          opacity: 0.55;
          cursor: not-allowed;
        }

        /* ── Divider ── */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255,255,255,0.15);
          font-size: 11px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .divider::before,
        .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.08);
        }

        /* ── OAuth buttons ── */
        .btn-oauth {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 9px 14px;
          border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.09);
          background: rgba(255,255,255,0.03);
          color: rgba(255,255,255,0.65);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          font-family: inherit;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
          white-space: nowrap;
        }
        .btn-oauth:hover {
          border-color: rgba(255,255,255,0.18);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.85);
        }

        /* ── Error banner ── */
        .error-banner {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 9px;
          padding: 10px 12px;
          font-size: 13px;
          color: rgba(252,165,165,1);
        }

        /* ── Demo hint ── */
        .demo-hint {
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.18);
          border-radius: 9px;
          padding: 9px 12px;
          font-size: 12px;
          color: rgba(165,180,252,0.7);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .demo-hint strong { color: rgba(165,180,252,1); font-weight: 500; }

        /* ── Footer ── */
        .login-footer {
          font-size: 13px;
          color: rgba(255,255,255,0.28);
          text-align: center;
        }
        .login-footer span {
          color: rgba(99,102,241,0.85);
          cursor: pointer;
          font-weight: 500;
          transition: color 0.15s;
        }
        .login-footer span:hover { color: #a5b4fc; }

        /* ── Spinner ── */
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 14px; height: 14px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
          display: inline-block;
          vertical-align: middle;
          margin-right: 6px;
        }

        /* ── Fade in ── */
        @keyframes card-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .card-in { animation: card-in 0.45s cubic-bezier(.22,1,.36,1) both; }

        /* ── Top badge ── */
        .top-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 999px;
          padding: 3px 10px 3px 6px;
          font-size: 11px;
          color: rgba(165,180,252,0.85);
          font-weight: 500;
          margin-bottom: 20px;
        }
        .badge-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #818cf8;
          flex-shrink: 0;
        }
      `}</style>

      <div className="login-root">
        {/* Background layers */}
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="dot-grid" />
        <div className="vignette" />

        {/* Card */}
        <div className="glass-card card-in">
          {/* Logo row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
            <div className="logo-mark">
              <svg viewBox="0 0 36 36" fill="none" width="20" height="20">
                <rect x="4"  y="4"  width="10" height="10" rx="2.5" fill="white" fillOpacity="1"/>
                <rect x="16" y="4"  width="10" height="10" rx="2.5" fill="white" fillOpacity="0.55"/>
                <rect x="4"  y="16" width="10" height="10" rx="2.5" fill="white" fillOpacity="0.55"/>
                <rect x="16" y="16" width="10" height="10" rx="2.5" fill="white" fillOpacity="1"/>
                <rect x="28" y="4"  width="4"  height="4"  rx="1.5" fill="white" fillOpacity="0.3"/>
                <rect x="4"  y="28" width="4"  height="4"  rx="1.5" fill="white" fillOpacity="0.3"/>
                <rect x="28" y="28" width="4"  height="4"  rx="1.5" fill="white" fillOpacity="0.3"/>
              </svg>
            </div>
            <span className="logo-name">TaskMatrix</span>
          </div>

          {/* Headline */}
          <div style={{ marginBottom: '28px' }}>
            <p className="headline">Sign in to your workspace</p>
            <p className="subline" style={{ marginTop: '5px' }}>
              Continue where you left off.
            </p>
          </div>

          {/* OAuth buttons */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            <button className="btn-oauth">
              {/* GitHub icon */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
              GitHub
            </button>
            <button className="btn-oauth">
              {/* Google icon */}
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
          </div>

          {/* Divider */}
          <div className="divider" style={{ marginBottom: '20px' }}>or</div>

          {/* Form */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {error && (
              <div className="error-banner">{error}</div>
            )}

            <div>
              <label className="field-label">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className={`field-input${error ? ' has-error' : ''}`}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="field-label" style={{ margin: 0 }}>Password</label>
                <button type="button" className="forgot-link">Forgot?</button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••"
                required
                className={`field-input${error ? ' has-error' : ''}`}
              />
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary" style={{ marginTop: '4px' }}>
              {isLoading && <span className="spinner" />}
              {isLoading ? 'Signing in…' : 'Continue'}
            </button>
          </form>

          {/* Demo hint */}
          <div className="demo-hint" style={{ marginTop: '16px' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
            </svg>
            <span><strong>Demo:</strong> credentials are pre-filled — just hit Continue.</span>
          </div>

          {/* Footer */}
          <p className="login-footer" style={{ marginTop: '24px' }}>
            No account?{' '}
            <span>Request access</span>
          </p>
        </div>
      </div>
    </>
  );
}
