const { addslashes } = require('../utils/function_addslashes.js');
const db = require('../utils/db_connexion_local');
// const db = require('../utils/db_connexion');


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
      const insertedCommentId = result.insertId;

      // Récupérer les détails du commentaire ajouté
      db.query("SELECT * FROM Comments WHERE commentId = " + insertedCommentId, function (err, comment) {
        if (err) throw err;

        if (!comment || comment.length === 0) {
          res.status(400).json({ error: "Erreur lors de la récupération du commentaire ajouté" });
        } else {
          console.log("Commentaire ajouté");
          res.status(200).json(comment[0]);
        }
      });
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