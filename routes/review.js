const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');
const jwt = require('../services/jwt')

/* GET review listing. */
router
  .get('/', jwt.verifyToken, reviewController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('review/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, reviewController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('review/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, reviewController.edit)
  .delete('/:id', jwt.verifyToken, reviewController.delete)
  .get('/:id', jwt.verifyToken, reviewController.detail)

module.exports = router;
