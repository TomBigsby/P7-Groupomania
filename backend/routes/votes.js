const express = require('express');
const router = express.Router();

// const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const votesCtrl = require('../controllers/votes');


// router.post('/publications/:id/votes', auth, multer, votesCtrl.createVote);
router.post('/publications/:id/votes', votesCtrl.createVote);
// router.get('/publications/:id/votes', auth, votesCtrl.getAllVotes);
router.get('/publications/:id/votes', votesCtrl.getAllVotes);
// router.put('/publications/votes/:id', auth, multer, votesCtrl.modifyVote);
router.put('/publications/votes/:id', votesCtrl.modifyVote);

module.exports = router;