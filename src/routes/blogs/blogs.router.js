const express = require('express');
const { httpCreateBlogController, httpGetBlogByIdController, httpUpdateBlogController, httpDeleteBlogController, httpGetAllBlogsController, httpSearchBlogsController } = require('./blogs.controller');

const BlogsRouter = express.Router();

BlogsRouter.post('/', httpCreateBlogController);
BlogsRouter.get('/:id', httpGetBlogByIdController);
BlogsRouter.put('/:id', httpUpdateBlogController);
BlogsRouter.delete('/:id', httpDeleteBlogController);
BlogsRouter.get('/', httpGetAllBlogsController);
BlogsRouter.get('/search', httpSearchBlogsController);

module.exports = BlogsRouter ;