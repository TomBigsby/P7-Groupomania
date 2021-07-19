const Comment = require('../models/Comment');
const mongoose = require('mongoose');


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


    // console.log(req.params.id);

    Comment.findOne({ commentId: req.params.id }, (error, comment) => console.log(comment))




    /* .then((comment) => {

        console.log("comment : " + comment)

    })
*/




    /*       Publication.findOne({ _id: req.body.postId })
          .then((publication) => {
      
            publication.postComments.findOne({ commentAuthorId: req.body.postId })
              .then((console.log("OK")))
            // console.log("comment : " + comment)
      
          }) */




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