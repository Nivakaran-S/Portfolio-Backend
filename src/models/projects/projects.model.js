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
                imageUrl6: data.images.imageUrl6
            },
            problem: data.problem,
            solution: data.solution,
            techStack: data.techStack
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

module.exports = {
    createProject,
    getProjectById
};