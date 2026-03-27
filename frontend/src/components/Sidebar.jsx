import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome, MdDashboard, MdHistory, MdHelp, MdNotifications, MdAccountCircle } from 'react-icons/md';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">🔪</span>
        <span className="logo-text">SubSlasher</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <MdHome className="nav-icon" />
          <span className="nav-label">Home</span>
        </NavLink>
        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
          <MdDashboard className="nav-icon" />
          <span className="nav-label">Dashboard</span>
        </NavLink>
        {/* Placeholder for future specific history/help links if needed later, right now they are sections on home */}
        <a href="/#history" className="nav-item">
          <MdHistory className="nav-icon" />
          <span className="nav-label">History</span>
        </a>
        <a href="/#help" className="nav-item">
          <MdHelp className="nav-icon" />
          <span className="nav-label">Help</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-action">
          <MdNotifications className="nav-icon" />
          <span className="nav-label">Notifications</span>
        </button>
        <button className="nav-action profile-action">
          <MdAccountCircle className="nav-icon" />
          <span className="nav-label">John Doe</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
