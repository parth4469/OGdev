const Subscription = require('../models/subscription.model');
const stream = require('stream');
const csvParser = require('csv-parser');

const addSubscription = async (req, res) => {
  const sub = await Subscription.create({
    ...req.body,
    userId: req.user
  });

  res.json(sub);
};

const getSubscriptions = async (req, res) => {
  const subs = await Subscription.find({ userId: req.user });
  res.json(subs);
};

const deleteSubscription = async (req, res) => {
  await Subscription.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

const { analyzeTransactions: analyzeTransactionsLogic } = require('../services/transactionAnalysis.service');

const uploadSubscriptions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    let parsedData = [];
    const ext = req.file.originalname.split('.').pop().toLowerCase();

    // Reusable function to validate and insert data
    const processData = async (dataArray) => {
      // 1. Format noisy inputs
      const formattedInput = dataArray.map(row => ({
        description: row.description || row.name || row.merchant || '',
        amount: row.amount || row.cost || row.price || 0,
        date: row.date || row.timestamp || new Date()
      }));

      // 2. Use our smart engine to extract valid subscriptions out of the noisy raw array
      const analysisResult = analyzeTransactionsLogic(formattedInput);

      if (!analysisResult.subscriptions || analysisResult.subscriptions.length === 0) {
        return res.status(400).json({ status: 'error', message: 'No valid subscription data found in file.' });
      }

      // 3. Prepare data for MongoDB
      const validSubscriptions = analysisResult.subscriptions.map(sub => ({
        userId: req.user,
        name: sub.name,
        cost: sub.cost,
        billingCycle: sub.billingCycle,
        lastUsed: sub.lastUsed
      }));

      // 4. Bulk insert confirmed subscriptions
      await Subscription.insertMany(validSubscriptions);

      // 5. Build clean, structured response for the dashboard
      res.status(201).json({
        totalMonthlySpend: analysisResult.totalMonthlySpend,
        subscriptions: analysisResult.subscriptions,
        hiddenSubscriptions: analysisResult.hiddenSubscriptions,
        wastedMoney: analysisResult.wastedMoney,
        suggestions: analysisResult.suggestions
      });
    };

    if (ext === 'json' || req.file.mimetype === 'application/json') {
      try {
        parsedData = JSON.parse(req.file.buffer.toString());
        if (!Array.isArray(parsedData)) {
           return res.status(400).json({ status: 'error', message: 'JSON file must contain an array of objects' });
        }
        await processData(parsedData);
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
        .on('end', async () => {
          await processData(parsedData);
        })
        .on('error', (err) => {
          res.status(500).json({ status: 'error', message: 'Error parsing CSV file' });
        });
    } else {
       res.status(400).json({ status: 'error', message: 'Unsupported file format' });
    }
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ status: 'error', message: 'Internal server error during file processing' });
  }
};

module.exports = {
  addSubscription,
  getSubscriptions,
  deleteSubscription,
  uploadSubscriptions
};