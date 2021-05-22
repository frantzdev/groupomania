const models = require('../models');
const fs = require('fs');

/*----------------verb GET ---------------*/
exports.getAllCommentaire = async (req, res, next) => {
    let data = [];
    try {//récupération de tout les commentaires sur la base de donnée
      commentaires = await models.Commentaire.findAll()
    } catch (error) {
      return res.status(400).json({error: 'error request'})
    }  
    // console.log(commentaires);
    //boucle sur tout les commentaires
    for (let i = 0; i < commentaires.length; i++) {
      message = null;
      try { //recherche d'un ID dans la base de donnée message
        message = await models.Message.findOne({
          where: {//recherche de l'ID qui est comparé à commentaireId présent dans chaque messages
            id: commentaires[i].MessageId
          }
        })
      user = null;  
        user = await models.User.findOne({
          where: {//recherche de l'ID qui est comparé à commentaireId présent dans chaque users
            id: commentaires[i].UserId
          }     
        })   
      } catch (error) {
        return res.status(400).json({error: 'error request'})
      }
      data.push({
        text: commentaires[i].text,
        image: commentaires[i].image,
        idMessage: commentaires[i].MessageId,
        idCommentaire: commentaires[i].id,
        createdAtCommentaire : commentaires[i].createdAt,
        updatedAtCommentaire : commentaires[i].updatedAt,
        iduser: commentaires[i].UserId,
        firstname: user.firstname,
        lastname: user.lastname, 
      })
    }
    //renvoi du tableau dans la reponse
    return res.status(200).json(data)
  }; 

  /*--------------verb GET by ID ---------*/

  exports.getOneCommentaire = async (req, res, next) => {
    // console.log(req.params.id)
    let oneCommentaire = null;
    try {
      oneCommentaire = await models.Commentaire.findOne({
        where: { id: req.params.id }
      })
    }
    catch (error) {
      return res.status(400).json({error: 'error request'})
    }  
    //console.log(oneCommentaire)
    return res.status(200).json(oneCommentaire)
  };

/*----------------verb POST ---------------*/
exports.createCommentaire = async (req, res, next) => {
  const NewCommentaire = req.file ? 
  {
  MessageId: req.params.id,  /*attention MessageId , bien mettre la majuscule pour contourner  message: 'Commentaire.MessageId cannot be null'  */
  UserId: req.body.UserId,
  text: req.body.text,
  image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`     
  } : { MessageId: req.params.id,
        UserId: req.body.UserId, 
        text: req.body.text
      }
    const postCommentaire = await models.Commentaire.create(NewCommentaire);
      postCommentaire.save()
        .then( () => res.status(201).json({ message: "Le nouveau message est publié" }))
        .catch(error => res.status(400).json({ error: "Erreur il n'est pas possible de poster un message" }));    
};

/*----------------verb PUT ---------------*/
exports.modifyCommentaire = async (req, res, next) => {
  const updateValues = req.file ?
      {
      text: req.body.text,
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { text: req.body.text }
      const where = {id: req.params.id};
      if(req.params.user.isAdmin) {
      } else {
      where.userId = req.params.user.id,
      where.id = req.params.id
    }
    try {
      const commentaire = await models.Commentaire.update( updateValues, { where })
      console.log(commentaire[0]);
      if (commentaire[0]) 
        return res.status(201).json({ commentaire: "Le commentaire est modifié" })
      else 
        return res.status(400).json({commentaire: "Vous n'êtes pas autorisé à modifier ce commentaire"})
    } catch (error) {
        return res.status(400).json({ error: "Erreur il n'est pas possible de modifier" });
      }    
};
/*-------------------verb PUT IMAGE---------------*/
exports.imageCommentaire = async (req, res, next) => {
  const where = {id: req.params.id};
  if(req.params.user.isAdmin) {
  } else {
      where.userId = req.params.user.id,
      where.id = req.params.id
    }
  await models.Commentaire.findOne( //recherche du commentaire
    { where }
  )
  .then(commentaire => {              //puis dans ce commentaire 
      const filename = commentaire.image.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { //suppression de l'image par son nom 
        const updateImage = {
          text: req.body.text,
          image: null
        }
        console.log(updateImage)
          models.Commentaire.update( updateImage, { where })
      })
      .then(() => res.status(201).json({ message: 'Supprimer image du commentaire'}))
      .catch(error => res.status(400).json({ error: "request error"}));
    }) 
    .catch(error => res.status(500).json({ error: "Vous n'êtes pas autorisé à modifier l'image" }));
};


/*----------------verb DELETE ---------------*/
exports.deleteCommentaire = async (req, res, next) => {  
  const where = {id: req.params.id};
    if(req.params.user.isAdmin) {
    } else {
        where.userId = req.params.user.id,
        where.id = req.params.id
      }
  await models.Commentaire.findOne(  //recherche du commentaire que l'on souhaite supprimer
    { where }
  )
  .then(commentaire => {   //puis dans ce commentaire 
    if(commentaire.image) {   //si il y a un fichier
      const filename = commentaire.image.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { //suppression de l'image par son nom 
      models.Commentaire.destroy(     //suppression du commentaire dans la base de donnée
        { where }
      )
      .then(() => res.status(200).json({ message: 'Supprimer un commentaire avec une image'}))
      .catch(error => res.status(400).json({ error: "request error" }));
      });
    }            
    else    //sinon il n'y a pas de fichier
      models.Commentaire.destroy(      //suppression du commentaire dans la base de donnée
        { where }
      )
      .then(() => res.status(200).json({ message: 'Supprimer un commentaire sans image'}))
      .catch(error => res.status(400).json({ error: "request error" }));    
  })
  .catch(error => res.status(500).json({ error: "Vous n'êtes pas autorisé à supprimer ce commentaire" }));
};  