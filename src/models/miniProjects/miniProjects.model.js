const MiniProject = require('./miniProjects.mongo')

const createMiniProject = async (data) => {
    try {
        const miniProject = await Contact.create({
            title: data.title,
            description: data.description,
            imageUrl: data.imageUrl,
            githubUrl: data.githubUrl,
            demoURL: data.demoURL
        });

        return miniProject._id
    } catch(err) {
        console.error('Error creating mini project: ', err)
    }
}

const getMiniProjectById = async (id) => {
    try {
        const cleanedId = id.replace(/^:/, '');
        const miniProject = await MiniProject.findById(cleanedId);

        return miniProject
    } catch(err) {
        console.error('Error fetching mini project by ID: ', err)
    }
}

module.exports = {
    createMiniProject,
    getMiniProjectById

}