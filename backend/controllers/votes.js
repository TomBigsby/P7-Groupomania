const mysql = require('mysql');


// Connexion à la BDD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'p7_groupomania',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});


exports.createVote = (req, res, next) => {
    // Vérififcation dela présence d'unn fichier image

    const value1 = req.body.commentAuthorId
    const value2 = req.body.commentAuthorUserName

    db.query("INSERT INTO Comments( commentAuthorId, commentAuthorUserName, commentAuthorAvatarUrl, commentAuthorCommentDate, commentAuthorMessage, postId) VALUES ('" + value1 + "','" + value2 + "','" + value3 + "','" + value4 + "','" + value5 + "', '" + value6 + "')", function (err, result) {
        if (err) throw err;

        if (!result) {
            console.log("Erreur");
            res.status(400).json({ error: error });
        } else {
            console.log("votes récupérés");
            res.status(200).json(result)
        }
    });
}


exports.getAllVotes = (req, res, next) => {

    //   db.query("SELECT * FROM UsersLikes INNER JOIN Publications ON UsersLikes.postId = Publications.postId WHERE Publications.postId = '" + req.params.id + "'", function (err, result) {
    db.query("SELECT userId FROM UsersLikes WHERE userId =  '" + req.params.id + "'", function (err, result) {
        if (err) throw err;

        // console.log(result.length);

        res.status(200).json(result)
    })
};



exports.modifyVote = (req, res, next) => {

    console.log("req.params.id=", req.params.id);

    db.query("UPDATE Comments SET commentAuthorMessage = '" + addslashes(req.body.commentAuthorMessage) + "' WHERE commentId = '" + req.params.id + "'", function (err, result) {
        if (err) throw err;

        console.log(result);

        if (!result) {
            console.log("Erreur d'enregistrement");
            error => res.status(400).json({ error })
        } else {
            console.log("Commentaire modifié")
            res.status(200).json(result)
        }
    });

};

