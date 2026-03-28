const Subscription = require('../models/subscription.model');
const { analyzeData } = require('../services/ai.service');
const { analyzeTransactions: analyzeTransactionsLogic } = require('../services/transactionAnalysis.service');
const stream = require('stream');
const csvParser = require('csv-parser');

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

const analyzeTransactions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    let parsedData = [];
    const ext = req.file.originalname.split('.').pop().toLowerCase();

    const processData = (dataArray) => {
      // Validate schema minimally (needs description/name, amount/cost, date)
      const formattedInput = dataArray.map(row => ({
        description: row.description || row.name || row.merchant || '',
        amount: row.amount || row.cost || row.price || 0,
        date: row.date || row.timestamp || new Date()
      }));

      // Pass raw JSON array to the Engine
      const analysisResult = analyzeTransactionsLogic(formattedInput);

      // Return clean JSON
      res.status(200).json({
        status: 'success',
        ...analysisResult
      });
    };

    if (ext === 'json' || req.file.mimetype === 'application/json') {
      try {
        parsedData = JSON.parse(req.file.buffer.toString());
        if (!Array.isArray(parsedData)) {
           return res.status(400).json({ status: 'error', message: 'JSON file must contain an array of objects' });
        }
        processData(parsedData);
      } catch (err) {
        return res.status(400).json({ status: 'error', message: 'Invalid JSON format' });
      }
    } 
    else if (ext === 'csv' || req.file.mimetype === 'text/csv') {
      const bufferStream = new stream.PassThrough();
      bufferStream.end(req.file.buffer);

      bufferStream
        .pipe(csvParser())
        .on('data', (data) => parsedData.push(data))
        .on('end', () => {
          processData(parsedData);
        })
        .on('error', (err) => {
          res.status(500).json({ status: 'error', message: 'Error parsing CSV file' });
        });
    } else {
       res.status(400).json({ status: 'error', message: 'Unsupported file format' });
    }
  } catch (error) {
    console.error('AI Analysis Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error during analysis' });
  }
};

module.exports = { getInsights, analyzeTransactions };