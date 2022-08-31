var express = require('express');
var router = express.Router();

var processController = require('../controllers/process');
const jwt = require('../services/jwt')

/* GET process listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('process/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('process/add'))
  .post('/add', jwt.verifyToken, processController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('process/edit'))
  .post('/edit', jwt.verifyToken, processController.edit)
  .delete('/', jwt.verifyToken, processController.delete)

module.exports = router;
