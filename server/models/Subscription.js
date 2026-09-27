const mongoose = require('mongoose');
const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cook: { type: mongoose.Schema.Types.ObjectId, ref: 'Cook', required: true },
  menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
  plan: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  startDate: { type: Date, required: true },
  endDate: Date,
  status: {
    type: String,
    enum: ['pending', 'active', 'paused', 'cancelled'],
    default: 'pending'
  },
  amount: Number
}, { timestamps: true });
module.exports = mongoose.model('Subscription', subscriptionSchema);
