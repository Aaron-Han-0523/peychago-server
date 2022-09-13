const express = require('express');
const router = express.Router();

const imageSettingController = require('../controllers/imageSetting');
const jwt = require('../services/jwt')

/* GET imageSetting listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.render('imageSetting/index'))
  .post('/add', jwt.verifyToken, imageSettingController.add)

module.exports = router;
