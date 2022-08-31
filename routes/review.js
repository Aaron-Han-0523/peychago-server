var express = require('express');
var router = express.Router();

var reviewController = require('../controllers/review');
const jwt = require('../services/jwt')

/* GET review listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('review/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('review/add'))
  .post('/add', jwt.verifyToken, reviewController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('review/edit'))
  .post('/edit', jwt.verifyToken, reviewController.edit)
  .delete('/', jwt.verifyToken, reviewController.delete)

module.exports = router;
