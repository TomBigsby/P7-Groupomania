const express = require('express');
const router = express.Router();


const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

// NOTE: ajout du `multer` nécessaire pour un formaData, même sans fichier image
router.post('/signup', multer, userCtrl.signup, userCtrl.login);
router.post('/login', userCtrl.login);

router.delete('/delete/:id',  userCtrl.deleteUser);

// router.get('/login/:id', userCtrl.getAvatar);

module.exports = router;