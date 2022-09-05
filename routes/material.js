const express = require('express');
const router = express.Router();

const materialController = require('../controllers/material');
const jwt = require('../services/jwt')

/* GET material listing. */
router
  .get('/', jwt.verifyToken, materialController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('material/add'))
  .post('/add', jwt.verifyToken, materialController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('material/edit'))
  .put('/edit/:id', jwt.verifyToken, materialController.edit)
  .delete('/:id', jwt.verifyToken, materialController.delete)
  .get('/:id', jwt.verifyToken, materialController.detail)

module.exports = router;
