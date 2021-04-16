const express = require('express');

const app = express();



app.use('/', (req, res, next) => {
    const stuff = [
      {
        title: 'titre',
        description: 'description',
        imageUrl: ' ',
        userId: 'user',
      }
    ];
    res.status(200).json(stuff);
  });

module.exports = app;