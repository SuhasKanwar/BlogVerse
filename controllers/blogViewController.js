const Blog = require('../models/blogs');

exports.blogViewRender = async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    return res.render('blogView', {
        user: req.user,
        blog: blog
    });
};