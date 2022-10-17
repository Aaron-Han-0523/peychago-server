const express = require('express');
const router = express.Router();

const reviewController = require('../controllers/review');
const reviewService = require('../services/review');
const carInfoService = require('../services/carInfo');
const supplierUsersService = require('../services/supplierUsers');

const jwt = require('../services/jwt')
const multer = require("multer");
const path = require("path");
const myUtils = require('../utils/myUtils');

let storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const FILES_PATH = path.join(process.env.UPLOADFILES_ROOT, "review");
    const FOLDER_PATH = path.join(process.cwd(), FILES_PATH);
    myUtils.mkdir(FOLDER_PATH);

    callback(null, FILES_PATH)
  }, filename: function (req, file, callback) {
    let extension = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extension);
    let encoding = ""
    for (let i = 0; i < basename.length; i++) {
      encoding += basename.codePointAt(i);
    }
    encoding = encoding.slice(0, 200);
    callback(null, encoding + "-" + Date.now() + extension);
  },
});

// 1. 미들웨어 등록
let upload = multer({
  storage: storage,
  // file size 제한(MB)
  limits: {
    fileSize: process.env.FILE_MAX_SIZE * 1024 * 1024,
  },
});

/* GET review listing. */
// 생성
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('review/add', {
    user: req.userInfo,
    car: await carInfoService.allRead(),
    supplier: await supplierUsersService.allRead(),
  }))
  .post('/add', jwt.verifyToken, (req, res, next) => upload.array('files')(req, res, function (err) {
    // console.log(req.headers)

    if (err instanceof multer.MulterError) {
      // console.error("multer error :", err); // multer 에러 확인
      return res.status(400).json(err.message);
    } else if (err) {
      console.error("unknown error :", err); // unknown 에러 확인
      return res.status(400).json(err.message);
    }
    next();
  }), reviewController.add);


// 수정
router
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
  .post('/edit/:id', jwt.verifyToken, (req, res, next) => upload.array('files')(req, res, function (err) {
    // console.log(req.headers)

    if (err instanceof multer.MulterError) {
      // console.error("multer error :", err); // multer 에러 확인
      return res.status(400).json(err.message);
    } else if (err) {
      console.error("unknown error :", err); // unknown 에러 확인
      return res.status(400).json(err.message);
    }
    next();
  }), reviewController.edit)
  .put('/edit/:id', jwt.verifyToken, (req, res, next) => upload.array('files')(req, res, function (err) {
    // console.log(req.headers)

    if (err instanceof multer.MulterError) {
      // console.error("multer error :", err); // multer 에러 확인
      return res.status(400).json(err.message);
    } else if (err) {
      console.error("unknown error :", err); // unknown 에러 확인
      return res.status(400).json(err.message);
    }
    next();
  }), reviewController.edit);


// 삭제
router
  .get('/delete/:id', jwt.verifyToken, reviewController.delete)
  .delete('/:id', jwt.verifyToken, reviewController.delete)

// 검색
router
  .get('/search', jwt.verifyToken, reviewController.search)

// 조회
router
  .get('/:id', (req, res, next) => req.api ? next() : jwt.verifyToken(req, res, next), reviewController.detail)

// 목록 조회
router
  .get('/', (req, res, next) => req.api ? next() : jwt.verifyToken(req, res, next), reviewController.index)

module.exports = router;
