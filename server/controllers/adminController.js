const User = require('../models/User');
const Cook = require('../models/Cook');
const Order = require('../models/Order');
const Subscription = require('../models/Subscription');
exports.getUsers = async (req, res) => {
  res.json(await User.find().select('-password'));
};
exports.getPendingCooks = async (req, res) => {
  res.json(await Cook.find({ isApproved: false }).populate('user', 'name email'));
};
exports.approveCook = async (req, res) => {
  const cook = await Cook.findByIdAndUpdate(
    req.params.id, { isApproved: true }, { new: true }
  );
  res.json(cook);
};
exports.getStats = async (req, res) => {
  res.json({
    users: await User.countDocuments({ role: 'customer' }),
    cooks: await Cook.countDocuments({ isApproved: true }),
    orders: await Order.countDocuments(),
    subscriptions: await Subscription.countDocuments({ status: 'active' })
  });
};
