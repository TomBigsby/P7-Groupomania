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

    postComments: { type: Array }
});

module.exports = mongoose.model('Publication', publicationSchema);