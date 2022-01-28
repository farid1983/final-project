const express = require('express');
const router = express.Router();

//from controller
const {
	createItems,
	getAllItems,
	getItemById,
	deleteItem,
	updateItem,
} = require('../controllers/items');

// /api/v1/items

router.route('/').post(createItems);
router.route('/').get(getAllItems);
router.route('/:itemId').get(getItemById);
router.route('/:itemId').delete(deleteItem);
router.route('/:itemId').patch(updateItem);

// router.post('/register', register);
// router.post('/login', login);

module.exports = router;
