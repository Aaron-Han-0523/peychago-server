const express = require('express');
const router = express.Router();

const noticeController = require('../controllers/notice');
const jwt = require('../services/jwt')

/* GET notice listing. */
router
  .get('/', jwt.verifyToken, noticeController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('notice/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, noticeController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('notice/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, noticeController.edit)
  .delete('/:id', jwt.verifyToken, noticeController.delete)
  .get('/:id', jwt.verifyToken, noticeController.detail)

module.exports = router;
