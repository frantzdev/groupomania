//importation express
const express = require('express');
//création du router utilisateur            
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//importation des controllers       
const forumController = require('../controllers/forum');

//création des routes pour l'inscription et la connection
router.get('/', auth, forumController.getAllMessage);
router.get('/:id', auth, forumController.getOneMessage);
router.post('/', auth, multer, forumController.createMessage);
router.put('/update/:id',auth, multer, forumController.updateMessage);
router.delete('/:id',auth, forumController.deleteMessage);
router.put('/image/:id',auth, forumController.imageMessage);

//exportation du router
module.exports = router;