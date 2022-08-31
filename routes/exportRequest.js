var express = require('express');
var router = express.Router();

var exportRequestController = require('../controllers/exportRequest');
const jwt = require('../services/jwt')

/* GET exportRequest listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('exportRequest/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('exportRequest/add'))
  .post('/add', jwt.verifyToken, exportRequestController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('exportRequest/edit'))
  .post('/edit', jwt.verifyToken, exportRequestController.edit)
  .delete('/', jwt.verifyToken, exportRequestController.delete)

module.exports = router;
