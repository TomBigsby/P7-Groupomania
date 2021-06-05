const jwt = require('jsonwebtoken');

// NOTE: permet de protéger les routes sélectionnées et vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes.
module.exports = (req, res, next) => {
  try {
    // NOTE: extraction du token du header Authorization de la requête entrante
    // la fonction split pour récupérer tout après l'espace dans le header
    const token = req.headers.authorization.split(' ')[1];
    // NOTE: la fonction verify pour décoder notre token. Si celui-ci n'est pas valide, une erreur sera générée
    const decodedToken = jwt.verify(token, process.env.TOKEN_PASS);
    // NOTE: extraction de l'ID utilisateur du token
    const userId = decodedToken.userId;
    // NOTE: si la demande contient un ID utilisateur, on compare à celui extrait du token.
    if (req.body.userId && req.body.userId !== userId) {
      // NOTE: S'ils sont différents, on génère une erreur
      throw 'Invalid user ID';
    } else {
      // NOTE: Si les 2 correspondent, on passe à la suite
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
