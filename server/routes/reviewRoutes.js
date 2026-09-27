const router = require('express').Router();
const { createReview, getCookReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, createReview);
router.get('/cook/:cookId', getCookReviews);
module.exports = router;
