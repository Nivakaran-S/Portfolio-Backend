const MiniProjectCategory = require('./miniProjectCategory.mongo');

const createMiniProjectCategory = async (data) => {
  try {
    const category = await MiniProjectCategory.create({
      title: data.title,
      createdAt: new Date(),
    });
    return category._id;
  } catch (err) {
    console.error('Error creating mini project category:', err);
    throw err;
  }
};

const getMiniProjectCategoryById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const category = await MiniProjectCategory.findById(cleanedId);
    return category;
  } catch (err) {
    console.error('Error fetching mini project category by ID:', err);
    throw err;
  }
};

const updateMiniProjectCategory = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const category = await MiniProjectCategory.findByIdAndUpdate(
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

const deleteMiniProjectCategory = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await MiniProjectCategory.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting mini project category:', err);
    throw err;
  }
};

const getAllMiniProjectCategory = async () => {
  try {
    const categories = await MiniProjectCategory.find({}).sort({ createdAt: -1 });
    return categories;
  } catch (err) {
    console.error('Error fetching all mini project categories:', err);
    throw err;
  }
};

const searchMiniProjectCategory = async (query) => {
  try {
    const categories = await MiniProjectCategory.find({
      title: { $regex: query, $options: 'i' },
    }).sort({ createdAt: -1 });
    return categories;
  } catch (err) {
    console.error('Error searching mini project categories:', err);
    throw err;
  }
};

module.exports = {
  createMiniProjectCategory,
  getMiniProjectCategoryById,
  updateMiniProjectCategory,
  deleteMiniProjectCategory,
  getAllMiniProjectCategory,
  searchMiniProjectCategory,
};