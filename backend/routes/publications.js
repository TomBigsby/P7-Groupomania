const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationsCtrl = require('../controllers/publications');

// router.get('/publications', auth, publicationsCtrl.getAllPublications);
router.get('/publications', publicationsCtrl.getAllPublications);
// router.post('/publications', auth, multer, publicationsCtrl.createPublication);
router.post('/publications', multer, publicationsCtrl.createPublication);
// router.put('/publications/:id', auth, multer, publicationsCtrl.modifyPublication);
router.put('/publications/:id', multer, publicationsCtrl.modifyPublication);
// router.delete('/publications/:id', auth, publicationsCtrl.deletePublication);
router.delete('/publications/:id', publicationsCtrl.deletePublication);

// router.post('/publications/:id/like', auth, publicationsCtrl.likePublication);
router.post('/publications/:id/like', publicationsCtrl.likePublication);

module.exports = router;