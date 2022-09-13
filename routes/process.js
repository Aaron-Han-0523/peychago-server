const express = require('express');
const router = express.Router();

const processController = require('../controllers/process');
const jwt = require('../services/jwt')

/* GET process listing. */
router
  .get('/', jwt.verifyToken, processController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('process/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, processController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('process/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, processController.edit)
  .delete('/:id', jwt.verifyToken, processController.delete)
  .get('/:id', jwt.verifyToken, processController.detail)

module.exports = router;
