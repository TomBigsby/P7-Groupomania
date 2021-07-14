const Publication = require('../models/Publication');
const mongoose = require('mongoose');

const fs = require('fs');


// DEBUG 

exports.createPublication = (req, res, next) => {

  const publicationObject = req.body;

  // const publicationObject = JSON.parse(req.body.sauce);

  // NOTE: suppression de l'id généré automatiquement par MongoDB
  delete publicationObject._id;

  if (req.file !== undefined) {
    var image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  const publication = new Publication({
    ...publicationObject,
    imageUrl: image,
    likes: 0,
    dislikes: 0,
    username: req.body.username,
    likeValue: 0
  });
  publication.save()
    .then(() => { res.status(201).json({ message: 'Publication ajoutée !' }); })
    .catch((error) => { res.status(400).json({ error: error }); });
};


exports.getAllPublications = (req, res, next) => {
  Publication.find().sort({ postDate: -1 })
    .then((publications) => { res.status(200).json(publications); })
    .catch((error) => { res.status(400).json({ error: error }); });
};




exports.modifyPublication = (req, res, next) => {

  /*   const publicationObject = req.file ?
      {
        ...JSON.parse(req.body.publication),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }; */





  Publication.updateOne({ _id: req.params.id }, { ...publicationObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Publication modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};




/*
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => { res.status(200).json(sauce); })
    .catch((error) => { res.status(404).json({ error: error }); });
};

exports.modifySauce = (req, res, next) => {
  // NOTE: Création d'un objet qui regarde si req.file existe ou non. S'il existe, on traite la nouvelle image ; s'il n'existe pas, on traite simplement l'objet entrant
  // NOTE: L'opérateur spread ... est utilisé pour faire une copie de tous les éléments de req.body
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !' }))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
        // NOTE: fs.unlink pour supprimer l'image de la sauce du serveur
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => { res.status(200).json(sauces); })
    .catch((error) => { res.status(400).json({ error: error }); });
};
*/


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




exports.createComment = (req, res, next) => {

  // génération d'un ID pour les commentaires
  var commentId = new mongoose.mongo.ObjectId();

  Publication.findOne({ _id: req.params.id })
    .then((publication) => {
      Publication.updateOne({ _id: req.params.id },
        {
          $push: {
            postComments: {
              commentId: commentId,
              commentAuthorId: req.body.commentAuthorId,
              commentAuthorUserName: req.body.commentAuthorUserName,
              commentAuthorAvatarUrl: req.body.commentAuthorAvatarUrl,
              commentDate: req.body.commentDate,
              commentAuthorMessage: req.body.commentAuthorMessage
            }
          }
        })
        .then(() => { res.status(200).json({ postComments: publication.postComments, commentId: publication.postComments.commentId }) })
        .catch(error => res.status(400).json({ error }));
    })
    .catch((error) => { res.status(404).json({ error: error }) });
}





exports.modifyComment = (req, res, next) => {
  var currentCommentId = req.body.commentId



  // Pistes : indexOfArray  OU filter

  /*     Publication.aggregate(
        [
          {
            "$project": {
              "matchedIndex": {
                "$indexOfArray": [
                  "$postComments", { "$player.commentAuthorUserName": { $eq: "Cirilo Hedylstone" } }
                ]
              }
            }
          }
        ]
      )
 
      console.log(matchedIndex); */


  /* Publication.aggregate([
    {
      $project: {
        postComments: {
          $filter: {
            input: "$postComments",
            as: "item",
            cond: { "$$item.commentId", currentCommentId }
          }
        }
      }
    }
  ]) */


  /*   Publication.findOne({ postComments: 17 })
      .then((comment) => {
        console.log(comment)
      } */

  // console.log("postComments[17] = " + publication.postComments[17].commentId);





  // Publication.updateOne({ _id: req.params.id }, { ...commentObject, _id: req.params.id })
  //   .then(() => res.status(200).json({ message: 'Commentaire modifié !' }))
  //   .catch(error => res.status(400).json({ error }));
};