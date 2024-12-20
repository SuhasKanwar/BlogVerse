const Blog = require('../models/blogs');

exports.collectionsRender = async (req, res) => {
    const allBlogs = await Blog.find({}).sort({ createdAt: -1 }).populate('createdBy');
    return res.render('collections', {
        user: req.user,
        blogs: allBlogs
    });
}