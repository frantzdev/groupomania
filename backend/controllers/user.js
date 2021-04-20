const bcrypt = require('bcrypt');
const models = require('../models');


exports.signup = async (req, res, next) => {
    const user = await models.User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false
    })
    user.save()
    res.json({message: "inscription"});

    // models.User.findOne({
    //         attributes: ['email'],
    //         where: { email: req.body.email }
    //     }).then (userfind => {
    //         if(!userfind) {

    //         } else {
    //             return res.status(409).json({ 'error': 'user existe déjà' })
    //         }
    //     }).catch (erreur => {
    //         return res.status(500).json({ erreur : erreur})
    //     })
    
    
    
};

exports.login = (req, res, next) => {
    
    models.User.findOne({ where: {
        email: req.body.email,
        password: req.body.password
    }
    })
    return res.json({message: "connexion"});
    
    

};

