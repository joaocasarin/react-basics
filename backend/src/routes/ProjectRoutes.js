const express = require('express');
const ProjectController = require('../controllers/ProjectController');
const router = express.Router();

const Project = new ProjectController();

router.post('/create', Project.createProject);
router.get('/list', Project.listProjects);
router.patch('/update/:id', Project.updateProject);
router.delete('/delete/:id', Project.deleteProject);
router.post('/:id/like', Project.likeProject);

module.exports = router;