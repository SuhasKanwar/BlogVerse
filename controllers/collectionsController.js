const Blog = require('../models/blogs');

exports.collectionsRender = async (req, res) => {
    const allBlogs = await Blog.find({}).sort('createdAt');
    return res.render('collections', {
        user: req.user,
        blogs: allBlogs
    });
}