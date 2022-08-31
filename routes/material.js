var express = require('express');
var router = express.Router();

var materialController = require('../controllers/material');
const jwt = require('../services/jwt')

/* GET material listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('material/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('material/add'))
  .post('/add', jwt.verifyToken, materialController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('material/edit'))
  .post('/edit', jwt.verifyToken, materialController.edit)
  .delete('/', jwt.verifyToken, materialController.delete)

module.exports = router;
