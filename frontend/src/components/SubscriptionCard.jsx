import React from 'react';
import './Subscriptions.css';

const SubscriptionCard = ({ sub, onCancelClick }) => {
  const getTagClass = (tag) => {
    switch (tag.toLowerCase()) {
      case 'expensive': return 'tag-expensive';
      case 'essential': return 'tag-essential';
      case 'rare': return 'tag-rare';
      default: return '';
    }
  };

  const getTagIcon = (tag) => {
    switch (tag.toLowerCase()) {
      case 'expensive': return '⚠️';
      case 'essential': return '✅';
      case 'rare': return '❌';
      default: return '';
    }
  };

  return (
    <div className="subscription-card fade-in">
      <div className="sub-info">
        <h4 className="sub-name">{sub.name}</h4>
        <div className="sub-meta">
          <span className="sub-category">{sub.category}</span>
          <span className="sub-date">Billed on {sub.date}</span>
        </div>
      </div>
      
      <div className="sub-amount-area">
        <span className="sub-amount">₹{sub.amount}</span>
        <span className="sub-interval">/mo</span>
      </div>

      <div className="sub-actions">
        <div className={`sub-tag ${getTagClass(sub.tag)}`}>
          {getTagIcon(sub.tag)} {sub.tag}
        </div>
        <button className="cancel-btn" onClick={() => onCancelClick(sub.id)}>
          Cancel Suggestion
        </button>
      </div>
    </div>
  );
};

export default SubscriptionCard;
