const models = require('../models');

exports.getAllCommentaire = async (req, res, next) => {
    const displayCommentaires = await models.Commentaire.findAll()
    res.status(200).json(displayCommentaires);      
};

exports.createCommentaire = async (req, res, next) => {
    const postCommentaire = await models.Commentaire.create({
        idmessage: req.params.id,
        text: req.body.text,
        image: req.body.image,
        idUser: req.body.idUser
      })
      postCommentaire.save()
        .then( () => res.status(201).json({ message: "Le nouveau message est publié" }))
        .catch(error => res.status(400).json({ error: "Erreur il n'est pas possible de poster un message" }));    
};
