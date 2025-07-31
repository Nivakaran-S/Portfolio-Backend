const express = require('express');
const { httpCreateMiniProjectController, httpGetMiniProjectByIdController, httpUpdateMiniProjectController, httpDeleteMiniProjectController, httpGetAllMiniProjectsController, httpSearchMiniProjectsController } = require('./miniProjects.controller');

const MiniProjectRouter = express.Router();

MiniProjectRouter.post('/', httpCreateMiniProjectController);
MiniProjectRouter.get('/:id', httpGetMiniProjectByIdController);
MiniProjectRouter.put('/:id', httpUpdateMiniProjectController);
MiniProjectRouter.delete('/:id', httpDeleteMiniProjectController);
MiniProjectRouter.get('/', httpGetAllMiniProjectsController);
MiniProjectRouter.get('/search', httpSearchMiniProjectsController);

module.exports = MiniProjectRouter;