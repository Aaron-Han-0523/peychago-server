var express = require('express');
var router = express.Router();

var supplierRequestController = require('../controllers/supplierRequest');

/* GET supplierRequest listing. */
router
  .get('/', (req, res, next) => res.render('supplierRequest/index'))
  .get('/add', (req, res, next) => res.render('supplierRequest/add'))
  .post('/add', supplierRequestController.add)
  .get('/edit', (req, res, next) => res.render('supplierRequest/edit'))
  .post('/edit', supplierRequestController.edit)
  .delete('/', supplierRequestController.delete)

module.exports = router;
