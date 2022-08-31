var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');

/* GET users listing. */
router
  .get('/', (req, res, next) => res.render('users/index'))
  .get('/login', (req, res, next) => res.render('users/login'))
  .post('/login', usersController.login)
  .get('/add', (req, res, next) => res.render('users/add'))
  .post('/add', usersController.add)
  .get('/edit', (req, res, next) => res.render('users/edit'))
  .post('/edit', usersController.edit)
  .delete('/', usersController.delete)
  .get('/changePassword', (req, res, next) => res.render('users/changePassword') )
  .post('/changePassword', usersController.changePassword )


module.exports = router;
