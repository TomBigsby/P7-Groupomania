const fs = require('fs');
const { addslashes } = require('../utils/function_addslashes.js');
const db = require('../utils/db_connexion_local');
// const db = require('../utils/db_connexion');


exports.getAllPublications = (req, res, next) => {
  db.query("SELECT * FROM Publications ORDER BY postDate DESC", function (err, result) {
    if (err) throw err;

    res.status(200).json(result)
  })
}


exports.createPublication = (req, res, next) => {
  let image = null;

  if (req.file !== undefined) {
    const fileExtension = req.file.originalname.split('.').pop(); // Récupère l'extension du fichier d'origine
    const uniqueFileName = `${Date.now()}-${Math.floor(Math.random() * 1000000)}.${fileExtension}`; // Génère un nom de fichier unique basé sur l'horodatage actuel et un nombre aléatoire entre 0 et 999999

    // Déplace le fichier vers le dossier "images" avec le nouveau nom
    const newPath = `images/${uniqueFileName}`;
    fs.renameSync(req.file.path, newPath);

    image = `${req.protocol}://${req.get('host')}/${newPath}`;
  }



  const value1 = req.body.userId
  const value2 = req.body.username
  const value3 = req.body.avatarUrl
  const value4 = addslashes(req.body.postTitle)
  const value5 = image
  const value6 = req.body.postDate


  db.query("INSERT INTO Publications( userId, username, avatarUrl,  postTitle, imageUrl, postDate) VALUES ('" + value1 + "','" + value2 + "','" + value3 + "','" + value4 + "','" + value5 + "', '" + value6 + "')", function (err, result) {
    if (err) throw err;


    if (!result) {
      console.log("Erreur d'enregistrement");
      res.status(400).json({ error: error });
    } else {
      console.log("Publication ajoutée");
      res.status(200).json(result)
    }
  });
}



exports.modifyPublication = (req, res, next) => {
  if (req.file !== undefined) {
    var imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`

    db.query("UPDATE Publications SET postTitle = '" + addslashes(req.body.postTitle) + "' , imageUrl = '" + imageUrl + "' WHERE postId = '" + req.params.id + "'", function (err, result) {
      if (err) throw err;

      if (!result) {
        console.log("Erreur d'enregistrement");
        error => res.status(400).json({ error })
      } else {
        console.log("Publication modifiée")
        res.status(200).json({ message: 'Publication modifiée !' })
      }
    });
  } else {
    db.query("UPDATE Publications SET postTitle = '" + addslashes(req.body.postTitle) + "' WHERE postId = '" + req.params.id + "'", function (err, result) {
      if (err) throw err;

      if (!result) {
        console.log("Erreur d'enregistrement");
        error => res.status(400).json({ error })
      } else {
        console.log("Publication modifiée")
        res.status(200).json({ message: 'Publication modifiée !' })
      }
    });
  }
};


exports.deletePublication = (req, res, next) => {
  // Sélection et suppression de l'image
  db.query("SELECT imageUrl FROM Publications WHERE postId = '" + req.params.id + "'", function (err, result) {
    if (err) throw err;
    const filename = result[0].imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {

      // Si la publication possède des commentaires...
      db.query("SELECT * FROM Publications INNER JOIN Comments ON Comments.postId = Publications.postId WHERE Publications.postId = '" + req.params.id + "'", function (err, result) {
        if (result) {
          db.query("DELETE Publications, Comments FROM Publications INNER JOIN Comments ON Comments.postId = Publications.postId WHERE Publications.postId = '" + req.params.id + "'", function (err, result) {

          })
        }
      })
      // Si la publication ne possède pas des commentaires...
      db.query("SELECT * FROM Publications WHERE postId = '" + req.params.id + "'", function (err, result) {
        if (result) {
          db.query(" DELETE  FROM Publications WHERE postId = '" + req.params.id + "'", function (err, result) {

          })
        }
      })
    })
    if (!result) {
      console.log("Erreur dlors de la suppression");
      error => res.status(400).json({ error })

    } else {
      console.log("Publication supprimée");
      res.status(200).json(result)
    }
  })
}
