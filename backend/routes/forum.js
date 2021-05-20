//importation express
const express = require('express');
//création du router utilisateur            
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//importation des controllers       
const forumController = require('../controllers/forum');

router.get('/', auth, forumController.getAllMessage);
router.get('/:id', auth, forumController.getOneMessage);
router.post('/', auth, multer, forumController.createMessage);
router.put('/:id',auth, multer, forumController.updateMessage);
router.delete('/:id',auth, forumController.deleteMessage);
router.put('/image/:id',auth, multer, forumController.imageMessage);

//exportation du router
module.exports = router;