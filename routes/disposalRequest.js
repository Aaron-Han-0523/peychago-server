const express = require('express');
const router = express.Router();

const disposalRequestController = require('../controllers/disposalRequest');
const jwt = require('../services/jwt')

/* GET disposalRequest listing. */
router
  .get('/', jwt.verifyToken, disposalRequestController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('disposalRequest/add'))
  .post('/add', jwt.verifyToken, disposalRequestController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('disposalRequest/edit'))
  .put('/edit/:id', jwt.verifyToken, disposalRequestController.edit)
  .delete('/:id', jwt.verifyToken, disposalRequestController.delete)
  .get('/:id', jwt.verifyToken, disposalRequestController.detail)

module.exports = router;
