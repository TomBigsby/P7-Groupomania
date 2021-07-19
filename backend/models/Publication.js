const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    userId: { type: String },
    
    postId: { type: String },
    postDate: { type: Date },
    postTitle: { type: String },
    imageUrl: { type: String },
    likes: { type: Number },
    dislikes: { type: Number },
    usersLiked: { type: Array },
    usersDisliked: { type: Array },
    likeValue: { type: Number },
    
    username: { type: String },
    avatarUrl: { type: String },

    postComments: { type: Array }
    
});

module.exports = mongoose.model('Publication', publicationSchema);