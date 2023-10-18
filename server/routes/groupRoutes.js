const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Define routes
router.post('/create', groupController.createGroup);
router.get('/:id', groupController.getGroup);
router.put('/update', groupController.updateGroup);

module.exports = router;
