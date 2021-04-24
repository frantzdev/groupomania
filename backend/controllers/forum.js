const models = require('../models');

/*----------------verb GET ---------------*/
exports.getAllMessage = async (req, res, next) => { 
  await models.Message.findAll()    
    .then((messages) => res.status(200).json(messages))
    .catch(error => res.status(400).json({ error: "Impossible de récupérer les messages" }));
  };
 
/*----------------verb POST ---------------*/
exports.createMessage = async (req, res, next) => {
  await models.User.findOne({ where: { id: req.params.id }
  })
  const message = await models.Message.create({
    title: req.body.title,
    content: req.body.content,
    attachment: req.body.attachment,
    UserId: "2"
  })
  message.save()
    .then( () => res.status(201).json({ message: "créer un post sur le forum" }))
    .catch(error => res.status(400).json({ error: error }));
  };

/*----------------verb PUT ---------------*/
  exports.modifyMessage = (req, res, next) => {
    res.json({ message: "Modifier un post sur le forum"});
  }; 

/*----------------verb DELETE ---------------*/
  exports.deleteMessage = (req, res, next) => {  
    res.json({ message: "Supprimer un post sur le forum"});
   };  