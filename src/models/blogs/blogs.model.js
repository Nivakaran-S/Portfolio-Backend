const Blog = require('./blogs.mongo');

const createBlog = async (data) => {
  try {
    const blog = await Blog.create({
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
      blogsCategory: data.blogsCategory,
      imageUrl: data.imageUrl,
      createdAt: new Date(),
    });
    return blog._id;
  } catch (err) {
    console.error('Error creating blog:', err);
    throw err;
  }
};

const getBlogById = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const blog = await Blog.findById(cleanedId);
    return blog;
  } catch (err) {
    console.error('Error fetching blog by ID:', err);
    throw err;
  }
};

const updateBlog = async (id, data) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    const blog = await Blog.findByIdAndUpdate(
      cleanedId,
      {
        title: data.title,
        subtitle: data.subtitle,
        content: data.content,
        blogsCategory: data.blogsCategory,
        imageUrl: data.imageUrl,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    );
    return blog;
  } catch (err) {
    console.error('Error updating blog:', err);
    throw err;
  }
};

const deleteBlog = async (id) => {
  try {
    const cleanedId = id.replace(/^:/, '').trim();
    await Blog.findByIdAndDelete(cleanedId);
    return true;
  } catch (err) {
    console.error('Error deleting blog:', err);
    throw err;
  }
};

const getAllBlogs = async () => {
  try {
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return blogs;
  } catch (err) {
    console.error('Error fetching all blogs:', err);
    throw err;
  }
};

const searchBlogs = async (query) => {
  try {
    const blogs = await Blog.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { subtitle: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
      ],
    }).sort({ createdAt: -1 });
    return blogs;
  } catch (err) {
    console.error('Error searching blogs:', err);
    throw err;
  }
};

module.exports = {
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
  getAllBlogs,
  searchBlogs,
};