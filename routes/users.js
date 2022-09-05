const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const jwt = require('../services/jwt')

/* GET users listing. */
router
  .get('/login', (req, res, next) => res.json('users/login'))
  .post('/login', usersController.login)
  .get('/logout', usersController.logout)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('users/add'))
  .post('/add', jwt.verifyToken, usersController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('users/edit'))
  .put('/edit/:id', jwt.verifyToken, usersController.edit)
  .delete('/:id', jwt.verifyToken, usersController.delete)
  .get('/changePassword', jwt.verifyToken, (req, res, next) => res.json('users/changePassword'))
  .put('/changePassword', jwt.verifyToken, usersController.changePassword)
  .get('/:id', jwt.verifyToken, usersController.detail)
  .get('/', jwt.verifyToken, usersController.index)

module.exports = router;
