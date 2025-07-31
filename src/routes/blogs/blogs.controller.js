const { createBlog, getBlogById, updateBlog, deleteBlog, getAllBlogs, searchBlogs } = require('../../models/blogs/blogs.model');

const httpCreateBlogController = async (req, res) => {
  try {
    const { title, subtitle, content, imageUrl } = req.body;
    if (!title || !subtitle || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const blogId = await createBlog({ title, subtitle, content, imageUrl });
    return res.status(201).json({ message: 'Blog created successfully', id: blogId });
  } catch (err) {
    console.error('Error creating blog:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await getBlogById(id);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.status(200).json(blog);
  } catch (err) {
    console.error('Error fetching blog:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpUpdateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subtitle, content, imageUrl } = req.body;
    if (!title || !subtitle || !content) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const blog = await updateBlog(id, { title, subtitle, content, imageUrl });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.status(200).json({ message: 'Blog updated successfully', blog });
  } catch (err) {
    console.error('Error updating blog:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpDeleteBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await deleteBlog(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    return res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpGetAllBlogsController = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    return res.status(200).json(blogs);
  } catch (err) {
    console.error('Error fetching all blogs:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const httpSearchBlogsController = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }
    const blogs = await searchBlogs(query);
    return res.status(200).json(blogs);
  } catch (err) {
    console.error('Error searching blogs:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  httpCreateBlogController,
  httpGetBlogByIdController,
  httpUpdateBlogController,
  httpDeleteBlogController,
  httpGetAllBlogsController,
  httpSearchBlogsController,
};