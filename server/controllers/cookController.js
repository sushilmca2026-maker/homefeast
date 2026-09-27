const Cook = require('../models/Cook');
exports.getCooks = async (req, res) => {
  const { cuisine, city } = req.query;
  const filter = { isApproved: true };
  if (cuisine) filter.cuisine = cuisine;
  if (city) filter.serviceArea = city;
  const cooks = await Cook.find(filter).populate('user', 'name city');
  res.json(cooks);
};
exports.getCookById = async (req, res) => {
  const cook = await Cook.findById(req.params.id).populate('user', 'name city');
  if (!cook) return res.status(404).json({ message: 'Cook not found' });
  res.json(cook);
};
exports.updateCook = async (req, res) => {
  const cook = await Cook.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cook);
};
