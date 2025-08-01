const {createMiniProjectCategory, getMiniProjectCategoryById, updateMiniProjectCategory, deleteMiniProjectCategory, getAllMiniProjectCategory, searchMiniProjectCategory} = require('../../models/miniProjectCategory/miniProjectCategory.model');

// Create a new mini project category
const httpCreateCategory = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const categoryId = await createMiniProjectCategory({ title });
    return res.status(201).json({ message: 'Mini project category created', id: categoryId });
  } catch (err) {
    console.error('Error in createCategory:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a mini project category by ID
const httpGetCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getMiniProjectCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: 'Mini project category not found' });
    }
    return res.status(200).json(category);
  } catch (err) {
    console.error('Error in getCategoryById:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Update a mini project category
const httpUpdateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }
    const category = await updateMiniProjectCategory(id, { title });
    if (!category) {
      return res.status(404).json({ message: 'Mini project category not found' });
    }
    return res.status(200).json({ message: 'Mini project category updated', category });
  } catch (err) {
    console.error('Error in updateCategory:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete a mini project category
const httpDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const success = await deleteMiniProjectCategory(id);
    if (!success) {
      return res.status(404).json({ message: 'Mini project category not found' });
    }
    return res.status(200).json({ message: 'Mini project category deleted' });
  } catch (err) {
    console.error('Error in deleteCategory:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all mini project categories
const httpGetAllCategories = async (req, res) => {
  try {
    const categories = await getAllMiniProjectCategory();
    return res.status(200).json(categories);
  } catch (err) {
    console.error('Error in getAllCategories:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Search mini project categories
const httpSearchCategories = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const categories = await searchMiniProjectCategory(query);
    return res.status(200).json(categories);
  } catch (err) {
    console.error('Error in searchCategories:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  httpCreateCategory,
  httpGetCategoryById,
  httpUpdateCategory,
  httpDeleteCategory,
  httpGetAllCategories,
  httpSearchCategories,
};