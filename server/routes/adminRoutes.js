const router = require('express').Router();
const { getUsers, getPendingCooks, approveCook, getStats } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.use(protect, authorize('admin'));
router.get('/users', getUsers);
router.get('/cooks/pending', getPendingCooks);
router.patch('/cooks/:id/approve', approveCook);
router.get('/stats', getStats);
module.exports = router;
