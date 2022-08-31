var express = require('express');
var router = express.Router();

var disposalRequestController = require('../controllers/disposalRequest');

/* GET disposalRequest listing. */
router
  .get('/', (req, res, next) => res.render('disposalRequest/index'))
  .get('/add', (req, res, next) => res.render('disposalRequest/add'))
  .post('/add', disposalRequestController.add)
  .get('/edit', (req, res, next) => res.render('disposalRequest/edit'))
  .post('/edit', disposalRequestController.edit)
  .delete('/', disposalRequestController.delete)

module.exports = router;
