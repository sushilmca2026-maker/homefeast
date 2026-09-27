const Review = require('../models/Review');
const Cook = require('../models/Cook');
exports.createReview = async (req, res) => {
  const review = await Review.create({ ...req.body, user: req.user._id });
  const reviews = await Review.find({ cook: review.cook });
  const avg = reviews.reduce((a, r) => a + r.rating, 0) / reviews.length;
  await Cook.findByIdAndUpdate(review.cook, {
    rating: avg.toFixed(1), totalReviews: reviews.length
  });
  res.status(201).json(review);
};
exports.getCookReviews = async (req, res) => {
  const reviews = await Review.find({ cook: req.params.cookId }).populate('user', 'name');
  res.json(reviews);
};
