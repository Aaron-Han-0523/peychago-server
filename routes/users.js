var express = require('express');
var router = express.Router();

var usersController = require('../controllers/users');

/* GET users listing. */
router
  .get('/', function (req, res, next) {
    res.render('users/index');
  })
  .get('/login', (req, res, next) => {
    res.render('users/login');
  })
  .post('/login', usersController.login)

module.exports = router;
