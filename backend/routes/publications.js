const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationsCtrl = require('../controllers/publications');

// router.get('/', auth, publicationsCtrl.getAllPublications);
router.get('/publications', publicationsCtrl.getAllPublications);
router.post('/publications', multer, publicationsCtrl.createPublication);
// router.get('/:id', auth, publicationsCtrl.getOnePublication);
router.put('/publications/:id', multer, publicationsCtrl.modifyPublication);
// router.delete('/:id', auth, publicationsCtrl.deletePublication);
router.delete('/publications/:id', publicationsCtrl.deletePublication);

router.post('/publications/:id/like', publicationsCtrl.likePublication);

// router.post('/publications/:id/comments', multer, publicationsCtrl.createComment);
// router.put('/publications/:id', multer, publicationsCtrl.modifyComment);


module.exports = router;