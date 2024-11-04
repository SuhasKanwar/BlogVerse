const comments = require("../models/comments")

exports.commentHandler = async (req, res) => {
    try{
        await comments.create({
            content: req.body.content,
            blogID: req.params.blogID,
            createdAt: Date.now(),
            createdBy: req.user._id
        });
        return res.redirect(`/blog/${req.params.blogID}`);
    }
    catch(error){
        return res.redirect(`/blog/${req.params.blogID}`);
    }
}