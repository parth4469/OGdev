import React from 'react';
import { MdInfoOutline, MdHeadsetMic } from 'react-icons/md';
import './Sections.css';

const HelpSection = () => {
  return (
    <div className="section-card fade-in" style={{ animationDelay: '0.1s' }}>
      <h3 className="section-title">Need Help?</h3>
      <div className="help-content">
        <div className="help-box">
          <MdInfoOutline className="help-icon" />
          <div className="help-text">
            <h4>How to use Subscription Slasher</h4>
            <p>Simply export your bank statements in CSV or JSON format, drag it into the upload box on this page, and we will automatically categorize identifying wasteful subscriptions.</p>
          </div>
        </div>
        <div className="help-box">
          <MdHeadsetMic className="help-icon" />
          <div className="help-text">
            <h4>Support Priority</h4>
            <p>If you encounter an error analyzing a file, ensure it's a valid structure, or reach out to our team at support@subslasher.app.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpSection;
