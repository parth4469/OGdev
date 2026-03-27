const Subscription = require('../models/susbscription.models');
const { analyzeData } = require('../services/ai.service');

const getInsights = async (req, res) => {
  const subs = await Subscription.find({ userId: req.user });

  const total = subs.reduce((sum, s) => sum + s.cost, 0);

  const unused = subs.filter(s => {
    const days = (Date.now() - new Date(s.lastUsed)) / (1000 * 60 * 60 * 24);
    return days > 30;
  });

  const wasted = unused.reduce((sum, s) => sum + s.cost, 0);

  const aiResponse = await analyzeData(subs);

  res.json({
    totalSpend: total,
    wastedMoney: wasted,
    suggestions: aiResponse
  });
};

module.exports = { getInsights };