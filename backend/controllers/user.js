const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const sanitize = require('mongo-sanitize')

const User = require('../models/User');

// NOTE: Création des regex pour la Vérification du format de l'email et du mot de passe
// Le mot de passe nécessite une majuscule, une minuscule, de 7 à 15 caractères et au moins un caractère spécial suivants : ! @ # $ % ^ & *
let regexpPassword = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/); let emailFilter = new RegExp(/^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/);

exports.signup = (req, res, next) => {
    let form_valid = true;
    // NOTE: Vérification du format de l'email et du mot de passe
    form_valid = form_valid && req.body && req.body.email;
    form_valid = form_valid && req.body && req.body.password;

    console.log("current password is : " + form_valid);
    console.log("current mail is : ", req.body.email);

    if (form_valid) {
        form_valid = form_valid && (req.body.email.length > 0);
        form_valid = form_valid && (req.body.password.length > 8);

        form_valid = form_valid && (regexpPassword.test(req.body.password));
        form_valid = form_valid && (emailFilter.test(req.body.email));

        console.log("password valid ? : " + form_valid);
        console.log("current mail is : ", req.body.email);

        if (form_valid) {
            // fin code vérif

            var clean = sanitize(req.body.email);
            bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    const user = new User({
                        email: CryptoJS.HmacSHA1(clean, process.env.CRYPT_EMAIL).toString(),
                        password: hash
                    });
                    user.save()
                        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                        .catch(error => res.status(400).json({ error1 }));
                })
                .catch(error => res.status(500).json({ error2 }));
        } else {
            res.status(400).json({ message: "L'email n'est pas valide ou le mot de passe correspond pas aux critères demandés" });
        }
    } else {
        res.status(400).json({ message: "L'email ou le mot de passe ne sont pas renseignés" });
    }
}


// NOTE: login > compare l'email saisi avec celui enregistré dans la BDD. Pareil pour le MdP
exports.login = (req, res, next) => {
    var clean = sanitize(req.body.email);

    User.findOne({ email: CryptoJS.HmacSHA1(clean, process.env.CRYPT_EMAIL).toString() })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
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