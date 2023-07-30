const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const sanitizeHtml = require('sanitize-html');
const { addslashes } = require('../utils/function_addslashes.js');
const db = require('../utils/db_connexion_local');
// const db = require('../utils/db_connexion');




db.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
    } else {
      console.log('Connexion à la base de données réussie !');
    }
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

            if (req.body.adminChecked === "true") {
                if (sanitizeHtml(req.body.adminPassword) !== "" && sanitizeHtml(req.body.adminPassword) === "admin") {
                    admin = true
                } else {
                    admin = false
                    res.status(400).json({ error_psw_admin: "Mot de passe admin incorrect" });
                }
            } else {
                admin = false
            }


            // (Si la case Admin est cochée et que le mot de passe admin est correct) OU la case Admin n'est pas cochée = on continue
            if ((req.body.adminChecked === "true" && admin) || req.body.adminChecked === "false") {
                const cryptEmail = CryptoJS.HmacSHA1(sanitizeHtml(req.body.email), process.env.CRYPT_EMAIL).toString()

                bcrypt.hash(sanitizeHtml(req.body.password), 10)
                    .then(hash => {
                        //Recherche dans la BDD si l'email existe
                        db.query("SELECT email FROM Users WHERE email = '" + cryptEmail + "'", function (err, exist) {
                            if (err) throw err;

                            const username = sanitizeHtml(req.body.username)

                            // Si il n'existe pas > on le créé
                            if (exist.length === 0) {
                                db.query("INSERT INTO Users( email, password, username, avatarUrl, isAdmin) VALUES ('" + cryptEmail + "','" + hash + "','" + addslashes(username) + "','" + image + "'," + admin + ")", function (err, result) {
                                    if (err) throw err;

                                    if (!result) {
                                        res.status(401).json({ error: "Erreur d'enregistrement" });
                                    } else {
                                        next()
                                    }
                                })
                                // Si il existe > message d'erreur
                            } else {
                                res.status(400).json({ error_signup_email_exist: 'Utilisateur déjà existant !' });
                            }
                        })
                    })
                    .catch(error => res.status(500).json({ error2 }))
            }


        } else {
            res.status(400).json({ error_signup_email: "L'email ou le mot de passe ne sont pas valides" });
        }
    } else {
        res.status(400).json({ error_signup_email: "L'email ou le mot de passe ne sont pas renseignés" });
    }
}

exports.login = (req, res, next) => {

    const cryptEmail = CryptoJS.HmacSHA1(req.body.email, process.env.CRYPT_EMAIL).toString()

    db.query("SELECT * FROM Users WHERE email = '" + cryptEmail + "'", function (err, result) {
        if (err) throw err;

        if (result.length === 0) {
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
                    isAdmin: result[0].isAdmin,
                    token: jwt.sign(
                        { userId: result[0].userId },
                        process.env.TOKEN_PASS,
                        { expiresIn: '24h' }
                    )
                });
            })
            .catch(error => res.status(500).json({ error: "erreur" }));
    })
}

// suppression de l'utilisateur
exports.deleteUser = (req, res, next) => {
    db.query("DELETE FROM Users WHERE userId = '" + req.params.id + "'", function (err, result) {
        if (err) throw err;

        if (!result) {
            console.log("Erreur lors de la suppression");
            error => res.status(400).json({ error })
        } else {
            console.log("Utilisateur supprimé");
            res.status(200).json(result)
        }
    })
};

