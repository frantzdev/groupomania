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
        //iduser: message.userId //clé etrangère non récupérable ? 
      })
    }

    //renvoi du tableau dans la reponse
    // console.log(data)
    return res.status(200).json(data)
  }; 

  /*--------------verb GET by ID ---------*/

  exports.getOneCommentaire = async (req, res, next) => {
    // console.log(req.params.id)
    await models.Commentaire.findAll({
      attributes: ['id', 'text', 'image'],
      where: { id: req.params.id }
    })
      .then( (response) => {
        // console.log(response)
        return res.status(200).json({message: "ok"})
      })
      .catch(error => {
        return res.status(400).json({ error: "Erreur pour consulter le commentaire" })
      })
  };

/*----------------verb POST ---------------*/
exports.createCommentaire = async (req, res, next) => {
  const NewCommentaire = req.file ? 
  {
  MessageId: req.params.id,  /*attention MessageId , bien mettre la majuscule pour contourner  message: 'Commentaire.MessageId cannot be null'  */
  text: req.body.text,
  image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`     
  } : { MessageId: req.params.id, 
        text: req.body.text
      }
    const postCommentaire = await models.Commentaire.create(NewCommentaire)
      postCommentaire.save()
        .then( () => res.status(201).json({ message: "Le nouveau message est publié" }))
        .catch(error => res.status(400).json({ error: "Erreur il n'est pas possible de poster un message" }));    
};


/*----------------verb DELETE ---------------*/
exports.deleteCommentaire = async (req, res, next) => {  
  // console.log(req.params.id)
  await models.Commentaire.findOne({  //recherche du commentaire que l'on souhaite supprimer
    where: {id: req.params.id}
  })
  .then(commentaire => {   //puis dans ce commentaire 
    if(req.file) {   //si il y a un fichier
      const filename = commentaire.image.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => { //suppression de l'image par son nom 
      models.Commentaire.destroy({      //suppression du commentaire dans la base de donnée
      where: {id: req.params.id ? req.params.id : req.query.id}
      })
      .then(() => res.status(200).json({ message: 'Supprimer un commentaire avec une image'}))
      .catch(error => res.status(400).json({ error }));
      });
    }            
    else(!req.file)    //sinon il n'y a pas de fichier
      models.Commentaire.destroy({      //suppression du commentaire dans la base de donnée
      where: {id: req.params.id ? req.params.id : req.query.id}
      })
      .then(() => res.status(200).json({ message: 'Supprimer un commentaire sans image'}))
      .catch(error => res.status(400).json({ error }));    
  })
  .catch(error => res.status(500).json({ error }));
};  