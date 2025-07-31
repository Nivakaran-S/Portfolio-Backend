const Blog = require('./blogs.mongo')

const createBlog = async (data) => {
    try {
        const blog = await Blog.create({
            title: data.title,
            subtitle: data.subtitle,
            content: data.content,
            imageUrl: data.imageUrl
        });

        return blog._id
    } catch(err) {
        console.error('Error creating blog: ', err)
    }
}

const getBlogById = async (id) => {
    try {
        const cleanedId = id.replace(/^:/, '');
        const blog = await Blog.findById(cleanedId);

        return blog
    } catch(err) {
        console.error('Error fetching blog by ID: ', err)
    }
}

module.exports = {
    createBlog,
    getBlogById

}