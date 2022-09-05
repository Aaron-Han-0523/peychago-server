const express = require('express');
const router = express.Router();

const processController = require('../controllers/process');
const jwt = require('../services/jwt')

/* GET process listing. */
router
  .get('/', jwt.verifyToken, processController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('process/add'))
  .post('/add', jwt.verifyToken, processController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.json('process/edit'))
  .put('/edit/:id', jwt.verifyToken, processController.edit)
  .delete('/:id', jwt.verifyToken, processController.delete)
  .get('/:id', jwt.verifyToken, processController.detail)

module.exports = router;
