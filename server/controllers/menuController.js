const Menu = require('../models/Menu');
const Cook = require('../models/Cook');
exports.createMenu = async (req, res) => {
  const cook = await Cook.findOne({ user: req.user._id });
  if (!cook) return res.status(404).json({ message: 'Cook profile not found' });
  const menu = await Menu.create({ ...req.body, cook: cook._id });
  res.status(201).json(menu);
};
exports.getMenusByCook = async (req, res) => {
  const menus = await Menu.find({ cook: req.params.cookId });
  res.json(menus);
};
exports.updateMenu = async (req, res) => {
  const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(menu);
};
exports.deleteMenu = async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: 'Menu deleted' });
};
