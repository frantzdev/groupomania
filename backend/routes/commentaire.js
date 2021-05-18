//importation express
const express = require('express');
//création du router utilisateur            
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
//importation des controllers       
const commentaireController = require('../controllers/commentaire');

//création des routes pour l'inscription et la connection
router.get('/', auth, commentaireController.getAllCommentaire);
router.get('/:id', auth, commentaireController.getOneCommentaire);
router.post('/:id', auth, multer, commentaireController.createCommentaire);
router.put('/:id', auth, multer, commentaireController.modifyCommentaire);
router.delete('/:id',auth, commentaireController.deleteCommentaire);
router.put('/image/:id',auth, commentaireController.imageCommentaire);

//exportation du router
module.exports = router;