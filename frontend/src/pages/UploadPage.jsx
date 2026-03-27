import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import StatCard from '../components/StatCard';
import HistorySection from '../components/HistorySection';
import HelpSection from '../components/HelpSection';
import { getDashboardData } from '../services/api';
import { MdAccountBalanceWallet, MdDateRange, MdTrendingDown } from 'react-icons/md';
import './UploadPage.css';

const UploadPage = () => {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchStats = async () => {
      try {
        const data = await getDashboardData();
        setStats(data);
      } catch (err) {
        console.error("Failed to load global stats", err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
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
      
      {/* Features Grid */}
      <section className="features-section" id="features">
        {loadingStats ? (
          <div className="stats-loader">Initializing intelligence core...</div>
        ) : stats ? (
          <div className="stats-grid">
            <StatCard 
              title="Active Subscriptions" 
              amount={stats.topSubscriptions.length} 
              type="info"
              icon={<MdAccountBalanceWallet size={20} />} 
            />
            <StatCard 
              title="Monthly Spend" 
              amount={stats.totalMonthlySpend} 
              type="expense"
              icon={<MdAccountBalanceWallet size={20} />} 
            />
            <StatCard 
              title="Yearly Estimate" 
              amount={stats.totalYearlySpend} 
              type="warning"
              icon={<MdDateRange size={20} />} 
            />
          </div>
        ) : null}
      </section>

      {/* Analyzer Block (Secondary CTA) */}
      <section className="analyzer-section" id="analyzer">
        <div className="cta-content glass-card">
          <h2>Continuous Monitoring</h2>
          <p>Link your accounts securely. SubSlasher runs quietly in the background catching auto-renews before they charge you.</p>
          <button className="analyze-cta-btn" onClick={handleAnalyze}>
            <span className="btn-text">Connect Bank Account</span>
          </button>
        </div>
      </section>

      {/* Visual Separator */}
      <motion.div 
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: 1, scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="visual-separator separator-violet"
      />

      {/* Demo Cards Preview */}
      <section className="demo-preview-section">
        <h3 className="section-title text-glow">Detection Engine Demo</h3>
        <div className="demo-cards-container">
          <div className="demo-card mock-actionable">
            <div className="demo-header">
              <span className="demo-badge">Savings Opportunity</span>
            </div>
            <h4>Cancel Zomato Gold</h4>
            <p>You’ve only ordered once this month. Unsubscribe to save <strong>₹299/mo</strong>.</p>
          </div>
          <div className="demo-card mock-warning">
            <div className="demo-header">
              <span className="demo-badge warning">Price Hike Detected</span>
            </div>
            <h4>Netflix Premium</h4>
            <p>Your subscription increased from ₹499 to ₹649 this billing cycle.</p>
          </div>
          <div className="demo-card mock-analytics">
             <div className="demo-header">
              <span className="demo-badge info">Spending Habit</span>
            </div>
            <h4>Heavy SaaS Spend</h4>
            <p>40% of your outgoings are categorized as SaaS/Tools.</p>
          </div>
        </div>
      </section>

      {/* Bottom Grid */}
      <div className="home-bottom-grid">
        <section className="history-section-wrapper" id="history">
          <HistorySection />
        </section>
        <section className="help-section-wrapper" id="help">
          <HelpSection />
        </section>
      </div>

    </div>
  );
};

export default UploadPage;
