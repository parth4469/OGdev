import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdAccountBalanceWallet, MdDateRange, MdTrendingDown, MdSecurityUpdateGood } from 'react-icons/md';
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
    const analysisData = location.state?.analysisData;
    
    // Hard check for active payload existence.
    if (!analysisData) {
      navigate('/upload');
    } else {
      setData(analysisData);
    }
  }, [location, navigate]);

  const handleLogout = () => {
    navigate('/upload');
  };

  const handleCancelSuggestion = (indexToCancel) => {
    // Optimistic UI interaction
    setData(prev => {
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
        <p>Restoring Secure Session...</p>
      </div>
    );
  }

  // --- Strict Optional Chaining ---
  const totalMonthlySpend = data?.totalMonthlySpend || 0;
  const totalYearlySpend = totalMonthlySpend * 12; 
  const wastedMoney = data?.wastedMoney || 0;
  const subscriptions = data?.subscriptions || [];
  const suggestions = data?.suggestions || [];
  const hiddenSubscriptions = data?.hiddenSubscriptions || [];

  // --- Empty State Check ---
  // If the engine returns absolutely no subscriptions matching constraints
  const isDataEmpty = subscriptions.length === 0;

  // --- Dynamic Mappings ---
  const categoryMap = {};
  subscriptions.forEach(sub => {
    const cat = sub?.category || 'Uncategorized';
    categoryMap[cat] = (categoryMap[cat] || 0) + (sub?.cost || 0);
  });
  const categoryBreakdown = Object.keys(categoryMap).map(key => ({
    name: key,
    value: categoryMap[key]
  }));

  const savingsInsights = hiddenSubscriptions.map((sub, index) => ({
    id: `hidden_${index}`,
    type: 'savings',
    message: `You haven't used ${sub?.name || 'this service'} recently. Consider canceling this ${sub?.category || 'unknown'} service.`,
    action: `Cancel ${sub?.name}`,
    savingsAmount: `₹${sub?.cost || 0}/month`
  }));

  const generalInsights = suggestions.map((msg, index) => ({
    id: `insight_${index}`,
    type: 'info',
    message: msg
  }));

  if (savingsInsights.length === 0 && wastedMoney > 0) {
     savingsInsights.push({
       id: 'generic_savings',
       type: 'savings',
       message: 'The AI detected inactive spending patterns globally across your statements.',
       action: 'Review Accounts',
       savingsAmount: `₹${wastedMoney}/month`
     });
  }

  return (
    <div className="dashboard-page fade-in">
      <header className="dashboard-header">
        <div className="header-title">
          <h2>Subscription Slasher</h2>
          <p>Verified Intelligence Report</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Upload New Data</button>
      </header>

      <main className="dashboard-content">
        
        {/* --- Global Empty State Fallback --- */}
        {isDataEmpty ? (
          <div className="dashboard-empty-state">
            <MdSecurityUpdateGood className="empty-state-icon" style={{ fontSize: '4rem', color: 'var(--success-color)' }} />
            <h3>No Subscriptions Found</h3>
            <p>We analyzed your dataset and found zero recurring transactions. Your finances look exceptionally clean.</p>
            <button className="analyze-cta-btn secondary-bounce" onClick={handleLogout} style={{ marginTop: '2rem' }}>
              Analyze Another Document
            </button>
          </div>
        ) : (
          <>
            {/* 1. STATS HIERARCHY (Top Priority) */}
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

            {/* 2. INTELLIGENCE HIERARCHY (Pulled directly beneath Stats) */}
            {/* If neither array has items, this section just elegantly collapses */}
            {(savingsInsights.length > 0 || generalInsights.length > 0) && (
              <section className="dashboard-grid insights-priority-grid" style={{ marginBottom: '2rem' }}>
                
                {savingsInsights.length > 0 && (
                  <div className="savings-section">
                    <h3 className="section-title">Immediate Actions Required</h3>
                    {savingsInsights.map(insight => (
                      <SavingsCard key={insight.id} savings={insight} />
                    ))}
                  </div>
                )}

                {generalInsights.length > 0 && (
                  <div className="insights-section">
                    <h3 className="section-title">AI Behavioral Insights</h3>
                    {generalInsights.map(insight => (
                      <AIInsightCard key={insight.id} insight={insight} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 3. VISUALIZATIONS HIERARCHY (Charts pushed down) */}
            <section className="dashboard-grid charts-priority-grid" style={{ marginBottom: '2rem' }}>
              <div className="chart-container-wrapper" style={{ width: '100%' }}>
                <PieChart data={categoryBreakdown} />
              </div>
              <div className="chart-container-wrapper" style={{ width: '100%' }}>
                <BarChart data={subscriptions.slice(0, 5).map(s => ({ name: s.name, spend: s.cost }))} />
              </div>
            </section>

            {/* 4. LEDGER HIERARCHY (Subscription Table at the very bottom) */}
            <section className="subscription-list-wrapper">
              <SubscriptionList 
                subscriptions={subscriptions.map((s, index) => ({
                   id: index,
                   name: s.name || 'Unknown Merchant',
                   amount: s.cost || 0,
                   category: s.category || 'Uncategorized',
                   tag: (s.confidence && s.confidence >= 0.9) ? 'Verified' : 'Probable',
                   date: 'Active Tracker'
                }))} 
                onCancelSuggestion={handleCancelSuggestion} 
              />
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
