import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAccountBalanceWallet, MdDateRange, MdTrendingDown } from 'react-icons/md';
import StatCard from '../components/StatCard';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import AIInsightCard from '../components/AIInsightCard';
import SubscriptionList from '../components/SubscriptionList';
import SavingsCard from '../components/SavingsCard';
import { getDashboardData, getInsights, getSubscriptions } from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: null,
    subscriptions: [],
    insights: []
  });

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashboardData, subsData, insightsData] = await Promise.all([
          getDashboardData(),
          getSubscriptions(),
          getInsights()
        ]);

        setData({
          stats: dashboardData,
          subscriptions: subsData,
          insights: insightsData
        });
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCancelSuggestion = (id) => {
    // In a real app, you would make an API call to mark this as cancelled or hidden
    setData(prev => ({
      ...prev,
      subscriptions: prev.subscriptions.filter(sub => sub.id !== id)
    }));
  };

  const handleLogout = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="dashboard-loading fade-in">
        <div className="spinner"></div>
        <p>Analyzing your financial data...</p>
      </div>
    );
  }

  const { stats, subscriptions, insights } = data;
  const savingsInsights = insights.filter(i => i.type === 'savings');
  const generalInsights = insights.filter(i => i.type !== 'savings');

  return (
    <div className="dashboard-page fade-in">
      <header className="dashboard-header">
        <div className="header-title">
          <h2>Subscription Slasher</h2>
          <p>Your Financial Overview</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Upload New File</button>
      </header>

      <main className="dashboard-content">
        {/* Top Section: Stat Cards */}
        <section className="stats-section">
          <StatCard 
            title="Total Monthly Spend" 
            amount={stats.totalMonthlySpend} 
            type="expense"
            icon={<MdAccountBalanceWallet size={20} />} 
          />
          <StatCard 
            title="Total Yearly Spend" 
            amount={stats.totalYearlySpend} 
            type="info"
            icon={<MdDateRange size={20} />} 
          />
          <StatCard 
            title="Potential Savings" 
            amount={stats.potentialSavings} 
            type="savings"
            icon={<MdTrendingDown size={20} />} 
          />
        </section>

        {/* Middle Section: Insights & Charts Grid */}
        <section className="dashboard-grid">
          <div className="grid-left">
            <PieChart data={stats.categoryBreakdown} />
            <BarChart data={stats.topSubscriptions} />
          </div>

          <div className="grid-right">
            {/* Savings Section (Top of Right Column) */}
            {savingsInsights.length > 0 && (
              <div className="savings-section">
                <h3 className="section-title">Immediate Actions</h3>
                {savingsInsights.map(insight => (
                  <SavingsCard key={insight.id} savings={insight} />
                ))}
              </div>
            )}

            {/* AI Insights Section */}
            <div className="insights-section">
              <h3 className="section-title">AI Insights</h3>
              {generalInsights.map(insight => (
                <AIInsightCard key={insight.id} insight={insight} />
              ))}
            </div>
            
            <div className="subscription-list-wrapper">
              <SubscriptionList 
                subscriptions={subscriptions} 
                onCancelSuggestion={handleCancelSuggestion} 
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
