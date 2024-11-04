const Blog = require('../models/blogs');
const Comment = require('../models/comments');

exports.blogViewRender = async (req, res) => {
    const blog = await Blog.findById(req.params.id).populate('createdBy');
    const comments = await Comment.find({ blogID: req.params.id }).populate('createdBy');
    return res.render('blogView', {
        user: req.user,
        blog: blog,
        comments: comments
    });
};