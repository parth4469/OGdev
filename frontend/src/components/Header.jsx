import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MdWbSunny, MdDarkMode, MdAccountCircle } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import './Header.css';

const Header = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Initialize theme from body class and load user from storage
  useEffect(() => {
    if (document.body.classList.contains('light-mode')) {
      setIsLightMode(true);
    }
    
    // Check for logged in user
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newThemeLight = !isLightMode;
    setIsLightMode(newThemeLight);
    if (newThemeLight) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <header className="top-header">
      <Link to="/" className="header-logo" style={{ textDecoration: 'none' }}>
        <span className="logo-icon">🔪</span>
        <span className="logo-text">SubSlasher</span>
      </Link>

      <nav className="header-nav">
        <a href="#features" className="nav-item">Features</a>
        <a href="#analyzer" className="nav-item">Analyzer</a>
        <NavLink to="/dashboard" className="nav-item">Dashboard</NavLink>
      </nav>

      <div className="header-actions">
        <button 
          className="icon-btn theme-toggle" 
          onClick={toggleTheme} 
          title="Toggle Theme"
        >
          {isLightMode ? <MdDarkMode className="header-icon" /> : <MdWbSunny className="header-icon" />}
        </button>

        {user ? (
          <div className="user-profile-menu" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <MdAccountCircle size={24} style={{ color: 'var(--primary-color)' }} />
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
            >
              <FiLogOut size={16} /> Logout
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="sign-in-link">Sign In</Link>
            <Link to="/signup" className="get-started-btn" style={{ textDecoration: 'none' }}>Get Started</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
