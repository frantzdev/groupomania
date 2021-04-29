//importation express
const express = require('express');
//création du router utilisateur            
const router = express.Router();

const auth= require('../middleware/auth');
//importation des controllers       
const forumController = require('../controllers/forum');

//création des routes pour l'inscription et la connection
router.get('/', auth, forumController.getAllMessage);
router.get('/new', auth, forumController.getCreateMessage);
router.post('/new', auth, forumController.createMessage);
router.put('/update/:id',auth, forumController.updateMessage);
router.delete('/:id',auth, forumController.deleteMessage);

//exportation du router
module.exports = router;