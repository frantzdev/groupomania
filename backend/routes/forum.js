//importation express
const express = require('express');
//création du router utilisateur            
const router = express.Router();
//importation des controllers       
const forumController = require('../controllers/forum');

//création des routes pour l'inscription et la connection
router.get('/', forumController.getAll);
router.post('/', forumController.create);
router.put('/:id', forumController.modify);
router.delete('/:id', forumController.delete);

//exportation du router
module.exports = router;