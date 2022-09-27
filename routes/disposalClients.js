const express = require('express');
const router = express.Router();

const disposalClientsController = require('../controllers/disposalClients');
const jwt = require('../services/jwt')

/* GET disposalClients listing. */
router
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('disposalClients/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, disposalClientsController.add)

  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('disposalClients/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, disposalClientsController.edit)

  .get('/delete/:id', jwt.verifyToken, disposalClientsController.delete)

  .get('/:id', jwt.verifyToken, disposalClientsController.detail)
  .get('/', jwt.verifyToken, disposalClientsController.index)

module.exports = router;
