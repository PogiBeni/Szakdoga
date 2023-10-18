const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/create', taskController.createTask);
router.get('/user/:userId', taskController.getTasksByUserId);
router.put('/update', taskController.updateTask);
router.delete('/:taskId', taskController.deleteTask);

module.exports = router;
