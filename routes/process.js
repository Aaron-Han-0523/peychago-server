const express = require('express');
const router = express.Router();

const processController = require('../controllers/process');
const jwt = require('../services/jwt')
const multer = require("multer");
const path = require("path");
const myUtils = require('../utils/myUtils');

// 날짜 형식 포맷터 YYYY-MM-DD_시간h분m초s
function formatDate(d_t) {
  let year = d_t.getFullYear();
  let month = ("0" + (d_t.getMonth() + 1)).slice(-2);
  let day = ("0" + d_t.getDate()).slice(-2);
  let hour = ("0" + d_t.getHours()).slice(-2);
  let minute = ("0" + d_t.getMinutes()).slice(-2);
  let seconds = ("0" + d_t.getSeconds()).slice(-2);
  return year + "-" + month + "-" + day + "_" + hour + "h" + minute + "m" + seconds + "s";
}

// 업로드 파일 저장 설정
const storage = (fileName) => multer.diskStorage({
  destination: function (req, file, callback) {
    const FILES_PATH = path.join(process.env.UPLOADFILES_ROOT, "clients");
    const FOLDER_PATH = path.join(process.cwd(), FILES_PATH);
    myUtils.mkdir(FOLDER_PATH);

    callback(null, FILES_PATH)
  }, filename: function (req, file, callback) {
    let extension = file.mimetype.split('/')[1];
    const newFilename = fileName + '-' + req.userInfo.userName + '_' + formatDate(new Date) + '.' + extension;
    console.log("save filename :", newFilename)
    callback(null, newFilename);
  },
});

// 미들웨어 등록
const upload = (fileName) => multer({
  storage: storage(fileName),
  // file size 제한(MB)
  limits: {
    fileSize: process.env.FILE_MAX_SIZE * 1024 * 1024,
  },
});

/* GET process listing. */
// 생성
router
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('process/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, processController.add);

// 수정
router
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('process/edit', { user: req.userInfo }))
  .post('/edit/:id', jwt.verifyToken, processController.edit)
  .put('/edit', jwt.verifyToken, processController.edit)
  .post('/deregistrationPath/:id', jwt.verifyToken,
    // (req, res, next) => { console.log('disposalRequest body\n', req.get('content-Type')); next(); },
    (req, res, next) => upload('말소증').single('deregistrationPath')(req, res, function (err) {
      if (err) {
        console.error(err); // multer 에러 확인
        return res.status(400).json(err.message)
      }
      next();
    }),
    // (req, res, next) => { console.log('disposalRequest upload file\n', req.file); next(); },
    processController.edit
  )


// 삭제
router
  .get('/delete/:id', jwt.verifyToken, processController.delete)
  .delete('/', jwt.verifyToken, processController.delete)

// 조회
router
  .get('/:id', jwt.verifyToken, processController.detail)
  .get('/', jwt.verifyToken, (req, res, next) => req.api ?
    processController.detail(req, res, next)
    : processController.index(req, res, next)
  )

module.exports = router;
