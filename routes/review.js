const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');
const reviewService = require('../services/review');
const carInfoService = require('../services/carInfo');
const supplierUsersService = require('../services/supplierUsers');

const jwt = require('../services/jwt')
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "uploads/review/")
  }, filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    let encoding = ""
    for (let i = 0; i < basename.length; i++) {
      encoding += basename.codePointAt(i);
    }
    callback(null, encoding + "-" + Date.now() + extension);
  },
});

// 1. 미들웨어 등록
let upload = multer({
  storage: storage, // file size 5MB로 제한
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/* GET review listing. */
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('review/add', {
    user: req.userInfo,
    car: await carInfoService.allRead(),
    supplier: await supplierUsersService.allRead(),
  }))
  .post('/add', jwt.verifyToken, upload.array('files'), reviewController.add)

  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => req.api ?
    res.json({
      user: req.userInfo,
      data: await reviewService.readOne(req.params.id),
    })
    : res.render('review/edit', {
      user: req.userInfo,
      data: await reviewService.readOne(req.params.id),
      car: await carInfoService.allRead(),
      supplier: await supplierUsersService.allRead(),
    }))
  .post('/edit/:id', jwt.verifyToken, upload.array('files'), reviewController.edit)
  .put('/edit/:id', jwt.verifyToken, upload.array('files'), reviewController.edit)

  .get('/delete/:id', jwt.verifyToken, reviewController.delete)
  .delete('/:id', jwt.verifyToken, reviewController.delete)

  .get('/:id', /* jwt.verifyToken, */ reviewController.detail)

  .get('/', /* jwt.verifyToken, */ reviewController.index)

module.exports = router;
