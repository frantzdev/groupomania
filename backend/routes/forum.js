//importation express
const express = require('express');
//création du router utilisateur            
const router = express.Router();

const auth= require('../middleware/auth');
//importation des controllers       
const forumController = require('../controllers/forum');

//création des routes pour l'inscription et la connection
router.get('/',auth, forumController.getAll);
router.post('/',auth, forumController.create);
router.put('/:id',auth, forumController.modify);
router.delete('/:id',auth, forumController.delete);

//exportation du router
module.exports = router;