const express = require('express');
const router = express.Router();

const supplierRequestController = require('../controllers/supplierRequest');
const jwt = require('../services/jwt')

/* GET supplierRequest listing. */
router
  .get('/', jwt.verifyToken, supplierRequestController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('supplierRequest/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, supplierRequestController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('supplierRequest/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, supplierRequestController.edit)
  .delete('/:id', jwt.verifyToken, supplierRequestController.delete)
  .get('/:id', jwt.verifyToken, supplierRequestController.detail)

module.exports = router;
