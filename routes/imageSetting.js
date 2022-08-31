var express = require('express');
var router = express.Router();

var imageSettingController = require('../controllers/imageSetting');

/* GET imageSetting listing. */
router
  .get('/', (req, res, next) => res.render('imageSetting/index'))
  .get('/add', (req, res, next) => res.render('imageSetting/add'))
  .post('/add', imageSettingController.add)
  .get('/edit', (req, res, next) => res.render('imageSetting/edit'))
  .post('/edit', imageSettingController.edit)
  .delete('/', imageSettingController.delete)

module.exports = router;
