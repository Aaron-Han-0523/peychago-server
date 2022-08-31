var express = require('express');
var router = express.Router();

var noticeController = require('../controllers/notice');

/* GET notice listing. */
router
  .get('/', (req, res, next) => {
    console.log('공지사항으로 이동');
    res.render('notice/index');
  })
  .get('/add', (req, res, next) => res.render('notice/add'))
  .post('/add', noticeController.add)
  .get('/edit', (req, res, next) => res.render('notice/edit'))
  .post('/edit', noticeController.edit)
  .delete('/', noticeController.delete)

module.exports = router;
