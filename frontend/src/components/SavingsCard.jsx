import React from 'react';
import { MdTrendingDown } from 'react-icons/md';
import './Insights.css';

const SavingsCard = ({ savings }) => {
  return (
    <div className="savings-card fade-in">
      <div className="savings-header">
        <div className="savings-icon-wrapper">
          <MdTrendingDown className="savings-icon" />
        </div>
        <div>
          <h4 className="savings-title">Actionable Saving</h4>
          <p className="savings-message">{savings.message}</p>
        </div>
      </div>
      
      {savings.action && (
        <div className="savings-action-area">
          <span className="savings-amount">Save {savings.savingsAmount}</span>
          <button className="savings-btn">{savings.action}</button>
        </div>
      )}
    </div>
  );
};

export default SavingsCard;
