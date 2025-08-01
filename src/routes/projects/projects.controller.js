const { createProject, getProjectById, updateProject, deleteProject, getAllProjects, searchProjects } = require('../../models/projects/projects.model');

const httpCreateProjectController = async (req, res) => {
  try {
    const { title, projectOverview, images, problem, projectCategory, solution, techStack } = req.body;
    if (!title || !projectOverview || !images || !problem || !solution || !projectCategory || !techStack) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const projectId = await createProject({ title, projectOverview, images, projectCategory, problem, solution, techStack });
    return res.status(201).json({ message: 'Project created successfully', id: projectId });
  } catch (err) {
    console.error('Error creating project:', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

const httpGetProjectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getProjectById(id);
    return res.status(200).json(project);
  } catch (err) {
    console.error('Error fetching project:', err);
    return res.status(err.message.includes('not found') ? 404 : 500).json({ error: err.message || 'Internal server error' });
  }
};

const httpUpdateProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, projectOverview, projectCategory, images, problem, solution, techStack } = req.body;
    if (!title || !projectOverview || !projectCategory || !images || !problem || !solution || !techStack) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const project = await updateProject(id, { title, projectOverview, projectCategory, images, problem, solution, techStack });
    return res.status(200).json({ message: 'Project updated successfully', project });
  } catch (err) {
    console.error('Error updating project:', err);
    return res.status(err.message.includes('not found') ? 404 : 500).json({ error: err.message || 'Internal server error' });
  }
};

const httpDeleteProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProject(id);
    return res.status(200).json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    return res.status(err.message.includes('not found') ? 404 : 500).json({ error: err.message || 'Internal server error' });
  }
};

const httpGetAllProjectsController = async (req, res) => {
  try {
    const projects = await getAllProjects();
    return res.status(200).json(projects);
  } catch (err) {
    console.error('Error fetching all projects:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpSearchProjectsController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const projects = await searchProjects(query);
    return res.status(200).json(projects);
  } catch (err) {
    console.error('Error searching projects:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  httpCreateProjectController,
  httpGetProjectByIdController,
  httpUpdateProjectController,
  httpDeleteProjectController,
  httpGetAllProjectsController,
  httpSearchProjectsController,
};