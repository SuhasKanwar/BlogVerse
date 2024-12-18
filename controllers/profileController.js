const mongoose = require("mongoose");
const Blog = require("../models/blogs");
const Comment = require("../models/comments");
const Users = require("../models/users");
const fs = require("fs");
const path = require("path");

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
      bio,
      dateOfBirth,
      gender,
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
    } = req.body;

    // Find the user
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Handle profile image
    let profileImageURL = user.profileImageURL;
    if (req.file) {
      profileImageURL = `/avatars/${req.file.filename}`;
    }

    // Update user fields using direct assignment
    user.fullName = fullName;
    user.email = email;
    user.bio = bio;
    
    // Only update date of birth if it's not empty
    if (dateOfBirth) {
      user.dateOfBirth = new Date(dateOfBirth);
    }
    
    user.gender = gender;
    
    // Update social links
    user.socials = {
      facebook: facebook || '',
      twitter: twitter || '',
      instagram: instagram || '',
      linkedin: linkedin || '',
      github: github || ''
    };

    // Update profile image
    user.profileImageURL = profileImageURL;

    // Use findByIdAndUpdate instead of save()
    const updatedUser = await Users.findByIdAndUpdate(
      req.params.id, 
      user, 
      { 
        new: true,  // Return the modified document
        runValidators: true  // Run model validations
      }
    );

    console.log("Updated User:", updatedUser);

    res.redirect(`/profile/${user._id}`);
  } catch (err) {
    console.error("Full Error:", err);
    res.status(500).send("Server Error: " + err.message);
  }
};