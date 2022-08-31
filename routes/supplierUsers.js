var express = require('express');
var router = express.Router();

var supplierUsersController = require('../controllers/supplierUsers');
const jwt = require('../services/jwt')

/* GET supplierUser listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('supplierUsers/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('supplierUsers/add'))
  .post('/add', jwt.verifyToken, supplierUsersController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('supplierUsers/edit'))
  .post('/edit', jwt.verifyToken, supplierUsersController.edit)
  .delete('/', jwt.verifyToken, supplierUsersController.delete)

module.exports = router;
