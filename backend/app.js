require('dotenv').config()
//importation de express  
const express = require('express');
const bodyParser = require('body-parser');
//importation du package helmet
const helmet = require('helmet');
const path = require('path');

//importation des routes utilisateur
const userRoutes = require('./routes/user');
//importation des routes forum
const forumRoutes = require('./routes/forum');
//importation des routes commentaire
const commentaireRoutes = require('./routes/commentaire');


const app = express();


//ajout du middleware CORS pour ajouter des headers à nos objets reponse
//methode use pour appliquer le middleware à toute nos routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
//Utilisation de helmet pour la protection x-xss, active le filtre de script intersites(XSS) dans les navigateurs web
app.use(helmet());

//Cela indique à Express qu'il faut gérer la ressource images de manière statique
app.use('/images', express.static(path.join(__dirname, 'images')));
//importation des routes utilisateurs
app.use('/api/auth', userRoutes);
//importation des routes forum
app.use('/api/message', forumRoutes);
//importation des routes commentaire
app.use('/api/commentaire', commentaireRoutes);


module.exports = app;