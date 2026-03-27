import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAccountBalanceWallet, MdDateRange, MdTrendingDown } from 'react-icons/md';
import StatCard from '../components/StatCard';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import AIInsightCard from '../components/AIInsightCard';
import SubscriptionList from '../components/SubscriptionList';
import SavingsCard from '../components/SavingsCard';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if we arrived here securely with analysis data
    const analysisData = location.state?.analysisData;
    
    if (!analysisData) {
      // If accessed directly without an upload session, boot back to upload
      navigate('/upload');
    } else {
      setData(analysisData);
    }
  }, [location, navigate]);

  const handleLogout = () => {
    navigate('/upload');
  };

  const handleCancelSuggestion = (indexToCancel) => {
    // Optimistic UI update
    setData(prev => {
      // In a real app we would have unique IDs. 
      // For now, filter by array index or name.
      if (!prev) return prev;
      return {
        ...prev,
        subscriptions: prev.subscriptions.filter((_, i) => i !== indexToCancel)
      };
    });
  };

  if (!data) {
    return (
      <div className="dashboard-loading fade-in">
        <div className="spinner"></div>
        <p>Loading session data...</p>
      </div>
    );
  }

  // --- Dynamic Data Extraction with Powerful Optional Chaining Fallbacks --- //
  const totalMonthlySpend = data?.totalMonthlySpend || 0;
  const totalYearlySpend = totalMonthlySpend * 12; // Extrapolating yearly
  const wastedMoney = data?.wastedMoney || 0;
  const subscriptions = data?.subscriptions || [];
  const suggestions = data?.suggestions || [];
  const hiddenSubscriptions = data?.hiddenSubscriptions || [];

  // Parse dynamic category breakdowns for PieChart
  const categoryMap = {};
  subscriptions.forEach(sub => {
    const cat = sub.category || 'Uncategorized';
    categoryMap[cat] = (categoryMap[cat] || 0) + (sub.cost || 0);
  });
  const categoryBreakdown = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  // Parse structured Savings from Hidden Subscriptions AI
  const savingsInsights = hiddenSubscriptions.map((sub, index) => ({
    id: `hidden_${index}`,
    type: 'savings',
    message: `You haven't used ${sub.name} recently. Consider canceling this ${sub.category} service.`,
    action: `Cancel ${sub.name}`,
    savingsAmount: `₹${sub.cost}/month`
  }));

  // General Text Insights from the AI arrays
  const generalInsights = suggestions.map((msg, index) => ({
    id: `insight_${index}`,
    type: 'info',
    message: msg
  }));

  // If there are no hidden subscriptions but there is wasted money noted, add a fallback saving suggestion.
  if (savingsInsights.length === 0 && wastedMoney > 0) {
     savingsInsights.push({
       id: 'generic_savings',
       type: 'savings',
       message: 'The AI detected inactive spending patterns.',
       action: 'Review Accounts',
       savingsAmount: `₹${wastedMoney}/month`
     });
  }

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
            amount={totalMonthlySpend} 
            type="expense"
            icon={<MdAccountBalanceWallet size={20} />} 
          />
          <StatCard 
            title="Total Yearly Spend" 
            amount={totalYearlySpend} 
            type="info"
            icon={<MdDateRange size={20} />} 
          />
          <StatCard 
            title="Potential Savings" 
            amount={wastedMoney} 
            type="savings"
            icon={<MdTrendingDown size={20} />} 
          />
        </section>

        {/* Middle Section: Insights & Charts Grid */}
        <section className="dashboard-grid">
          <div className="grid-left">
            <PieChart data={categoryBreakdown.length > 0 ? categoryBreakdown : [{name: 'No Data', value: 1}]} />
            <BarChart data={subscriptions.slice(0, 5).map(s => ({ name: s.name, spend: s.cost }))} />
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
            {generalInsights.length > 0 && (
              <div className="insights-section">
                <h3 className="section-title">AI Insights</h3>
                {generalInsights.map(insight => (
                  <AIInsightCard key={insight.id} insight={insight} />
                ))}
              </div>
            )}
            
            <div className="subscription-list-wrapper">
              <SubscriptionList 
                subscriptions={subscriptions.map((s, index) => ({
                   id: index,
                   name: s.name,
                   amount: s.cost,
                   category: s.category,
                   tag: s.confidence >= 0.9 ? 'Verified' : 'Probable',
                   date: 'Active'
                }))} 
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
