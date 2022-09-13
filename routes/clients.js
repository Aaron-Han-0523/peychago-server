const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');
const jwt = require('../services/jwt')

/* GET clients listing. */
router
  .get('/', jwt.verifyToken, clientsController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('clients/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, clientsController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('clients/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, clientsController.edit)
  .delete('/:id', jwt.verifyToken, clientsController.delete)
  .get('/:id', jwt.verifyToken, clientsController.detail)

module.exports = router;
