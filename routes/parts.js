const express = require('express');
const router = express.Router();

const partsController = require('../controllers/parts');
const jwt = require('../services/jwt')

/* GET parts listing. */
router
  .get('/', jwt.verifyToken, partsController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('parts/add'))
  .post('/add', jwt.verifyToken, partsController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('parts/edit'))
  .put('/edit/:id', jwt.verifyToken, partsController.edit)
  .delete('/:id', jwt.verifyToken, partsController.delete)
  .get('/:id', jwt.verifyToken, partsController.detail)

module.exports = router;
