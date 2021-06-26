const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const publicationsCtrl = require('../controllers/publications');

// router.get('/', auth, publicationsCtrl.getAllPublications);
router.get('/publications', publicationsCtrl.getAllPublications);
// router.post('/', auth, multer, publicationsCtrl.createPublication);
router.post('/publication', multer, publicationsCtrl.createPublication);
// router.get('/:id', auth, publicationsCtrl.getOnePublication);
// router.put('/:id', auth, multer, publicationsCtrl.modifyPublication);
// router.delete('/:id', auth, publicationsCtrl.deletePublication);

// router.post('/:id/like', auth, publicationsCtrl.likePublication);


module.exports = router;