const mongoose = require('mongoose');

const categories = ['Food Blogs', 'Travel Blogs', 'Tech Blogs', 'Lifestyle Blogs', 'Fashion Blogs', "Miscelaneous"];

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImageURL: {
        type: String,
        required: false,
        default: '/cover-images/default-cover-image.jpg'
    },
    category: {
        type: String,
        required: true,
        enum: categories,
        default: "miscellaneous"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    createdAt: {
        type: Date,
        required: true
    }
}, { timeStamps: true });

const blogs = mongoose.model("blogs", blogSchema);

module.exports = blogs;