const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
  cook: { type: mongoose.Schema.Types.ObjectId, ref: 'Cook', required: true },
  dishName: { type: String, required: true },
  mealType: { type: String, enum: ['veg', 'non-veg'], required: true },
  cuisine: String,
  description: String,
  price: { type: Number, required: true },
  mealPlan: { type: String, enum: ['daily', 'weekly', 'monthly'], default: 'daily' },
  availability: { type: Boolean, default: true },
  deliveryTime: String
}, { timestamps: true });
module.exports = mongoose.model('Menu', menuSchema);
