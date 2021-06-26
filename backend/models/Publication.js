const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    // userId: { type: String},
    username: { type: String },
    // avatarUrl: { type: String},
    // userService: { type: String },
    // userFunction: { type: String },

    postId: { type: String },
    postDate: { type: Date },
    postTitle: { type: String },
    imageUrl: { type: String},
    like: { type: Number },
    dislike: { type: Number },
    // usersLikes: { type: Array },
    // usersDislikes: { type: Array },
    // postComments: { type: Array }
});

module.exports = mongoose.model('Publication', publicationSchema);