import axios from 'axios';

const API_BASE = 'http://localhost:3000/api';

/**
 * Uploads bank transaction file to the O(N) AI Backend Engine.
 * @param {File} file - CSV or JSON file containing transactions
 * @returns {Promise<Object>} The analyzed subscription data
 */
export const uploadTransactions = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(`${API_BASE}/ai/analyze-transactions`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    // The backend wraps responses in `status: 'success'` and flat properties
    if (response.data && response.data.status === 'success') {
      return response.data;
    }
    throw new Error('Analysis failed or returned unexpected format.');
  } catch (error) {
    console.error('API Error:', error);
    throw error.response?.data?.message || error.message;
  }
};

/**
 * Fallback static data for the Landing Page (UploadPage.jsx)
 * Provides attractive numbers for unauthenticated visitors.
 */
export const getLandingStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        totalMonthlySpend: 15499,
        totalYearlySpend: 185988,
        topSubscriptions: [
          { name: 'AWS Cloud', spend: 2000 },
          { name: 'Netflix', spend: 649 },
          { name: 'Zomato Gold', spend: 299 },
          { name: 'Spotify', spend: 119 },
          { name: 'Gym', spend: 1500 },
        ]
      });
    }, 600);
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
