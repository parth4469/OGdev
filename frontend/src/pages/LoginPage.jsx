import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    // Navigates to the functional upload page after authentication
    navigate('/upload');
  };

  return (
    <div className="login-page">
      <div className="login-content fade-in">

        {/* Left Side Branding */}
        <div className="login-branding">
          <div className="login-logo-large">
            <span className="logo-icon-large">🔪</span>
            <span className="logo-text-large">SubSlasher</span>
          </div>
          <h1>See everyday spending from your <span>linked accounts.</span></h1>
          <div className="branding-graphic">
            {/* Minimalist secure visual indicator replacing dummy data blocks */}
            <div className="secure-pulse-indicator" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.8, marginTop: '2rem' }}>
              <div className="pulse-card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ fontSize: '1.2rem', color: '#10b981', fontWeight: 600 }}>🔒 Verified Engine</span>
                <p style={{ margin: '0.5rem 0 0 0', color: 'var(--text-secondary)' }}>We analyze without persisting your raw bank statements.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="login-form-container">
          <div className="login-form-box">
            <h2 className="mobile-logo">SubSlasher</h2>
            <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleGuestLogin(); }}>
              <input type="text" placeholder="Mobile number, username or email" className="auth-input" />
              <input type="password" placeholder="Password" className="auth-input" />
              <button type="submit" className="auth-btn" style={{ opacity: 1, cursor: 'pointer' }}>Log in</button>
            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button className="fb-login-btn">
              Log in with Google
            </button>

            <a href="#" className="forgot-password">Forgot password?</a>

            {/* Guest Login Feature */}
            <div className="guest-login-section">
              <p>Just want to try it out?</p>
              <button className="guest-btn" onClick={handleGuestLogin}>
                Log in as a guest
              </button>
            </div>
          </div>

          <div className="signup-box">
            <p>Don't have an account? <a href="#">Create new account</a></p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
