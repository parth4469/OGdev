import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MdWbSunny, MdDarkMode, MdAccountCircle } from 'react-icons/md';
import './Header.css';

const Header = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  // Initialize theme from body class
  useEffect(() => {
    if (document.body.classList.contains('light-mode')) {
      setIsLightMode(true);
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

  return (
    <header className="top-header">
      <div className="header-logo">
        <span className="logo-icon">🔪</span>
        <span className="logo-text">SubSlasher</span>
      </div>

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

        <Link to="/login" className="sign-in-link">Sign In</Link>
        <Link to="/login" className="get-started-btn" style={{ textDecoration: 'none' }}>Get Started</Link>
      </div>
    </header>
  );
};

export default Header;
