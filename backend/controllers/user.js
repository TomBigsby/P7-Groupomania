const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const sanitize = require('mongo-sanitize')

const User = require('../models/User');

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

            if (req.body.adminPassword !== "" && req.body.adminPassword === "admin") {
                admin = true
            } else {
                admin = false
            }

            var clean = sanitize(req.body.email);
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: CryptoJS.HmacSHA1(clean, process.env.CRYPT_EMAIL).toString(),
                        password: hash,
                        username: req.body.username,
                        avatarUrl: image,
                        isAdmin: admin
                    });
                    user.save()

                        // .then(() => { json({ avatarUrl: image }) })
                        .then(() => { next() })

                        // .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error_signup_email_exist: "Utilisateur déjà existant" }));
                })
                .catch(error => res.status(500).json({ error2 }));
        } else {
            res.status(400).json({ error_signup_email: "L'email ou le mot de passe ne sont pas valides" });
        }
    } else {
        res.status(400).json({ error_signup_email: "L'email ou le mot de passe ne sont pas renseignés" });
    }
}




// NOTE: login > compare l'email saisi avec celui enregistré dans la BDD. Pareil pour le MdP
exports.login = (req, res, next) => {
    var clean = sanitize(req.body.email);
    User.findOne({ email: CryptoJS.HmacSHA1(clean, process.env.CRYPT_EMAIL).toString() })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error_login_user: 'Utilisateur non trouvé !' });
            }

            bcrypt.compare(req.body.password, user.password)

                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error_login_password: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        username: user.username,
                        avatarUrl: user.avatarUrl,
                        isAdmin: user.isAdmin,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN_PASS,
                            { expiresIn: '24h' }


                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};



// récupération de l'url de l'avatar local
exports.getAvatar = (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then((user) => { res.status(200).json(user) })
        .catch((error) => { res.status(400).json({ error: error }); });
};


// suppression de l'utilisateur
exports.deleteUser = (req, res, next) => {
    User.deleteOne({ _id: req.params.id })
        .then(message => res.status(200).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};
