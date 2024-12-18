const Blog = require('../models/blogs');
const Comment = require('../models/comments');

exports.profileRender = async (req, res) => {
    if(!req.user){
        return res.redirect('/login');
    }

    try {
        const userBlogs = await Blog.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
        
        const userComments = await Comment.find({ createdBy: req.user._id }).populate('blogID').sort({ createdAt: -1 });

        return res.render('profile', {
            user: req.user,
            blogs: userBlogs,
            comments: userComments
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
};