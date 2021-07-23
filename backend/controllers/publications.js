const Publication = require('../models/Publication');
const mongoose = require('mongoose');

const fs = require('fs');


exports.createPublication = (req, res, next) => {
  const publicationObject = req.body;
  // NOTE: suppression de l'id généré automatiquement par MongoDB
  delete publicationObject._id;

  if (req.file !== undefined) {
    var image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  const publication = new Publication({
    ...publicationObject,
    imageUrl: image,
    userId: req.body.userId,
    username: req.body.username,
    avatarUrl: req.body.avatarUrl,
    likes: 0,
    dislikes: 0,
    likeValue: 0
  });
  publication.save()
    .then(() => { res.status(201).json({ message: 'Publication ajoutée !' }); })
    .catch((error) => { res.status(400).json({ error: error }); });
};


exports.getAllPublications = (req, res, next) => {
  Publication.find().sort({ postDate: -1 })
    .then((publication) => { res.status(200).json(publication); })
    .catch((error) => { res.status(400).json({ error: error }); });
};



exports.modifyPublication = (req, res, next) => {

  const publicationObject = req.file ?
    {
      ...req.body,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

  Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
    .then(() => { res.status(200).json({ message: 'Publication modifiée !' }); })
    .catch(error => res.status(400).json({ error }));
};


exports.deletePublication = (req, res, next) => {
  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      const filename = publication.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Publication.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Publication supprimée !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


// Actions du like
exports.likePublication = (req, res, next) => {

  // Action du like si 1 ou -1
  const likeAction = (likeValue, action1, message1) => {
    if (likeValue) {
      Publication.findOne({ _id: req.params.id })
        .then((publication) => {
          Publication.updateOne({ _id: req.params.id }, action1)
            // .then(() => res.status(200).json(message1))
            .then(() => { res.status(200).json({ likes: publication.likes, dislikes: publication.dislikes, likeValue: publication.likeValue }) })
            .catch(error => res.status(400).json({ error }));
        })
        .catch((error) => { res.status(404).json({ error: error }); });
    }
  }

  // Action du like si 0
  const likeAction0 = (likeValue) => {
    if (likeValue) {
      Publication.findOne({ _id: req.params.id })
        .then((publication) => {
          if (publication.usersLiked.includes(req.body.userId)) {
            Publication.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 }, $set: { likeValue: 0 } })
              // Annule le like
              .then(() => { res.status(200).json({ likes: publication.likes, dislikes: publication.dislikes, likeValue: publication.likeValue }) })
              .catch(error => res.status(400).json({ error }));
          }
          if (publication.usersDisliked.includes(req.body.userId)) {
            Publication.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 }, $set: { likeValue: 0 } })
              // Annule le dislike
              .then(() => { res.status(200).json({ likes: publication.likes, dislikes: publication.dislikes, likeValue: publication.likeValue }) })
              .catch(error => res.status(400).json({ error }));
          }
        })
        .catch((error) => { res.status(404).json({ error: error }) });
    }
  }


  // Si je like, on ajoute l'userId dans l'array "usersLiked" et on incrémente le nombre total de likes
  likeAction(req.body.like === 1, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 }, $set: { likeValue: 1 } }, { message: 'Like ajouté !' });

  // Si je dislike on ajoute l'userId dans l'array "usersDisliked" et on incrémente le nombre total de dislikes
  likeAction(req.body.like === -1, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 }, $set: { likeValue: -1 } }, { message: 'Dislike ajouté !' });

  // Si j'annule le like ou dislike, on supprime l'userId de l'array "usersLiked" ou "usersDisLiked" et on décrémente le nombre total de likes/dislikes
  likeAction0(req.body.like === 0);
};


