const express = require('express');
const router = express.Router();

const supplierRequestController = require('../controllers/supplierRequest');
const jwt = require('../services/jwt')

/* GET supplierRequest listing. */
router
  .get('/', jwt.verifyToken, supplierRequestController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('supplierRequest/add'))
  .post('/add', jwt.verifyToken, supplierRequestController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('supplierRequest/edit'))
  .put('/edit/:id', jwt.verifyToken, supplierRequestController.edit)
  .delete('/:id', jwt.verifyToken, supplierRequestController.delete)

module.exports = router;
