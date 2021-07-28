const mysql = require('mysql');

const fs = require('fs');


// Connexion à la BDD
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: 'p7_groupomania',
  socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});


// function permettant d'échapper certains caractères pour SQL
let addslashes = (str) => {
  str = str.replace(/\n/g, '\\\n')
  str = str.replace(/\n/g, '\\\n')
  str = str.replace(/\t/g, '\\\t')
  str = str.replace(/\f/g, '\\\f')
  str = str.replace(/\r/g, '\\\r')
  str = str.replace(/'/g, '\\\'')
  str = str.replace(/"/g, '\\\"')
  return str
}

exports.getAllPublications = (req, res, next) => {
  db.query("SELECT * FROM Publications ORDER BY postDate DESC", function (err, result) {
    if (err) throw err;

    res.status(200).json(result)
  })
}


exports.createPublication = (req, res, next) => {
  // Vérififcation dela présence d'unn fichier image
  if (req.file !== undefined) {
    var image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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

    db.query("UPDATE Publications SET postTitle = '" + req.body.postTitle + "' , imageUrl = '" + imageUrl + "' WHERE postId = '" + req.params.id + "'", function (err, result) {
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
    db.query("UPDATE Publications SET postTitle = '" + req.body.postTitle + "' WHERE postId = '" + req.params.id + "'", function (err, result) {
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

  db.query("SELECT imageUrl FROM Publications WHERE postId = '" + req.params.id + "'", function (err, result) {
    if (err) throw err;


    const filename = result[0].imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {

      db.query("DELETE Publications, Comments FROM Publications INNER JOIN Comments ON Comments.postId = Publications.postId WHERE Publications.postId = '" + req.params.id + "'", function (err, result) {
        if (err) throw err;

        if (!result) {
          console.log("Erreur dlors de la suppression");
          error => res.status(400).json({ error })
        } else {
          console.log("Publication supprimée");
        }
      })
    })
  })
}


/* exports.deletePublication = (req, res, next) => {
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
}; */
