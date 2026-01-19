const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const {createProject,getProjects,getProjectById,updateProject,deleteProject,addMember} =  require('../controllers/projectController');

router.post('/',auth,createProject);
router.get('/',auth,getProjects);
router.get('/:id',auth,getProjectById);
router.put('/:id',auth,updateProject);
router.delete('/:id', auth, deleteProject);
router.put('/:id/members', auth, addMember)

module.exports = router;