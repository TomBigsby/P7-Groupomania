const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentsCtrl = require('../controllers/comments');


router.post('/publications/:id/comments', auth, multer, commentsCtrl.createComment);
router.get('/publications/:id/comments', auth, commentsCtrl.getAllComments);
router.put('/publications/comments/:id', auth, multer, commentsCtrl.modifyComment);
router.delete('/publications/comments/:id', auth, commentsCtrl.deleteComment)

router.delete('/publications/:id/comments', auth, commentsCtrl.deleteCommentsFromPublication);

module.exports = router;