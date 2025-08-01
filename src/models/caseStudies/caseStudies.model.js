const CaseStudy = require('./caseStudies.mongo');


const createCaseStudy = async (data) => {
  try {
    // Validate required fields
    if (
      !data.title ||
      !data.description ||
      !data.client ||
      !data.industry ||
      !data.services?.length ||
      !data.challenge ||
      !data.solution ||
      !data.results ||
      !data.images?.imageUrl1 ||
      !data.demoUrl ||
      !data.githubUrl
    ) {
      throw new Error(
        'Missing required fields: title, description, client, industry, services, challenge, solution, results, images.imageUrl1, demoUrl, or githubUrl'
      );
    }

    const caseStudy = await CaseStudy.create({
      title: data.title,
      description: data.description,
      client: data.client,
      industry: data.industry,
      services: data.services,
      challenge: data.challenge,
      solution: data.solution,
      results: data.results,
      images: {
        imageUrl1: data.images.imageUrl1,
        imageUrl2: data.images.imageUrl2 || undefined,
        imageUrl3: data.images.imageUrl3 || undefined,
      },
      demoUrl: data.demoUrl,
      githubUrl: data.githubUrl,
      createdTimestamp: new Date(),
    });

    return caseStudy._id;
  } catch (err) {
    console.error('Error creating case study:', err);
    throw err;
  }
};


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

const updateCaseStudy = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const caseStudy = await CaseStudy.findByIdAndUpdate(
      cleanedId,
      {
        title: data.title,
        description: data.description,
        client: data.client,
        industry: data.industry,
        services: data.services,
        challenge: data.challenge,
        solution: data.solution,
        results: data.results,
        images: {
          imageUrl1: data.imageUrl1,
          imageUrl2: data.imageUrl2,
          imageUrl3: data.imageUrl3,
        },
        demoUrl: data.demoUrl,
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

const getAllCaseStudies = async () => {
  try {
    const caseStudies = await CaseStudy.find({}).sort({ createdAt: -1 });
    return caseStudies;
  } catch (err) {
    console.error('Error fetching all case studies:', err);
    throw err;
  }
};

const searchCaseStudies = async (query) => {
  try {
    const caseStudies = await CaseStudy.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { client: { $regex: query, $options: 'i' } },
        { industry: { $regex: query, $options: 'i' } },
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