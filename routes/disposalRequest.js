var express = require('express');
var router = express.Router();

var disposalRequestController = require('../controllers/disposalRequest');
const jwt = require('../services/jwt')

/* GET disposalRequest listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('disposalRequest/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('disposalRequest/add'))
  .post('/add', jwt.verifyToken, disposalRequestController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('disposalRequest/edit'))
  .post('/edit', jwt.verifyToken, disposalRequestController.edit)
  .delete('/', jwt.verifyToken, disposalRequestController.delete)

module.exports = router;
