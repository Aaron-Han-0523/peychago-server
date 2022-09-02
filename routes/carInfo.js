const express = require('express');
const router = express.Router();

const carInfoController = require('../controllers/carInfo');
const jwt = require('../services/jwt')

/* GET carinfo listing. */
router
  .get('/', jwt.verifyToken, carInfoController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('carInfo/add'))
  .post('/add', jwt.verifyToken, carInfoController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('carInfo/edit'))
  .put('/edit/:id', jwt.verifyToken, carInfoController.edit)
  .delete('/:id', jwt.verifyToken, carInfoController.delete)

module.exports = router;
