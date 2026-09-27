const router = require('express').Router();
const { createSubscription, getMySubscriptions, getCookSubscriptions, updateSubscriptionStatus } = require('../controllers/subscriptionController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.post('/', protect, createSubscription);
router.get('/my', protect, getMySubscriptions);
router.get('/cook', protect, authorize('cook'), getCookSubscriptions);
router.patch('/:id/status', protect, authorize('cook'), updateSubscriptionStatus);
module.exports = router;
