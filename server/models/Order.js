const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cook: { type: mongoose.Schema.Types.ObjectId, ref: 'Cook', required: true },
  items: [{
    menu: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
    quantity: Number,
    price: Number
  }],
  totalAmount: Number,
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'delivered'],
    default: 'pending'
  },
  deliveryAddress: String
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);
