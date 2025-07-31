const CaseStudy = require('./caseStudies.mongo')

const createCaseStudy = async (data) => {
    try {
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
                imageUrl1: data.imageUrl1,
                imageUrl2: data.imageUrl2,
                imageUrl3: data.imageUrl3
                
            },
            demoUrl: data.demoUrl,
            githubUrl: data.githubUrl

        });

        return caseStudy._id
    } catch(err) {
        console.error('Error creating blog: ', err)
    }
}

const getCaseStudyById = async (id) => {
    try {
        const cleanedId = id.replace(/^:/, '');
        const caseStudy = await CaseStudy.findById(cleanedId);

        return caseStudy
    } catch(err) {
        console.error('Error fetching blog by ID: ', err)
    }
}

module.exports = {
    createCaseStudy,
    getCaseStudyById

}