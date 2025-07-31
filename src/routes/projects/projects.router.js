const express = require('express');
const { httpCreateProjectController, httpGetProjectByIdController, httpUpdateProjectController, httpDeleteProjectController, httpGetAllProjectsController, httpSearchProjectsController } = require('./projects.controller');

const ProjectsRouter = express.Router();

ProjectsRouter.post('/', httpCreateProjectController);
ProjectsRouter.get('/:id', httpGetProjectByIdController);
ProjectsRouter.put('/:id', httpUpdateProjectController);
ProjectsRouter.delete('/:id', httpDeleteProjectController);
ProjectsRouter.get('/', httpGetAllProjectsController);
ProjectsRouter.get('/search', httpSearchProjectsController);

module.exports = ProjectsRouter;