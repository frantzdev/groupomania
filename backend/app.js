const express = require('express');
const bodyParser = require('body-parser');

//importation des routes utilisateur
const userRoutes = require('./routes/user');
//importation des routes community
const forumRoutes = require('./routes/forum');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());



//importation des routes utilisateurs
app.use('/api/auth', userRoutes);
//importation des routes community
app.use('/api/community', forumRoutes);

module.exports = app;