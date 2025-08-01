const express = require('express');
const { httpCreateCategory, httpGetCategoryById, httpUpdateCategory, httpDeleteCategory, httpGetAllCategories, httpSearchCategories} = require('./miniProjectCategory.controller');

const MiniProjectCategoryRouter = express.Router();

// Create a new mini project category
MiniProjectCategoryRouter.post('/', httpCreateCategory);

// Get a mini project category by ID
MiniProjectCategoryRouter.get('/:id', httpGetCategoryById);

// Update a mini project category
MiniProjectCategoryRouter.put('/:id', httpUpdateCategory);

// Delete a mini project category
MiniProjectCategoryRouter.delete('/:id', httpDeleteCategory);

// Get all mini project categories
MiniProjectCategoryRouter.get('/', httpGetAllCategories);

// Search mini project categories
MiniProjectCategoryRouter.get('/search', httpSearchCategories);

module.exports = MiniProjectCategoryRouter;