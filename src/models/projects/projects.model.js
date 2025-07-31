const Project = require('./projects.mongo');
const mongoose = require('mongoose');

const createProject = async (data) => {
  if (!data || !data.title || !data.projectOverview || !data.images || !data.problem || !data.solution || !data.techStack) {
    throw new Error('Missing required fields');
  }

  try {
    const project = await Project.create({
      title: data.title,
      projectOverview: data.projectOverview,
      images: {
        imageUrl1: data.images.imageUrl1,
        imageUrl2: data.images.imageUrl2,
        imageUrl3: data.images.imageUrl3,
        imageUrl4: data.images.imageUrl4,
        imageUrl5: data.images.imageUrl5,
        imageUrl6: data.images.imageUrl6,
      },
      problem: data.problem,
      solution: data.solution,
      techStack: data.techStack,
      createdAt: new Date(),
    });
    return project._id;
  } catch (err) {
    throw new Error(`Error creating project: ${err.message}`);
  }
};

const getProjectById = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid project ID');
  }

  try {
    const project = await Project.findById(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  } catch (err) {
    throw new Error(`Error fetching project: ${err.message}`);
  }
};

const updateProject = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid project ID');
  }

  try {
    const project = await Project.findByIdAndUpdate(
      id,
      {
        title: data.title,
        projectOverview: data.projectOverview,
        images: {
          imageUrl1: data.images.imageUrl1,
          imageUrl2: data.images.imageUrl2,
          imageUrl3: data.images.imageUrl3,
          imageUrl4: data.images.imageUrl4,
          imageUrl5: data.images.imageUrl5,
          imageUrl6: data.images.imageUrl6,
        },
        problem: data.problem,
        solution: data.solution,
        techStack: data.techStack,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  } catch (err) {
    throw new Error(`Error updating project: ${err.message}`);
  }
};

const deleteProject = async (id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid project ID');
  }

  try {
    const project = await Project.findByIdAndDelete(id);
    if (!project) {
      throw new Error('Project not found');
    }
    return true;
  } catch (err) {
    throw new Error(`Error deleting project: ${err.message}`);
  }
};

const getAllProjects = async () => {
  try {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return projects;
  } catch (err) {
    throw new Error(`Error fetching all projects: ${err.message}`);
  }
};

const searchProjects = async (query) => {
  try {
    const projects = await Project.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { projectOverview: { $regex: query, $options: 'i' } },
        { problem: { $regex: query, $options: 'i' } },
        { solution: { $regex: query, $options: 'i' } },
        { techStack: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    return projects;
  } catch (err) {
    throw new Error(`Error searching projects: ${err.message}`);
  }
};

module.exports = {
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
  getAllProjects,
  searchProjects,
};