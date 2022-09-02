const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const jwt = require('../services/jwt')

/* GET users listing. */
router
  .get('/', jwt.verifyToken, usersController.index)
  .get('/login', (req, res, next) => res.json('users/login'))
  .post('/login', usersController.login)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('users/add'))
  .post('/add', jwt.verifyToken, usersController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('users/edit'))
  .put('/edit/:id', jwt.verifyToken, usersController.edit)
  .delete('/:id', jwt.verifyToken, usersController.delete)
  .get('/changePassword', jwt.verifyToken, (req, res, next) => res.json('users/changePassword') )
  .post('/changePassword', jwt.verifyToken, usersController.changePassword )


module.exports = router;
