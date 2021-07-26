const express = require('express');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()


// const mysql = require('mysql');





const publicationsRoutes = require('./routes/publications');
const commentsRoutes = require('./routes/comments');
const userRoutes = require('./routes/user');


const app = express();

//--------------
/* mongoose.connect(process.env.DB_ID_PASS, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')); */
//--------------


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', publicationsRoutes);
app.use('/api', commentsRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;