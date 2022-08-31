var express = require('express');
var router = express.Router();

var clientsController = require('../controllers/clients');

/* GET clients listing. */
router
  .get('/', (req, res, next) => res.render('clients/index'))
  .get('/add', (req, res, next) => res.render('clients/add'))
  .post('/add', clientsController.add)
  .get('/edit', (req, res, next) => res.render('clients/edit'))
  .post('/edit', clientsController.edit)
  .delete('/', clientsController.delete)

module.exports = router;
