const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

const Blog = require("../models/blogs");
const Comment = require("../models/comments");
const Users = require("../models/users");

exports.profileRender = async (req, res) => {
  const profileID = req.params.id;

  if (!req.user) {
    return res.redirect("/login");
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(profileID)) {
      return res.status(400).send("Invalid profile ID");
    }

    const userBlogs = await Blog.find({ createdBy: profileID }).sort({
      createdAt: -1,
    });

    const userComments = await Comment.find({ createdBy: profileID })
      .populate("blogID")
      .sort({ createdAt: -1 });

    const user = await Users.findById(profileID);

    return res.render("profile", {
      user: user,
      blogs: userBlogs,
      comments: userComments,
      currUser: req.user,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
};

exports.profileEditRednder = async (req, res) => {
  const profileID = req.params.id;
  if (req.user._id.toString() === profileID.toString()) {
    const user = await Users.findById(profileID);
    return res.render("profile-edit", {
      user: user,
    });
  } else {
    return res.redirect("/");
  }
};

exports.profileUpdateHandler = async (req, res) => {
  try {
    const {
      fullName,
      email,
      userName,
      bio,
      dateOfBirth,
      gender,
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
    } = req.body;

    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    let profileImageURL = user.profileImageURL;
    
    if (req.file) {
      const newImagePath = `/avatars/${req.file.filename}`;
      
      if (
        user.profileImageURL && 
        user.profileImageURL !== '/avatars/default-avatar.png' && 
        user.profileImageURL !== newImagePath
      ) {
        try {
          const currentImageFilename = path.basename(user.profileImageURL);
          
          const currentImagePath = path.join(__dirname, '../public/avatars', currentImageFilename);
          
          await fs.unlink(currentImagePath);
          console.log('Previous image deleted successfully');
        } catch (deleteErr) {
          console.error('Error deleting previous image:', deleteErr);
        }
      }
      
      profileImageURL = newImagePath;
    }

    user.fullName = fullName;
    user.email = email;
    user.userName = userName;
    user.bio = bio;
    
    if (dateOfBirth) {
      user.dateOfBirth = new Date(dateOfBirth);
    }
    
    user.gender = gender;
    
    user.socials = {
      facebook: facebook || '',
      twitter: twitter || '',
      instagram: instagram || '',
      linkedin: linkedin || '',
      github: github || ''
    };

    user.profileImageURL = profileImageURL;

    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id, 
      user, 
      { 
        new: true,
        runValidators: true
      }
    );

    console.log("Updated User:", updatedUser);

    res.redirect(`/profile/${user._id}`);
  } catch (err) {
    console.error("Full Error:", err);
    res.status(500).send("Server Error: " + err.message);
  }
};