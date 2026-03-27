const axios = require('axios');

const analyzeData = async (data) => {
  const response = await axios.post(
    "https://api-inference.huggingface.co/models/google/flan-t5-base",
    {
      inputs: `Analyze subscriptions and suggest savings: ${JSON.stringify(data)}`
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`
      }
    }
  );

  return response.data;
};

module.exports = { analyzeData };