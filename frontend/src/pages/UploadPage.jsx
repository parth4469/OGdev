import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import StatCard from '../components/StatCard';
import HistorySection from '../components/HistorySection';
import HelpSection from '../components/HelpSection';
import { uploadTransactions, getDashboardData } from '../services/api';
import { MdAccountBalanceWallet, MdDateRange, MdTrendingDown } from 'react-icons/md';
import './UploadPage.css';

const UploadPage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
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

  const handleUpload = async (file) => {
    setIsUploading(true);
    setError(null);
    try {
      await uploadTransactions(file);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to analyze the file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="home-page fade-in">
      <div className="home-header">
        <h1>Welcome Back, John</h1>
        <p>Upload a new statement or review your latest financial summaries.</p>
      </div>
      
      {/* Upload Section */}
      <section className="upload-section">
        <FileUpload onUpload={handleUpload} isUploading={isUploading} />
        {error && <div className="error-message fade-in">{error}</div>}
      </section>

      {/* Stats Summary Section */}
      <section className="stats-summary-section">
        <h3 className="section-title">Your Financial Overview</h3>
        {loadingStats ? (
          <div className="stats-loader">Loading stats...</div>
        ) : stats ? (
          <div className="stats-grid">
            <StatCard 
              title="Recent Monthly Spend" 
              amount={stats.totalMonthlySpend} 
              type="expense"
              icon={<MdAccountBalanceWallet size={20} />} 
            />
            <StatCard 
              title="Yearly Estimate" 
              amount={stats.totalYearlySpend} 
              type="info"
              icon={<MdDateRange size={20} />} 
            />
            <StatCard 
              title="Identified Savings" 
              amount={stats.potentialSavings} 
              type="savings"
              icon={<MdTrendingDown size={20} />} 
            />
          </div>
        ) : null}
      </section>

      <div className="home-bottom-grid">
        {/* History Section */}
        <section className="history-section-wrapper" id="history">
          <HistorySection />
        </section>

        {/* Help Section */}
        <section className="help-section-wrapper" id="help">
          <HelpSection />
        </section>
      </div>
    </div>
  );
};

export default UploadPage;
