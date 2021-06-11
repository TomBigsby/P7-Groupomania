const express = require('express');
const router = express.Router();

const publicationsCtrl = require('../controllers/publications');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// router.get('/', auth, publicationsCtrl.getAllPublications);
// router.post('/', auth, multer, publicationsCtrl.createPublication);
router.post('/publication', publicationsCtrl.createPublication);
// router.get('/:id', auth, publicationsCtrl.getOnePublication);
// router.put('/:id', auth, multer, publicationsCtrl.modifyPublication);
// router.delete('/:id', auth, publicationsCtrl.deletePublication);

// router.post('/:id/like', auth, publicationsCtrl.likePublication);


module.exports = router;