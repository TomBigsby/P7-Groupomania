const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentsCtrl = require('../controllers/comments');


router.post('/publications/:id/comments', multer, commentsCtrl.createComment);
router.get('/publications/:id/comments', commentsCtrl.getAllComments);
router.put('/publications/comments/:id', multer, commentsCtrl.modifyComment);
router.delete('/publications/comments/:id', commentsCtrl.deleteComment)

router.delete('/publications/:id/comments', commentsCtrl.deleteCommentsFromPublication);

module.exports = router;