const mongoose = require('mongoose');
const cookSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  kitchenName: { type: String, required: true },
  description: String,
  cuisine: [String],
  serviceArea: [String],
  deliveryTimings: { morning: String, evening: String },
  isApproved: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 }
}, { timestamps: true });
module.exports = mongoose.model('Cook', cookSchema);
