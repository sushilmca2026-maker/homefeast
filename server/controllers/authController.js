const User = require('../models/User');
const Cook = require('../models/Cook');
const jwt = require('jsonwebtoken');
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });
exports.register = async (req, res) => {
  const { name, email, password, role, phone, city, kitchenName } = req.body;
  if (await User.findOne({ email }))
    return res.status(400).json({ message: 'User already exists' });
  const user = await User.create({ name, email, password, role, phone, city });
  if (role === 'cook') {
    await Cook.create({
      user: user._id,
      kitchenName: kitchenName || `${name}'s Kitchen`,
      isApproved: false
    });
  }
  res.status(201).json({
    _id: user._id, name: user.name, email: user.email,
    role: user.role, token: generateToken(user._id)
  });
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ message: 'Invalid credentials' });
  res.json({
    _id: user._id, name: user.name, email: user.email,
    role: user.role, token: generateToken(user._id)
  });
};
