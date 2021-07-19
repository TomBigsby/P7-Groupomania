const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const commentsCtrl = require('../controllers/comments');


router.post('/publications/:id/comments', multer, commentsCtrl.createComment);
router.put('/publications/comments/:id', multer, commentsCtrl.modifyComment);


module.exports = router;