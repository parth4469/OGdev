import React from 'react';
import { MdLightbulbOutline } from 'react-icons/md';
import './Insights.css';

const AIInsightCard = ({ insight }) => {
  return (
    <div className={`insight-card insight-${insight.type} fade-in`}>
      <div className="insight-icon">
        <MdLightbulbOutline />
      </div>
      <div className="insight-content">
        <span className="insight-label">AI Insight</span>
        <p className="insight-message">{insight.message}</p>
      </div>
    </div>
  );
};

export default AIInsightCard;
