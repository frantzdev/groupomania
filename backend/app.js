const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

//importation des routes utilisateur
const userRoutes = require('./routes/user');
//importation des routes forum
const forumRoutes = require('./routes/forum');
//importation des routes commentaire
const commentaireRoutes = require('./routes/commentaire');


const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));
//importation des routes utilisateurs
app.use('/api/auth', userRoutes);
//importation des routes forum
app.use('/api/message', forumRoutes);
//importation des routes commentaire
app.use('/api/commentaire', commentaireRoutes);


module.exports = app;