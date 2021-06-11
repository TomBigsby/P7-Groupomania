const Publication = require('../models/Publication');

const fs = require('fs');


// test 
/* exports.createPublication = (req, res, next) => {
  res.status(201).json({ message: req.body });
} */

exports.createPublication = (req, res, next) => {

  // Debug
  res.status(201).json({ message: req.body });

  const publicationObject = JSON.parse(req.body);
  // NOTE: suppression de l'id généré automatiquement par MongoDB
  delete publicationObject._id;
  const publication = new Publication({
    ...publicationObject,
    // imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  });
  publication.save()
    .then(() => { res.status(201).json({ message: 'Publication ajoutée !' }); })
    .catch((error) => { res.status(400).json({ error: error }); });
};




/* exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  // NOTE: suppression de l'id généré automatiquement par MongoDB
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0
  });
  sauce.save()
    .then(() => { res.status(201).json({ message: 'Sauce enregistrée !' }); })
    .catch((error) => { res.status(400).json({ error: error }); });
};

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

// Actions du like
exports.likeSauce = (req, res, next) => {
  const likeAction = (likeValue, action1, message1) => {
    if (likeValue) {
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          Sauce.updateOne({ _id: req.params.id }, action1)
            .then(() => res.status(200).json(message1))
            .catch(error => res.status(400).json({ error }));
        })
        .catch((error) => { res.status(404).json({ error: error }); });
    }
  }

  const likeAction0 = (likeValue) => {
    if (likeValue) {
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: req.body.userId }, $inc: { likes: -1 } })
              .then(() => res.status(200).json({ message: 'Annule le like !' }))
              .catch(error => res.status(400).json({ error }));
          }
          if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: req.body.userId }, $inc: { dislikes: -1 } })
              .then(() => res.status(200).json({ message: 'Annule le dislike !' }))
              .catch(error => res.status(400).json({ error }));
          }
        })
        .catch((error) => { res.status(404).json({ error: error }); });
    }
  }
  // Si je like, on ajoute l'userId dans l'array "usersLiked" et on incrémente le nombre total de likes
  likeAction(req.body.like === 1, { $push: { usersLiked: req.body.userId }, $inc: { likes: +1 } }, { message: 'Like ajouté !' });

  // Si je dislike on ajoute l'userId dans l'array "usersDisliked" et on incrémente le nombre total de dislikes
  likeAction(req.body.like === -1, { $push: { usersDisliked: req.body.userId }, $inc: { dislikes: +1 } }, { message: 'Dislike ajouté !' });

  // Si j'annule le like ou dislike, on supprime l'userId de l'array "usersLiked" ou "usersDisLiked" et on décrémente le nombre total de likes/dislikes
  likeAction0(req.body.like === 0);

}; */