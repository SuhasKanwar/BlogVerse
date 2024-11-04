const Blog = require('../models/blogs');

exports.blogCreateRender = (req, res) => {
    return res.render('blogCreate', {
        user: req.user
    });
};

exports.blogCreateHandler = async (req, res) => {
    const { title, body, category } = req.body;
    if(req.file){
        const blog = await Blog.create({
            title,
            body,
            category,
            createdAt: Date.now(),
            createdBy: req.user._id,
            coverImageURL: `/cover-images/${req.file.filename}`
        });
        return res.redirect(`/blog/${blog._id}`);
    }
    else{
        const blog = await Blog.create({
            title,
            body,
            category,
            createdAt: Date.now(),
            createdBy: req.user._id
        });
        return res.redirect(`/blog/${blog._id}`);
    }
};