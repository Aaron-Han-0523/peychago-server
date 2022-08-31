var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');
const jwt = require('../services/jwt')

/* GET users listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('users/index'))
  .get('/login', (req, res, next) => res.json('users/login'))
  .post('/login', usersController.login)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('users/add'))
  .post('/add', jwt.verifyToken, usersController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('users/edit'))
  .post('/edit', jwt.verifyToken, usersController.edit)
  .delete('/', jwt.verifyToken, usersController.delete)
  .get('/changePassword', jwt.verifyToken, (req, res, next) => res.json('users/changePassword') )
  .post('/changePassword', jwt.verifyToken, usersController.changePassword )


module.exports = router;
