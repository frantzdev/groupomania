***** INSTALLATION DU PROJET  *****
Projet réalisé avec node.js
aller à la racine dans le dossier backend et lancer 'npm install'

***** VARIABLE D'ENVIRONNEMENT *******

1.- Dans le backend, créer un fichier < .env >, ajouter à l'intérieur de ce fichier la variable JWT_TOKEN=
et entrer lui manuellement une nouvelle clé secrète

*** ACCES A LA BASE DE DONNEE ***

Dans le répertoire backend/config,  configurer le fichier config.json avec vos informations personnelles de développement
    "username": "",
    "password": "",
    "database": "",
    "host": ""
    "dialect": "mysql"

Connectez vous à votre serveur MYSQL ( j'utilise Laragon )
Une fois connecté à celui-ci:  

Ouvrez votre terminal de commande et exécuter    sequelize DB:create database "nom de la base de donnée"
Puis exécuter la commande     sequelize DB:migrate

*** DEMARRER LE SERVEUR BACKEND ***

Rendez-vous dans le dossier backend et lancer le serveur en tappant 'node server'
ou installer nodemon  'npm install -g nodemon'
puis lancer le serveur avec la commande 'nodemon'