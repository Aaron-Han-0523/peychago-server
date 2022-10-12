const express = require('express');
const router = express.Router();

const disposalRequestController = require('../controllers/disposalRequest');
const disposalRequestService = require('../services/request');
const supplierUsersService = require('../services/supplierUsers');
const processService = require('../services/process');
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

/* GET disposalRequest listing. */
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('disposalRequest/add', {
    user: req.userInfo,
  }))
  .post('/add', jwt.verifyToken, disposalRequestController.add)

router
  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => {
    const data = await disposalRequestService.readOne(req.params.id);
    const process = await processService.readOne(req.params.id);
    const supplier = await supplierUsersService.readOne(data.supplierUsers_id);
    const supplierUsers = await supplierUsersService.allRead();
    return req.api ?
      res.json({
        user: req.userInfo,
        data: data,
        process: process,
        supplier: supplier,
        supplierUsers: supplierUsers
      })
      : res.render('disposalRequest/edit', {
        user: req.userInfo,
        data: data,
        process: process,
        supplier: supplier,
        supplierUsers: supplierUsers
      })
  })
  .post('/edit/:id', jwt.verifyToken, disposalRequestController.edit)

router
  .get('/delete/:id', jwt.verifyToken, disposalRequestController.delete)

router
  .get('/search', jwt.verifyToken, disposalRequestController.search)

router
  .post('/upload/:id', jwt.verifyToken,
    // (req, res, next) => { console.log('disposalRequest body\n', req.get('content-Type')); next(); },
    (req, res, next) => upload('폐차회수요청서').single('diposalRequest')(req, res, function (err) {
      if (err) {
        console.error(err); // multer 에러 확인
        return
      }
      next();
    }),
    // (req, res, next) => { console.log('disposalRequest upload file\n', req.file); next(); },
    disposalRequestController.upload)

router
  .get('/:id', jwt.verifyToken, async (req, res, next) => {
    const data = await disposalRequestService.readOne(req.params.id)
    res.render('disposalRequest/detail', {
      user: req.userInfo,
      data: data,
      process: await processService.readOne(req.params.id),
      supplier: data.supplierUsers_id ? await supplierUsersService.readOne(data.supplierUsers_id) : null,
    })
  })
  .get('/', jwt.verifyToken, disposalRequestController.index)

module.exports = router;
