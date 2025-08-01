const express = require('express');
const { httpCreateCategory, httpGetCategoryById, httpUpdateCategory, httpDeleteCategory, httpGetAllCategories, httpSearchCategories} = require('./blogCategory.controller');

const BlogCategoryRouter = express.Router();

BlogCategoryRouter.post('/', httpCreateCategory);
BlogCategoryRouter.get('/:id', httpGetCategoryById);
BlogCategoryRouter.put('/:id', httpUpdateCategory);
BlogCategoryRouter.delete('/:id', httpDeleteCategory);
BlogCategoryRouter.get('/', httpGetAllCategories);
BlogCategoryRouter.get('/search', httpSearchCategories);


module.exports = BlogCategoryRouter;