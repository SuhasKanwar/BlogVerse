const mongoose = require('mongoose');

const categories = ["food", "travel", "tech", "lifestyle", "fashion", "miscellaneous"];

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
    }
}, { timeStamps: true });

const blogs = mongoose.model("blogs", blogSchema);

module.exports = blogs;