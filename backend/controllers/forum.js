/*----------------verb GET ---------------*/
exports.getAll = (req, res, next) => { 
    res.json({ message: "afficher le forum"});
  };
 
/*----------------verb POST ---------------*/
exports.create = (req, res, next) => {
    res.json({ message: "créer un post sur le forum"});
  };

/*----------------verb PUT ---------------*/
  exports.modify = (req, res, next) => {
    res.json({ message: "Modifier un post sur le forum"});
  }; 

/*----------------verb DELETE ---------------*/
  exports.delete = (req, res, next) => {  
    res.json({ message: "Supprimer un post sur le forum"});
   };  