const mysql = require('mysql');


// Connexion à la BDD
const db = mysql.createConnection({
  host: "localhost",
  user: process.env.ID_BDD_SQL,
  password: process.env.PW_BDD_SQL,
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


exports.createComment = (req, res, next) => {
  // Vérififcation dela présence d'unn fichier image

  const value1 = req.body.commentAuthorId
  const value2 = req.body.commentAuthorUserName
  const value3 = req.body.commentAuthorAvatarUrl
  const value4 = req.body.commentAuthorCommentDate
  const value5 = addslashes(req.body.commentAuthorMessage)
  const value6 = req.params.id


  db.query("INSERT INTO Comments( commentAuthorId, commentAuthorUserName, commentAuthorAvatarUrl, commentAuthorCommentDate, commentAuthorMessage, postId) VALUES ('" + value1 + "','" + value2 + "','" + value3 + "','" + value4 + "','" + value5 + "', '" + value6 + "')", function (err, result) {
    if (err) throw err;

    if (!result) {
      res.status(400).json({ error: "Erreur d'enregistrement" });
    } else {
      console.log("Commentaire ajouté");
      res.status(200).json(result)
    }
  });
}


exports.getAllComments = (req, res, next) => {
  db.query("SELECT * FROM Comments INNER JOIN Publications ON Comments.postId = Publications.postId", function (err, result) {
    if (err) throw err;

    res.status(200).json(result)
  })
};


exports.modifyComment = (req, res, next) => {


  db.query("UPDATE Comments SET commentAuthorMessage = '" + addslashes(req.body.commentAuthorMessage) + "' WHERE commentId = '" + req.params.id + "'", function (err, result) {
    if (err) throw err;

    if (!result) {
      console.log("Erreur d'enregistrement");
      error => res.status(400).json({ error })
    } else {
      console.log("Commentaire modifié")
      res.status(200).json(result)
    }
  });
};


exports.deleteComment = (req, res, next) => {
  db.query("DELETE FROM `Comments` WHERE commentId = '" + req.params.id + "'", function (err, result) {
    if (err) throw err;

    if (!result) {
      console.log("Erreur dlors de la suppression");
      error => res.status(400).json({ error })
    } else {
      console.log("Commentaire supprimé");
      res.status(200).json(result)
    }
  })
}