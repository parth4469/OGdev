import React from 'react';
import './StatCard.css';

const StatCard = ({ title, amount, type = 'info', icon }) => {
  // Determine color theme based on type
  const colorClass = `stat-card-${type}`;

  return (
    <div className={`stat-card fade-in ${colorClass}`}>
      <div className="stat-header">
        <h3 className="stat-title">{title}</h3>
        {icon && <span className="stat-icon">{icon}</span>}
      </div>
      <div className="stat-amount">₹{amount.toLocaleString('en-IN')}</div>
    </div>
  );
};

export default StatCard;
