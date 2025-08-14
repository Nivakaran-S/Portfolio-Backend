const {
  createCaseStudy,
  getCaseStudyById,
  updateCaseStudy,
  deleteCaseStudy,
  getAllCaseStudies,
  searchCaseStudies,
} = require('../../models/caseStudies/caseStudies.model');

const httpCreateCaseStudyController = async (req, res) => {
  try {
    const { title, challenge, solution, results, learnings, technologies, imageUrl, demoUrl, githubUrl } = req.body;

    if (!title || !challenge || !solution || !results || !imageUrl || !demoUrl || !githubUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const caseStudyId = await createCaseStudy({
      title,
      challenge,
      solution,
      results,
      learnings,
      technologies,
      imageUrl,
      demoUrl,
      githubUrl,
    });

    return res.status(201).json({ message: 'Case study created successfully', id: caseStudyId });
  } catch (err) {
    console.error('Error creating case study:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetCaseStudyByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const caseStudy = await getCaseStudyById(id);

    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    return res.status(200).json(caseStudy);
  } catch (err) {
    console.error('Error fetching case study:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpUpdateCaseStudyController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, challenge, solution, results, learnings, technologies, imageUrl, demoUrl, githubUrl } = req.body;

    if (!title || !challenge || !solution || !results || !imageUrl || !demoUrl || !githubUrl) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const caseStudy = await updateCaseStudy(id, {
      title,
      challenge,
      solution,
      results,
      learnings,
      technologies,
      imageUrl,
      demoUrl,
      githubUrl,
    });

    if (!caseStudy) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    return res.status(200).json({ message: 'Case study updated successfully', caseStudy });
  } catch (err) {
    console.error('Error updating case study:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpDeleteCaseStudyController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteCaseStudy(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Case study not found' });
    }

    return res.status(200).json({ message: 'Case study deleted successfully' });
  } catch (err) {
    console.error('Error deleting case study:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetAllCaseStudiesController = async (req, res) => {
  try {
    const caseStudies = await getAllCaseStudies();
    return res.status(200).json(caseStudies);
  } catch (err) {
    console.error('Error fetching all case studies:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpSearchCaseStudiesController = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const caseStudies = await searchCaseStudies(query);
    return res.status(200).json(caseStudies);
  } catch (err) {
    console.error('Error searching case studies:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  httpCreateCaseStudyController,
  httpGetCaseStudyByIdController,
  httpUpdateCaseStudyController,
  httpDeleteCaseStudyController,
  httpGetAllCaseStudiesController,
  httpSearchCaseStudiesController,
};
