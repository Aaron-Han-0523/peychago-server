var express = require('express');
var router = express.Router();

var exportRequestController = require('../controllers/exportRequest');

/* GET exportRequest listing. */
router
  .get('/', (req, res, next) => res.render('exportRequest/index'))
  .get('/add', (req, res, next) => res.render('exportRequest/add'))
  .post('/add', exportRequestController.add)
  .get('/edit', (req, res, next) => res.render('exportRequest/edit'))
  .post('/edit', exportRequestController.edit)
  .delete('/', exportRequestController.delete)

module.exports = router;
