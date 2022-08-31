var express = require('express');
var router = express.Router();

var clientsController = require('../controllers/clients');
const jwt = require('../services/jwt')

/* GET clients listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('clients/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('clients/add'))
  .post('/add', jwt.verifyToken, clientsController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('clients/edit'))
  .post('/edit', jwt.verifyToken, clientsController.edit)
  .delete('/', jwt.verifyToken, clientsController.delete)

module.exports = router;
