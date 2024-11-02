const Blog = require('../models/blogs');

exports.blogCreateRender = (req, res) => {
    return res.render('blogCreate', {
        user: req.user
    });
};

exports.blogCreateHandler = async (req, res) => {
    console.log(req.body);
    const { title, body } = req.body;
    const blog = await Blog.create({
        title,
        body,
        createdBy: req.user._id,
        coverImageURL: `/cover-images/${req.file.filename}`
    });
    return res.redirect(`/blog/${blog._id}`);
};