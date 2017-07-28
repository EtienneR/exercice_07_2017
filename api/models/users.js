const pgp = require('pg-promise')({});
const db = pgp("postgres://postgres:root@localhost:5432/test");
const table = 'users';

function getAllUsers(req, res, next) {
  db.any('SELECT * FROM ' + table + ' ORDER BY id')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL users'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getUser(req, res, next) {
  var userId = parseInt(req.params.id);
  db.one('SELECT * FROM ' + table + ' WHERE id = $1', userId)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved user #'+ userId
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createUser(req, res, next) {
  console.log(req.body);
  if (req.body.name) {
    db.one('INSERT INTO users(name, pv_max, force, defense, chance) VALUES($1, $2, $3, $4, $5) RETURNING id', 
      [req.body.name, req.body.pv_max, req.body.force, req.body.defense, req.body.chance])
    .then(function (data) {
      res.status(201)
        .json({
          status: 'success',
          message: 'Inserted one user',
          lastId: data.id
        });
    })
    .catch(function (err) {
      return next(err);
    });
  } else {
    return res.status(400).json({
      status: 'error',
      message: 'No name specified',
    });
  }
}

function updateUser(req, res, next) {
  console.log(req.body);
  db.none('UPDATE ' + table + ' SET name=$1, pv_max=$2, force=$3, defense=$4, chance=$5 WHERE id=$6',
    [req.body.name, parseInt(req.body.pv_max), parseInt(req.body.force), parseInt(req.body.defense), parseInt(req.body.chance), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated user'
        });
    })
    .catch(function (err) {
      console.error(err);
      return next(err);
    });
}

function removeUser(req, res, next) {
  var userId = parseInt(req.params.id);
  db.result('DELETE FROM ' + table + ' WHERE id = $1', userId)
    .then(function (result) {
      res.status(200)
        .json({
          status: 'success',
          message: 'User #' + userId + ' deleted'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllUsers: getAllUsers,
  getUser: getUser,
  createUser: createUser,
  updateUser: updateUser,
  removeUser: removeUser
};