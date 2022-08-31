var express = require('express');
var router = express.Router();

var supplierRequestController = require('../controllers/supplierRequest');
const jwt = require('../services/jwt')

/* GET supplierRequest listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('supplierRequest/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('supplierRequest/add'))
  .post('/add', jwt.verifyToken, supplierRequestController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('supplierRequest/edit'))
  .post('/edit', jwt.verifyToken, supplierRequestController.edit)
  .delete('/', jwt.verifyToken, supplierRequestController.delete)

module.exports = router;
