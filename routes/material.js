var express = require('express');
var router = express.Router();

var materialController = require('../controllers/material');

/* GET material listing. */
router
  .get('/', (req, res, next) => res.render('material/index'))
  .get('/add', (req, res, next) => res.render('material/add'))
  .post('/add', materialController.add)
  .get('/edit', (req, res, next) => res.render('material/edit'))
  .post('/edit', materialController.edit)
  .delete('/', materialController.delete)

module.exports = router;
