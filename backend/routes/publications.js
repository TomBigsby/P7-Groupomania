const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationsCtrl = require('../controllers/publications');

router.get('/publications', auth, publicationsCtrl.getAllPublications);
router.post('/publications', auth, multer, publicationsCtrl.createPublication);
router.put('/publications/:id', auth, multer, publicationsCtrl.modifyPublication);
router.delete('/publications/:id', auth, publicationsCtrl.deletePublication);

// router.post('/publications/:id/like', auth, publicationsCtrl.likePublication);

module.exports = router;