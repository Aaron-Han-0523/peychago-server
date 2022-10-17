const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clients');
const jwt = require('../services/jwt')

/* GET clients listing. */
router
  .post('/add', clientsController.add)
  .post('/login', clientsController.login)
  .put('/selectCompany', jwt.verifyToken, clientsController.selectCompany)
  .get('/info', jwt.verifyToken, clientsController.info)
  .put('/edit', jwt.verifyToken, clientsController.edit)

module.exports = router;
