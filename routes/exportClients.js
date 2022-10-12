const express = require('express');
const router = express.Router();

const exportClientsController = require('../controllers/exportClients');
const supplierUsersService = require('../services/supplierUsers');
const clientsService = require('../services/clients');
const processService = require('../services/process');
const exportRequestService = require('../services/request');
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
    const newFilename = fileName + '-' + req.userInfo.userName || req.userInfo.clientName + '_' + formatDate(new Date) + '.' + extension;
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


/* GET exportClients listing. */
router
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('exportClients/add', {
    user: req.userInfo
  }))
  .post('/add', jwt.verifyToken, exportClientsController.add);

router
  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => {
    const process = processService.readOne(req.params.id);
    const request = exportRequestService.readOne(req.params.id);

    const data = await Promise.all([process, request])
      .then(async (data) => {
        const client = clientsService.readOne(data[0].clients_id);
        // const supplierUser = data[1].supplierUsers_id ? supplierUsersService.readOne(data[1].supplierUsers_id) : null;
        await Promise.all([
          client,
          // supplierUser
        ]).then(result => {
          data.push(...result);
        })
        return data;
      })
      .catch(err => {
        console.error(err);
      });

    // console.log("edit load data :", data);
    const res_data = {
      user: req.userInfo
      , process: data[0]
      , request: data[1]
      , clients: data[2]
      // , supplier: data[3]
    }
    return res.render('exportClients/edit', res_data);
  })
  .put('/edit/:id', jwt.verifyToken, exportClientsController.edit)

router
  .get('/search', jwt.verifyToken, exportClientsController.search);

router
  .get('/delete/:id', jwt.verifyToken, exportClientsController.delete);

router
  .get('/:id', jwt.verifyToken, exportClientsController.detail)
  .get('/', jwt.verifyToken, exportClientsController.index);

module.exports = router;
