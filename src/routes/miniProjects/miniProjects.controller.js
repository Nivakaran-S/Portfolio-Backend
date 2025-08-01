const { createMiniProject, getMiniProjectById, updateMiniProject, deleteMiniProject, getAllMiniProjects, searchMiniProjects } = require('../../models/miniProjects/miniProjects.model');

const httpCreateMiniProjectController = async (req, res) => {
  try {
    const { title, description, miniProjectCategory, imageUrl, githubUrl, demoUrl } = req.body;
    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const miniProjectId = await createMiniProject({ title, miniProjectCategory, description, imageUrl, githubUrl, demoUrl });
    return res.status(201).json({ message: 'Mini project created successfully', id: miniProjectId });
  } catch (err) {
    console.error('Error creating mini project:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetMiniProjectByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const miniProject = await getMiniProjectById(id);
    if (!miniProject) {
      return res.status(404).json({ error: 'Mini project not found' });
    }
    return res.status(200).json(miniProject);
  } catch (err) {
    console.error('Error fetching mini project:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpUpdateMiniProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, imageUrl, miniProjectCategory, githubUrl, demoUrl } = req.body;
    if (!title || !description || !imageUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const miniProject = await updateMiniProject(id, { title, description, miniProjectCategory, imageUrl, githubUrl, demoUrl });
    if (!miniProject) {
      return res.status(404).json({ error: 'Mini project not found' });
    }
    return res.status(200).json({ message: 'Mini project updated successfully', miniProject });
  } catch (err) {
    console.error('Error updating mini project:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpDeleteMiniProjectController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteMiniProject(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Mini project not found' });
    }
    return res.status(200).json({ message: 'Mini project deleted successfully' });
  } catch (err) {
    console.error('Error deleting mini project:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetAllMiniProjectsController = async (req, res) => {
  try {
    const miniProjects = await getAllMiniProjects();
    return res.status(200).json(miniProjects);
  } catch (err) {
    console.error('Error fetching all mini projects:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpSearchMiniProjectsController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const miniProjects = await searchMiniProjects(query);
    return res.status(200).json(miniProjects);
  } catch (err) {
    console.error('Error searching mini projects:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  httpCreateMiniProjectController,
  httpGetMiniProjectByIdController,
  httpUpdateMiniProjectController,
  httpDeleteMiniProjectController,
  httpGetAllMiniProjectsController,
  httpSearchMiniProjectsController,
};