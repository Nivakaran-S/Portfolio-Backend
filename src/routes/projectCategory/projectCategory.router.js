const express = require('express');
const { httpCreateCategory, httpGetCategoryById, httpUpdateCategory, httpDeleteCategory, httpGetAllCategories, httpSearchCategories} = require('./projectCategory.controller');

const ProjectCategoryRouter = express.Router();

// Create a new mini project category
ProjectCategoryRouter.post('/', httpCreateCategory);

// Get a mini project category by ID
ProjectCategoryRouter.get('/:id', httpGetCategoryById);

// Update a mini project category
ProjectCategoryRouter.put('/:id', httpUpdateCategory);

// Delete a mini project category
ProjectCategoryRouter.delete('/:id', httpDeleteCategory);

// Get all mini project categories
ProjectCategoryRouter.get('/', httpGetAllCategories);

// Search mini project categories
ProjectCategoryRouter.get('/search', httpSearchCategories);

module.exports = ProjectCategoryRouter;