const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
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
      } else {//sinon l'utilisateur est dans la base
          console.log('trouvé !')
          const bcryptCompare = await bcrypt.compare(req.body.password, userDb.password);
            if (!bcryptCompare) { //si le hash n'est PAS identique
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            } else {  //sinon le hash est identique
                return res.status(200).json({ 
                  message: 'Utilisateur trouvé !',
                  userId: userDb.id,
                  isAdmin: userDb.isAdmin,
                  userFirstname: userDb.firstname,
                  //fonction sign pour encoder un nouveau token
                  token: jwt.sign({ userId: userDb.id },
                  'fqifhqoic,fpgququ,cqu_ycq_yds,_fyhc,4qff1q4ffijfqf2171',
                  { expiresIn: '24h'}) 
                });
              }
         }   
}; 
 
    



