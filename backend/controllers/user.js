const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");


const User = require('../models/User');

const mysql = require('mysql');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: 'p7_groupomania',
    socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});


// NOTE: Création des regex pour la Vérification du format de l'email et du mot de passe
// Le mot de passe nécessite une majuscule, une minuscule, minimum 8 caractères et au moins un caractère spécial suivants : ! @ # $ % ^ & *
let regexpPassword = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/);
let emailFilter = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

exports.signup = (req, res, next) => {
    let form_valid = true;
    // Vérification de la présence de présence du body, de l'email et du mot de passe
    form_valid = form_valid && req.body && req.body.email;
    form_valid = form_valid && req.body && req.body.password;

    if (form_valid) {
        form_valid = form_valid && (req.body.email.length > 0);
        form_valid = form_valid && (req.body.password.length > 8);

        form_valid = form_valid && (regexpPassword.test(req.body.password));
        form_valid = form_valid && (emailFilter.test(req.body.email));

        if (form_valid) {
            // fin code vérif
            if (req.file !== undefined) {
                var image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            }

            let admin
            if (req.body.adminPassword !== "" && req.body.adminPassword === "admin") {
                admin = true
            } else {
                admin = false
            }

            cryptEmail = CryptoJS.HmacSHA1(req.body.email, process.env.CRYPT_EMAIL).toString()

            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    //Recherche dans la BDD si l'email existe
                    db.query("SELECT email FROM Users WHERE email = '" + cryptEmail + "'", function (err, exist) {
                        if (err) throw err;

                        // Si il n'existe pas > on le créé
                        if (exist.length === 0) {
                            db.query("INSERT INTO Users( email, password, username, userService, userJob, avatarUrl, isAdmin) VALUES ('" + cryptEmail + "','" + hash + "','" + req.body.username + "','" + req.body.userService + "','" + req.body.userJob + "','" + image + "'," + admin + ")", function (err, result) {
                                if (err) throw err;

                                if (!result) {
                                    console.log("Erreur d'enregistrement");
                                } else {
                                    next()
                                }
                            })
                            // Si il existe > message d'erreur
                        } else {
                            console.log("Utilisateur déjà existant");
                        }
                    })
                })
                .catch(error => res.status(500).json({ error2 }))
        } else {
            res.status(400).json({ error_signup_email: "L'email ou le mot de passe ne sont pas valides" });
        }
    } else {
        res.status(400).json({ error_signup_email: "L'email ou le mot de passe ne sont pas renseignés" });
    }
}

exports.login = (req, res, next) => {
    cryptEmail = CryptoJS.HmacSHA1(req.body.email, process.env.CRYPT_EMAIL).toString()

    db.query("SELECT * FROM Users WHERE email = '" + cryptEmail + "'", function (err, result) {
        if (err) throw err;

        if (!result) {
            return res.status(401).json({ error_login_user: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ error_login_password: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                    userId: result[0].userId,
                    username: result[0].username,
                    avatarUrl: result[0].avatarUrl,
                    userJob: result[0].userJob,
                    userService: result[0].userService,
                    isAdmin: result[0].isAdmin,
                    token: jwt.sign(
                        { userId: result[0].userId },
                        process.env.TOKEN_PASS,
                        { expiresIn: '24h' }
                    )

                });
            })
            .catch(error => res.status(500).json({ error: "pas bon" }));
    })
}

// suppression de l'utilisateur
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(message => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};
