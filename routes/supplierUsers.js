var express = require('express');
var router = express.Router();

var supplierUsersController = require('../controllers/supplierUsers');

/* GET supplierUser listing. */
router
  .get('/', (req, res, next) => res.render('supplierUsers/index'))
  .get('/add', (req, res, next) => res.render('supplierUsers/add'))
  .post('/add', supplierUsersController.add)
  .get('/edit', (req, res, next) => res.render('supplierUsers/edit'))
  .post('/edit', supplierUsersController.edit)
  .delete('/', supplierUsersController.delete)

module.exports = router;
