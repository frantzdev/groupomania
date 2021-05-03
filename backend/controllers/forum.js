const models = require('../models');

/*----------------verb GET ---------------*/
exports.getAllMessage = async (req, res, next) => { 
  let data = [];
  try {  //récupération de tout les messages sur la base de donnée
    messages = await models.Message.findAll();
  } catch (error) {
    return res.status(400).json({error: 'error request'})
  }  
  console.log(messages)
         //boucle sur tout les messages
  for (let i = 0; i < messages.length; i++) {
    let user = null;
    try {//recherche d'un ID dans la base de donnée User
      user = await models.User.findOne({
        where: {//recherche de l'ID qui est comparé à l'userId présent dans chaque messages
          id: messages[i].UserId
        }     
      })   
    } catch (error) {
      return res.status(400).json({error: 'error request'})
    }
    data.push({ //push de l'objet formaté dans le tableau data
      title: messages[i].title,
      content: messages[i].content,
      image: messages[i].image,
      firstname: user.firstname,
      lastname: user.lastname,
      isAdmin: user.isAdmin,
      idUser: user.id,
      messageUserId: messages[i].UserId,
      idMessage: messages[i].id,
      createdAt: messages[i].createdAt
    })
  }
  //renvoi du tableau dans la reponse
  console.log(data)
  return res.status(200).json(data)
};
/*----------------verb GET one ID ---------------*/
exports.getOneMessage = async (req, res, next) => {
  console.log(req.params.id)
  await models.Message.findAll({
    attributes: ['id', 'title', 'content', 'image'],
    where: { id: req.params.id }
  })
    .then( (response) => res.status(200).json(console.log(response)))
    .catch(error => res.status(400).json({ error: "Erreur pour consulter le post" }));
};

/*----------------verb POST ---------------*/
exports.createMessage = async (req, res, next) => {
  const postMessage = await models.Message.create({
    UserId: req.body.UserId,
    title: req.body.title,
    content: req.body.content,
    // image: req.body.image
    image:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  postMessage.save()
    .then( () => res.status(201).json({ message: "Le nouveau message est publié" }))
    .catch(error => res.status(400).json({ error: "Erreur il n'est pas possible de poster un message" }));
  };

/*----------------verb PUT ---------------*/
  exports.updateMessage = async (req, res, next) => {
    console.log(req.params.id);
    let updateValues = {title: req.body.title, content: req.body.content, image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`}
    await models.Message.update( updateValues, {where: { id: req.params.id}}  
    )
    .then( () => res.status(201).json({ message: "Le message est modifié" }))
    .catch(error => res.status(400).json({ error: "Erreur il n'est pas possible de modifier" }));
  };

/*----------------verb DELETE ---------------*/
  exports.deleteMessage = async (req, res, next) => {  
    await models.Message.destroy({
      where: {id: req.params.id}
   }); 
   res.status(204).json({ message: "Supprimer un post sur le forum"});
  }
   
  