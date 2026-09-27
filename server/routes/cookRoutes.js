const router = require('express').Router();
const { getCooks, getCookById, updateCook } = require('../controllers/cookController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.get('/', getCooks);
router.get('/:id', getCookById);
router.put('/:id', protect, authorize('cook'), updateCook);
module.exports = router;
