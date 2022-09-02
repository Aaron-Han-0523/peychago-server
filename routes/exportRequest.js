const express = require('express');
const router = express.Router();

const exportRequestController = require('../controllers/exportRequest');
const jwt = require('../services/jwt')

/* GET exportRequest listing. */
router
  .get('/', jwt.verifyToken, exportRequestController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('exportRequest/add'))
  .post('/add', jwt.verifyToken, exportRequestController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('exportRequest/edit'))
  .put('/edit/:id', jwt.verifyToken, exportRequestController.edit)
  .delete('/:id', jwt.verifyToken, exportRequestController.delete)

module.exports = router;
