var express = require('express');
var router = express.Router();

var reviewController = require('../controllers/review');

/* GET review listing. */
router
  .get('/', (req, res, next) => res.render('review/index'))
  .get('/add', (req, res, next) => res.render('review/add'))
  .post('/add', reviewController.add)
  .get('/edit', (req, res, next) => res.render('review/edit'))
  .post('/edit', reviewController.edit)
  .delete('/', reviewController.delete)

module.exports = router;
