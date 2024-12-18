const mongoose = require('mongoose');
const Blog = require('../models/blogs');
const Comment = require('../models/comments');
const Users = require('../models/users');

exports.profileRender = async (req, res) => {
    const profileID = req.params.id;

    if (!req.user) {
        return res.redirect('/login');
    }

    try {
        if (!mongoose.Types.ObjectId.isValid(profileID)) {
            return res.status(400).send('Invalid profile ID');
        }

        const userBlogs = await Blog.find({ createdBy: profileID }).sort({ createdAt: -1 });
        
        const userComments = await Comment.find({ createdBy: profileID }).populate('blogID').sort({ createdAt: -1 });

        const user = await Users.findById(profileID);

        return res.render('profile', {
            user: user,
            blogs: userBlogs,
            comments: userComments
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send('Server Error');
    }
};