const express = require('express');
const router = express.Router();

const publicationsCtrl = require('../controllers/publication');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// router.get('/', auth, publicationsCtrl.getAllSauces);
// router.post('/', auth, multer, publicationsCtrl.createSauce);
router.post('/publication', publicationsCtrl.createPublication);
// router.get('/:id', auth, publicationsCtrl.getOneSauce);
// router.put('/:id', auth, multer, publicationsCtrl.modifySauce);
// router.delete('/:id', auth, publicationsCtrl.deleteSauce);

// router.post('/:id/like', auth, publicationsCtrl.likeSauce);


module.exports = router;