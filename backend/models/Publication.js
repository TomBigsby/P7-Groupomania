const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
/*     userId: { type: String},
    username: { type: String, required: true },
    avatarUrl: { type: String},
    userService: { type: String },
    userFunction: { type: String },

    postId: { type: String },
    postDate: { type: Date }, */
    postTitle: { type: Number, required: true},
/*     imageUrl: { type: Number, required: true},
    Like: { type: Number },
    Dislike: { type: Number },
    usersLikes: { type: Array },
    usersDislikes: { type: Array },
    postComments: { type: Array } */
});

module.exports = mongoose.model('Publication', publicationSchema);