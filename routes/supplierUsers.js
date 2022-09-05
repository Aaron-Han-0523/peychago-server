const express = require('express');
const router = express.Router();

const supplierUsersController = require('../controllers/supplierUsers');
const jwt = require('../services/jwt')

/* GET supplierUser listing. */
router
  .get('/', jwt.verifyToken, supplierUsersController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('supplierUsers/add'))
  .post('/add', jwt.verifyToken, supplierUsersController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('supplierUsers/edit'))
  .put('/edit/:id', jwt.verifyToken, supplierUsersController.edit)
  .delete('/:id', jwt.verifyToken, supplierUsersController.delete)
  .get('/:id', jwt.verifyToken, supplierUsersController.detail)

module.exports = router;
