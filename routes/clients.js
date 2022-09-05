const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');
const jwt = require('../services/jwt')

/* GET clients listing. */
router
  .get('/', jwt.verifyToken, clientsController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('clients/add'))
  .post('/add', jwt.verifyToken, clientsController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('clients/edit'))
  .put('/edit/:id', jwt.verifyToken, clientsController.edit)
  .delete('/:id', jwt.verifyToken, clientsController.delete)
  .get('/:id', jwt.verifyToken, clientsController.detail)

module.exports = router;
