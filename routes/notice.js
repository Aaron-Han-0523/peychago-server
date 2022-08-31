var express = require('express');
var router = express.Router();

var noticeController = require('../controllers/notice');
const jwt = require('../services/jwt')

/* GET notice listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => {
    console.log('공지사항으로 이동');
    res.json('notice/index');
  })
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('notice/add'))
  .post('/add', jwt.verifyToken, noticeController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('notice/edit'))
  .post('/edit', jwt.verifyToken, noticeController.edit)
  .delete('/', jwt.verifyToken, noticeController.delete)

module.exports = router;
