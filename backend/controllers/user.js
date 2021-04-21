const bcrypt = require('bcrypt');
const models = require('../models');


exports.signup = async (req, res, next) => {
    const hash = await bcrypt.hash(req.body.password, 10)
    // const hashEmail = await bcrypt.hash(req.body.email, 10)
    const user = await models.User.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: /*hashEmail*/req.body.email,  
    password: hash,
    isAdmin: false
    })
    user.save()
    .then( () => res.status(201).json({ message: "inscription" }))
    .catch(error => res.status(400).json({ error: error }));
};

exports.login = async (req, res, next) => {
    const userDb = await models.User.findOne({ where: { email: req.body.email } });
      if (!userDb) {  //si l'utilisateur n'est pas dans la base
        console.log('NON trouvé!'); 
        return res.status(401).json({ message: 'Utilisateur non trouvé !' });
      } //sinon l'utilisateur est dans la base
        console.log('trouvé !')
        const bcryptCompare = await bcrypt.compare(req.body.password, userDb.password);
          if (!bcryptCompare) { //si le hash n'est PAS identique
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          } else {  //sinon le hash est identique, je conserve else pour me repérer
            return res.status(200).json({ message: 'Utilisateur trouvé !' });
            }   
}; 
 
    



