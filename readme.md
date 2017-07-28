# Exercice

## Préparation de la base de données

Requêtes SQL disponible dans le fichier "users.sql".
Dans le fichier "api/models/users.js", changez le mot de passe pour la connexion Postgres à la ligne 2.

## Installation et configuration

- Dans le dossier "api", `npm install`. 
- Dans le dossier "front", `npm install` (cette installation peut prendre quelques minutes).

## Lancement des 2 serveurs

- Coté API (depuis le dossier "api") : `set DEBUG=myapp:* & npm start` sur Windows, `DEBUG=myapp:* npm start` sur Mac ou Linux (http://localhost:3000).
- Coté FRONT (depuis le dossier "front") : `npm run dev` (http://localhost:8080).

## Crédits

- API : [ExpressJS 4](http://expressjs.com), [PostgreSQL 9.6](https://www.postgresql.org).
- FRONT : [VueJS 2](https://vuejs.org) ([Vuex](https://vuex.vuejs.org), [vue-Router 2](https://router.vuejs.org), [vue-resource](https://github.com/pagekit/vue-resource)), [Bootstrap](http://getbootstrap.com).