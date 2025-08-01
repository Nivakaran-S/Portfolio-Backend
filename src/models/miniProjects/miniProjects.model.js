const MiniProject = require('./miniProjects.mongo');

const createMiniProject = async (data) => {
  try {
    const miniProject = await MiniProject.create({
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      githubUrl: data.githubUrl,
      miniProjectCategory: data.miniProjectCategory,
      demoURL: data.demoUrl,
      createdAt: new Date(),
    });
    return miniProject._id;
  } catch (err) {
    console.error('Error creating mini project:', err);
    throw err;
  }
};

const getMiniProjectById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const miniProject = await MiniProject.findById(cleanedId);
    return miniProject;
  } catch (err) {
    console.error('Error fetching mini project by ID:', err);
    throw err;
  }
};

const updateMiniProject = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const miniProject = await MiniProject.findByIdAndUpdate(
      cleanedId,
      {
        title: data.title,
        description: data.description,
        miniProjectCategory: data.miniProjectCategory,
        imageUrl: data.imageUrl,
        githubUrl: data.githubUrl,
        demoURL: data.demoUrl,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    return miniProject;
  } catch (err) {
    console.error('Error updating mini project:', err);
    throw err;
  }
};

const deleteMiniProject = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await MiniProject.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting mini project:', err);
    throw err;
  }
};

const getAllMiniProjects = async () => {
  try {
    const miniProjects = await MiniProject.find({}).sort({ createdAt: -1 });
    return miniProjects;
  } catch (err) {
    console.error('Error fetching all mini projects:', err);
    throw err;
  }
};

const searchMiniProjects = async (query) => {
  try {
    const miniProjects = await MiniProject.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    return miniProjects;
  } catch (err) {
    console.error('Error searching mini projects:', err);
    throw err;
  }
};

module.exports = {
  createMiniProject,
  getMiniProjectById,
  updateMiniProject,
  deleteMiniProject,
  getAllMiniProjects,
  searchMiniProjects,
};