const express = require('express');
const router = express.Router();

const supplierUsersController = require('../controllers/supplierUsers');
const supplierUsersService = require('../services/supplierUsers');
const jwt = require('../services/jwt')

/* GET supplierUser listing. */
router
  .get('/login', (req, res, next) => res.render('supplierUsers/login'))
  .post('/login', supplierUsersController.login)
  .get('/resetPassword/:id', jwt.verifyToken, supplierUsersController.resetPassword)

  .get('/add', jwt.verifyToken, (req, res, next) => res.render('supplierUsers/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, supplierUsersController.add)
  .post('/checkID', jwt.verifyToken, supplierUsersController.checkID)
  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => res.render('supplierUsers/edit', {
    user: req.userInfo,
    data: await supplierUsersService.readOne(req.params.id)
  }))
  .post('/edit/:id', jwt.verifyToken, supplierUsersController.edit)
  .get('/delete/:id', jwt.verifyToken, supplierUsersController.delete)
  .get('/:id', jwt.verifyToken, supplierUsersController.detail)
  .get('/', jwt.verifyToken, supplierUsersController.index)

module.exports = router;
