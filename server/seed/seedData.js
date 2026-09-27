require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');
const Cook = require('../models/Cook');
const Menu = require('../models/Menu');
const run = async () => {
  await connectDB();
  await User.deleteMany();
  await Cook.deleteMany();
  await Menu.deleteMany();
  await User.create({ name: 'Admin', email: 'admin@homefeast.com', password: 'admin123', role: 'admin' });
  const cookUser = await User.create({
    name: 'Ramesh Kumar', email: 'ramesh@cook.com',
    password: 'cook123', role: 'cook', city: 'Mumbai'
  });
  const cook = await Cook.create({
    user: cookUser._id,
    kitchenName: "Ramesh's Home Kitchen",
    description: 'Authentic North Indian home-style food',
    cuisine: ['North Indian', 'Punjabi'],
    serviceArea: ['Mumbai'],
    deliveryTimings: { morning: '7-9 AM', evening: '6-9 PM' },
    isApproved: true
  });
  await Menu.insertMany([
    { cook: cook._id, dishName: 'Veg Thali', mealType: 'veg', cuisine: 'North Indian', price: 80, mealPlan: 'daily', deliveryTime: '12-2 PM' },
    { cook: cook._id, dishName: 'Chicken Thali', mealType: 'non-veg', cuisine: 'Punjabi', price: 120, mealPlan: 'daily', deliveryTime: '1-3 PM' },
    { cook: cook._id, dishName: 'Weekly Veg Plan', mealType: 'veg', cuisine: 'North Indian', price: 500, mealPlan: 'weekly', deliveryTime: '12-2 PM' }
  ]);
  await User.create({ name: 'Priya Sharma', email: 'priya@user.com', password: 'user123', role: 'customer', city: 'Mumbai' });
  console.log('Seed done!');
  console.log('Admin: admin@homefeast.com / admin123');
  console.log('Cook:  ramesh@cook.com / cook123');
  console.log('User:  priya@user.com / user123');
  process.exit();
};
run().catch((e) => { console.error(e); process.exit(1); });
