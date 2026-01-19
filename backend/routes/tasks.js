const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {createTask,getTasksByProject,getTaskById,updateTask,deleteTask}= require('../controllers/taskController');

router.post('/projects/:projectId/tasks',auth,createTask);
router.get('/projects/:projectId/tasks', auth, getTasksByProject);
router.get('/tasks/:id', auth, getTaskById);
router.put('/tasks/:id', auth, updateTask);
router.delete('/tasks/:id', auth, deleteTask);

module.exports = router;