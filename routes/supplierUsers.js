const express = require('express');
const router = express.Router();

const supplierUsersController = require('../controllers/supplierUsers');
const jwt = require('../services/jwt')

/* GET supplierUser listing. */
router
  .get('/login', (req, res, next) => res.render('supplierUsers/login'))
  .post('/login', supplierUsersController.login)
  .put('/changePassword', jwt.verifyToken, supplierUsersController.changePassword)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('supplierUsers/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, supplierUsersController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('supplierUsers/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, supplierUsersController.edit)
  .delete('/:id', jwt.verifyToken, supplierUsersController.delete)
  .get('/:id', jwt.verifyToken, supplierUsersController.detail)
  .get('/', jwt.verifyToken, supplierUsersController.index)

module.exports = router;
