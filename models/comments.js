const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    blogID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blogs"
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

const comments = mongoose.model("comments", commentSchema);

module.exports = comments;