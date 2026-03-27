const Subscription = require('../models/susbscription.models');
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

const uploadSubscriptions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ status: 'error', message: 'No file uploaded' });
    }

    let parsedData = [];
    const ext = req.file.originalname.split('.').pop().toLowerCase();

    // Reusable function to validate and insert data
    const processData = async (dataArray) => {
      let totalCost = 0;
      const validSubscriptions = [];

      dataArray.forEach(row => {
        // Only insert rows that have a name and cost
        // Coerce cost into a Number
        const rowCost = Number(row.cost);
        if (row.name && !isNaN(rowCost)) {
          validSubscriptions.push({
            userId: req.user,
            name: row.name.trim(),
            cost: rowCost,
            billingCycle: row.billingCycle || 'monthly',
            lastUsed: row.lastUsed ? new Date(row.lastUsed) : new Date()
          });
          totalCost += rowCost;
        }
      });

      if (validSubscriptions.length === 0) {
        return res.status(400).json({ status: 'error', message: 'No valid subscription data found in file.' });
      }

      await Subscription.insertMany(validSubscriptions);

      res.status(201).json({
        status: 'success',
        message: 'File processed successfully',
        insertedCount: validSubscriptions.length,
        totalCostAdded: totalCost
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