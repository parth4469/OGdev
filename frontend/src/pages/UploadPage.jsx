import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import { MdAccountBalanceWallet, MdDateRange, MdTrendingDown } from 'react-icons/md';
import './UploadPage.css';

const UploadPage = () => {
  const navigate = useNavigate();
  // We simulate strict auth state context. In production, this pulls from a session variable or Redux store.
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statsData, setStatsData] = useState(null); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnalyze = () => {
    navigate('/login');
  };

  return (
    <div className="home-page">
      
      {/* Decorative ambient background glows */}
      <div className="ambient-backgrounds">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="ambient-orb orb-indigo"
        />
        <motion.div 
          animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="ambient-orb orb-violet"
        />
        <div className="ambient-core" />
      </div>

      <div className="hero-section">
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="hero-badge-container"
        >
          <div className="hero-badge cursor-pointer hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all">
            <span className="badge-dot"></span>
            AI-POWERED EXPENSE ANALYZER
          </div>
        </motion.div>

        {/* Hero Text */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="hero-title"
        >
          Track Your Subscriptions<br />
          <span>At Smart Speed.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="hero-subtitle"
        >
          SubSlasher analyzes your transactions instantly to uncover hidden subscriptions, reduce unnecessary spending, and maximize your savings.
        </motion.p>

        {/* Hero Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          className="hero-actions"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-btn-primary"
            onClick={handleAnalyze}
          >
            Analyze My Spending <span className="arrow">→</span>
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hero-btn-secondary"
            onClick={handleAnalyze}
          >
            Try Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Visual Separator */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="visual-separator separator-indigo"
      />
      
      {/* 
        CONDITIONAL RENDERING: 
        Only show the 3 stat cards if user is BOTH logged in and has verified data.
        If not, strictly fall back to explaining what they COULD see securely.
      */}
      <section className="features-section" id="features">
        {isLoggedIn && statsData ? (
          <div className="stats-grid">
            <StatCard 
              title="Active Subscriptions" 
              amount={statsData?.subscriptions?.length || 0} 
              type="info"
              icon={<MdAccountBalanceWallet size={20} />} 
            />
            <StatCard 
              title="Monthly Spend" 
              amount={statsData?.totalMonthlySpend || 0} 
              type="expense"
              icon={<MdAccountBalanceWallet size={20} />} 
            />
            <StatCard 
              title="Yearly Estimate" 
              amount={(statsData?.totalMonthlySpend || 0) * 12} 
              type="warning"
              icon={<MdDateRange size={20} />} 
            />
          </div>
        ) : (
          <div className="empty-state-cta">
            <h3 className="empty-state-title">No Active Session Data</h3>
            <p className="empty-state-text">
              Log in and <strong>Upload your statement</strong> to see your secure financial insights populated here.
            </p>
            <button className="analyze-cta-btn secondary-bounce" onClick={handleAnalyze}>
              <span>Secure Login</span>
            </button>
          </div>
        )}
      </section>

      {/* Visual Separator */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="visual-separator separator-violet"
      />

    </div>
  );
};

export default UploadPage;
