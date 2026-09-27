const Subscription = require('../models/Subscription');
const Cook = require('../models/Cook');
exports.createSubscription = async (req, res) => {
  const sub = await Subscription.create({ ...req.body, user: req.user._id });
  res.status(201).json(sub);
};
exports.getMySubscriptions = async (req, res) => {
  const subs = await Subscription.find({ user: req.user._id }).populate('cook');
  res.json(subs);
};
exports.getCookSubscriptions = async (req, res) => {
  const cook = await Cook.findOne({ user: req.user._id });
  const subs = await Subscription.find({ cook: cook._id }).populate('user', 'name');
  res.json(subs);
};
exports.updateSubscriptionStatus = async (req, res) => {
  const sub = await Subscription.findByIdAndUpdate(
    req.params.id, { status: req.body.status }, { new: true }
  );
  res.json(sub);
};
