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


