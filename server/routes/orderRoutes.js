const router = require('express').Router();
const { createOrder, getMyOrders, getCookOrders, updateOrderStatus } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.post('/', protect, createOrder);
router.get('/my', protect, getMyOrders);
router.get('/cook', protect, authorize('cook'), getCookOrders);
router.patch('/:id/status', protect, authorize('cook'), updateOrderStatus);
module.exports = router;
