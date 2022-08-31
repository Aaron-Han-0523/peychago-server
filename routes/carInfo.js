var express = require('express');
var router = express.Router();

var carInfoController = require('../controllers/carInfo');

/* GET carinfo listing. */
router
  .get('/', (req, res, next) => res.render('carInfo/index'))
  .get('/add', (req, res, next) => res.render('carInfo/add'))
  .post('/add', carInfoController.add)
  .get('/edit', (req, res, next) => res.render('carInfo/edit'))
  .post('/edit', carInfoController.edit)
  .delete('/', carInfoController.delete)

module.exports = router;
