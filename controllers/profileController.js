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

    let profileImageURL = req.body.profileImageURL;
    if (req.file) {
      profileImageURL = `/uploads/${req.file.filename}`;
    }

    const user = await Users.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (req.file && user.profileImageURL !== '/avatars/default-avatar.png') {
      const oldAvatarPath = path.join(__dirname, '../public', user.profileImageURL);
      fs.unlink(oldAvatarPath, (err) => {
        if (err) {
          console.error("Error deleting old avatar:", err);
        } else {
          console.log("Old avatar deleted successfully");
        }
      });
    }

    // Update the user's fields
    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.dateOfBirth = dateOfBirth || user.dateOfBirth;
    user.gender = gender || user.gender;
    user.socials = {
      facebook: facebook || user.socials.facebook,
      twitter: twitter || user.socials.twitter,
      instagram: instagram || user.socials.instagram,
      linkedin: linkedin || user.socials.linkedin,
      github: github || user.socials.github,
    };
    user.profileImageURL = profileImageURL;

    await user.save();

    res.redirect(`/profile/${user._id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};