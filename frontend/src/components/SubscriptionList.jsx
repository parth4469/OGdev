import React from 'react';
import SubscriptionCard from './SubscriptionCard';
import './Subscriptions.css';

const SubscriptionList = ({ subscriptions, onCancelSuggestion }) => {
  if (!subscriptions || subscriptions.length === 0) {
    return <div className="empty-state">No subscriptions found.</div>;
  }

  return (
    <div className="subscription-list">
      <h3 className="list-title">All Subscriptions</h3>
      <div className="list-container">
        {subscriptions.map((sub, index) => (
          <div key={sub.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <SubscriptionCard 
              sub={sub} 
              onCancelClick={onCancelSuggestion} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionList;
