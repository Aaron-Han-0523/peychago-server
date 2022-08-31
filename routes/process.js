var express = require('express');
var router = express.Router();

var processController = require('../controllers/process');

/* GET process listing. */
router
  .get('/', (req, res, next) => res.render('process/index'))
  .get('/add', (req, res, next) => res.render('process/add'))
  .post('/add', processController.add)
  .get('/edit', (req, res, next) => res.render('process/edit'))
  .post('/edit', processController.edit)
  .delete('/', processController.delete)

module.exports = router;
