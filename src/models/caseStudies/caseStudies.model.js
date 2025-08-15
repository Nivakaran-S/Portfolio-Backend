const CaseStudy = require('./caseStudies.mongo');

// Create a new case study
const createCaseStudy = async (data) => {
  try {
    if (
      !data.title ||
      !data.challenge ||
      !data.solution ||
      !data.results ||
      !data.imageUrl ||
      !data.demoUrl ||
      !data.githubUrl ||
      !data.overview
    ) {
      throw new Error(
        'Missing required fields: title, challenge, solution, results, imageUrl, demoUrl, or githubUrl'
      );
    }

    const caseStudy = await CaseStudy.create({
      title: data.title,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      learnings: data.learnings || '',
      technologies: data.technologies || [],
      imageUrl: data.imageUrl,
      demoUrl: data.demoUrl,
      overview: data.overview || '',
      githubUrl: data.githubUrl,
    });

    return caseStudy._id;
  } catch (err) {
    console.error('Error creating case study:', err);
    throw err;
  }
};

// Get case study by ID
const getCaseStudyById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const caseStudy = await CaseStudy.findById(cleanedId);
    return caseStudy;
  } catch (err) {
    console.error('Error fetching case study by ID:', err);
    throw err;
  }
};

// Update a case study
const updateCaseStudy = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const caseStudy = await CaseStudy.findByIdAndUpdate(
      cleanedId,
      {
        title: data.title,
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        learnings: data.learnings || '',
        technologies: data.technologies || [],
        imageUrl: data.imageUrl,
        demoUrl: data.demoUrl,
        overview: data.overview || '',
        githubUrl: data.githubUrl,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    return caseStudy;
  } catch (err) {
    console.error('Error updating case study:', err);
    throw err;
  }
};

// Delete a case study
const deleteCaseStudy = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await CaseStudy.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting case study:', err);
    throw err;
  }
};

// Get all case studies
const getAllCaseStudies = async () => {
  try {
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    return caseStudies;
  } catch (err) {
    console.error('Error fetching all case studies:', err);
    throw err;
  }
};

// Search case studies
const searchCaseStudies = async (query) => {
  try {
    const caseStudies = await CaseStudy.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { challenge: { $regex: query, $options: 'i' } },
        { solution: { $regex: query, $options: 'i' } },
        { results: { $regex: query, $options: 'i' } },
        { technologies: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    return caseStudies;
  } catch (err) {
    console.error('Error searching case studies:', err);
    throw err;
  }
};

module.exports = {
  createCaseStudy,
  getCaseStudyById,
  updateCaseStudy,
  deleteCaseStudy,
  getAllCaseStudies,
  searchCaseStudies,
};
