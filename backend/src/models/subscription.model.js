const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  cost: Number,
  billingCycle: String,
  lastUsed: Date
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);