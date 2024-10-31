const mongoose = require('mongoose');

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
        required: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timeStamps: true });

const blogs = mongoose.model("blogs", blogSchema);

module.exports = blogs;