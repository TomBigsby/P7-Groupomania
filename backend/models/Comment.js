const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    postId: { type: String },
    commentAuthorId: { type: String },
    commentAuthorUserName: { type: String },
    commentAuthorAvatarUrl: { type: String },
    commentDate: { type: Date },
    commentAuthorMessage: { type: String }

});

module.exports = mongoose.model('Comment', commentSchema);