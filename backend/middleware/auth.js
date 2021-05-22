//importation de jsonwebtokan
const jwt = require('jsonwebtoken');
const models = require('../models');


module.exports = async (req, res, next) => {
  try {
      const token = req.headers.authorization.split(' ')[1];  //recuperation dans le headers.authorization le bearer et le split pour faire un tableau
      const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); // recuperation du bearer et le comparer avec la clé secrete 
      // console.log(decodedToken)
      const userId = decodedToken.userId; //extraction du l'id utilisateur de notre token
    if (req.body.userId && req.body.userId !== userId) { //si le userid du corps de la requete et celui ci est different de userId de la base de donnée
      throw 'Invalid user ID';
    } else {
      try {
        req.params.user = await models.User.findOne({
          where: {id: userId}
        })
        if(!req.params.user)
          return res.status(400).json({error: "Invalid user"})
      } catch (error) {
          return res.status(500).json({error: "Problème base de donnée"})
      }      
      next();
    }
  } catch {
      res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};