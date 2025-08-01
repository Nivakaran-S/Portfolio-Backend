const BlogCategory = require('./blogCategory.mongo');

const createBlogCategory = async (data) => {
  try {
    const category = await BlogCategory.create({
      title: data.title,
      createdAt: new Date(),
    });
    return category._id;
  } catch (err) {
    console.error('Error creating mini project category:', err);
    throw err;
  }
};

const getBlogCategoryById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const category = await BlogCategory.findById(cleanedId);
    return category;
  } catch (err) {
    console.error('Error fetching mini project category by ID:', err);
    throw err;
  }
};

const updateBlogCategory = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const category = await BlogCategory.findByIdAndUpdate(
      cleanedId,
      {
        title: data.title,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    return category;
  } catch (err) {
    console.error('Error updating mini project category:', err);
    throw err;
  }
};

const deleteBlogCategory = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await BlogCategory.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting mini project category:', err);
    throw err;
  }
};

const getAllBlogCategory = async () => {
  try {
    const categories = await BlogCategory.find({}).sort({ createdAt: -1 });
    return categories;
  } catch (err) {
    console.error('Error fetching all mini project categories:', err);
    throw err;
  }
};

const searchBlogCategory = async (query) => {
  try {
    const categories = await BlogCategory.find({
      title: { $regex: query, $options: 'i' },
    }).sort({ createdAt: -1 });
    return categories;
  } catch (err) {
    console.error('Error searching mini project categories:', err);
    throw err;
  }
};

module.exports = {
  createBlogCategory,
  getBlogCategoryById,
  updateBlogCategory,
  deleteBlogCategory,
  getAllBlogCategory,
  searchBlogCategory,
};