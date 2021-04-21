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

exports.login = (req, res, next) => {
  models.User.findOne({ where: { email: req.body.email }})
  return res.json({message: "connexion"});    
};  
    



