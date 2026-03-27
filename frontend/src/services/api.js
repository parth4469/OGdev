// Dummy API service returning promises resolving to mock data

export const uploadTransactions = async (file) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate successful upload
      resolve({ status: 'success', message: 'File analyzed successfully.' });
    }, 1500);
  });
};

export const getDashboardData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalMonthlySpend: 15499,
        totalYearlySpend: 185988,
        potentialSavings: 3450,
        categoryBreakdown: [
          { name: 'Entertainment', value: 4500 },
          { name: 'SaaS / Tools', value: 3200 },
          { name: 'Utility', value: 5000 },
          { name: 'Food/Delivery', value: 2799 },
        ],
        topSubscriptions: [
          { name: 'AWS Cloud', spend: 2000 },
          { name: 'Netflix', spend: 649 },
          { name: 'Zomato Gold', spend: 299 },
          { name: 'Spotify', spend: 119 },
          { name: 'Gym', spend: 1500 },
        ]
      });
    }, 800);
  });
};

export const getSubscriptions = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Netflix Premium', amount: 649, category: 'Entertainment', tag: 'Expensive', date: '4th of every month' },
        { id: 2, name: 'Spotify Premium', amount: 119, category: 'Entertainment', tag: 'Essential', date: '12th of every month' },
        { id: 3, name: 'AWS Cloud Services', amount: 2000, category: 'SaaS / Tools', tag: 'Expensive', date: '1st of every month' },
        { id: 4, name: 'Zomato Gold', amount: 299, category: 'Food/Delivery', tag: 'Rare', date: '15th of every month' },
        { id: 5, name: 'Canva Pro', amount: 499, category: 'SaaS / Tools', tag: 'Essential', date: '22nd of every month' },
        { id: 6, name: 'Gym Membership', amount: 1500, category: 'Utility', tag: 'Essential', date: '5th of every month' },
      ]);
    }, 1000);
  });
};

export const getInsights = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { 
          id: 1, 
          type: 'warning', 
          message: 'You are spending heavily on Entertainment. Consider reviewing your active plans.' 
        },
        { 
          id: 2, 
          type: 'savings', 
          message: 'Cancel Zomato Gold since you have barely ordered anything this month.',
          action: 'Cancel Zomato Gold',
          savingsAmount: '₹299/month'
        },
        { 
          id: 3, 
          type: 'info', 
          message: 'Your SaaS spends are consistent and look well optimized.' 
        }
      ]);
    }, 1200);
  });
};

export const getFileHistory = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: '1', filename: 'jan_statements.csv', date: '2026-01-05', status: 'Analyzed' },
        { id: '2', filename: 'feb_statements.csv', date: '2026-02-03', status: 'Analyzed' },
        { id: '3', filename: 'mar_statements.csv', date: '2026-03-01', status: 'Analyzed' },
      ]);
    }, 600);
  });
};
