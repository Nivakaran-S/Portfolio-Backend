const ProjectCategory = require('./projectCategory.mongo');

const createProjectCategory = async (data) => {
  try {
    const category = await ProjectCategory.create({
      title: data.title,
      createdAt: new Date(),
    });
    return category._id;
  } catch (err) {
    console.error('Error creating mini project category:', err);
    throw err;
  }
};

const getProjectCategoryById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const category = await ProjectCategory.findById(cleanedId);
    return category;
  } catch (err) {
    console.error('Error fetching mini project category by ID:', err);
    throw err;
  }
};

const updateProjectCategory = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const category = await ProjectCategory.findByIdAndUpdate(
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

const deleteProjectCategory = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await MiniProjectCategory.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting mini project category:', err);
    throw err;
  }
};

const getAllProjectCategory = async () => {
  try {
    const categories = await ProjectCategory.find({}).sort({ createdAt: -1 });
    return categories;
  } catch (err) {
    console.error('Error fetching all mini project categories:', err);
    throw err;
  }
};

const searchProjectCategory = async (query) => {
  try {
    const categories = await ProjectCategory.find({
      title: { $regex: query, $options: 'i' },
    }).sort({ createdAt: -1 });
    return categories;
  } catch (err) {
    console.error('Error searching mini project categories:', err);
    throw err;
  }
};

module.exports = {
  createProjectCategory,
  getProjectCategoryById,
  updateProjectCategory,
  deleteProjectCategory,
  getAllProjectCategory,
  searchProjectCategory,
};