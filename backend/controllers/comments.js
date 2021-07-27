const Comment = require('../models/Comment');
const mongoose = require('mongoose');


exports.createComment = (req, res, next) => {
  const commentObject = req.body;

  var commentId = new mongoose.mongo.ObjectId();

  const comment = new Comment({
    ...commentObject,
    postId: req.params.id,
    commentAuthorId: req.body.commentAuthorId,
    commentAuthorUserName: req.body.commentAuthorUserName,
    commentAuthorAvatarUrl: req.body.commentAuthorAvatarUrl,
    commentDate: req.body.commentDate,
    commentAuthorMessage: req.body.commentAuthorMessage
  });
  comment.save()
    .then(() => { res.status(201).json({ message: 'Commentaire ajoutée !' }); })
    // .then((comment) => { res.status(200).json(comment) })
    .catch((error) => { res.status(400).json({ error: error }); });
};


exports.getAllComments = (req, res, next) => {
  Comment.find().sort({ postDate: -1 })
    .then((comment) => { res.status(200).json(comment); })
    .catch((error) => { res.status(400).json({ error: error }); });
};


exports.modifyComment = (req, res, next) => {
  const commentObject = { ...req.body };

  Comment.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
    .then(() => { res.status(200).json({ message: 'Commentaire modifié !' }); })
    .catch(error => res.status(400).json({ error }));
};


exports.deleteComment = (req, res, next) => {
  Comment.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Commentaire supprimée !' }))
    .catch(error => res.status(400).json({ error }));
};


exports.deleteCommentsFromPublication = (req, res, next) => {
  Comment.deleteMany({ "postId": req.params.id })
    .then(() => res.status(200).json({ message: 'Commentaires de publication supprimés !' }))
    .catch(error => res.status(400).json({ error }));
}