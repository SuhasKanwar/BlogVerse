const comments = require("../models/comments")

exports.commentHandler = async (req, res) => {
    await comments.create({
        content: req.body.content,
        blogID: req.params.blogID,
        createdBy: req.user._id
    });
    return res.redirect(`/blog/${req.params.blogID}`);
}