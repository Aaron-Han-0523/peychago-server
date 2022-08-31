var express = require('express');
var router = express.Router();

var carInfoController = require('../controllers/carInfo');
const jwt = require('../services/jwt')

/* GET carinfo listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('carInfo/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('carInfo/add'))
  .post('/add', jwt.verifyToken, carInfoController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('carInfo/edit'))
  .post('/edit', jwt.verifyToken, carInfoController.edit)
  .delete('/', jwt.verifyToken, carInfoController.delete)

module.exports = router;
