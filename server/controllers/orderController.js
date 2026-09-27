const Order = require('../models/Order');
const Cook = require('../models/Cook');
exports.createOrder = async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user._id });
  res.status(201).json(order);
};
exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('cook');
  res.json(orders);
};
exports.getCookOrders = async (req, res) => {
  const cook = await Cook.findOne({ user: req.user._id });
  const orders = await Order.find({ cook: cook._id }).populate('user', 'name');
  res.json(orders);
};
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true }
  );
  res.json(order);
};
