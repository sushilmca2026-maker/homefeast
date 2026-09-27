const router = require('express').Router();
const { createMenu, getMenusByCook, updateMenu, deleteMenu } = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/authMiddleware');
router.post('/', protect, authorize('cook'), createMenu);
router.get('/cook/:cookId', getMenusByCook);
router.put('/:id', protect, authorize('cook'), updateMenu);
router.delete('/:id', protect, authorize('cook'), deleteMenu);
module.exports = router;
