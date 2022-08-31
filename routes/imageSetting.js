var express = require('express');
var router = express.Router();

var imageSettingController = require('../controllers/imageSetting');
const jwt = require('../services/jwt')

/* GET imageSetting listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.json('imageSetting/index'))
  .get('/add', jwt.verifyToken, (req, res, next) => res.json('imageSetting/add'))
  .post('/add', jwt.verifyToken, imageSettingController.add)
  .get('/edit', jwt.verifyToken, (req, res, next) => res.json('imageSetting/edit'))
  .post('/edit', jwt.verifyToken, imageSettingController.edit)
  .delete('/', jwt.verifyToken, imageSettingController.delete)

module.exports = router;
