const express = require('express');
const router = express.Router();

const imageSettingController = require('../controllers/imageSetting');
const jwt = require('../services/jwt')
const multer = require("multer");
const path = require("path");

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/imageSetting/")
    }, filename: function (req, file, callback) {
        let extension = path.extname(file.originalname);
        let basename = path.basename(file.originalname, extension);
        callback(null, basename + "-" + Date.now() + extension);
    },
});

// 1. 미들웨어 등록
let upload = multer({
    storage: storage, // file size 5MB로 제한
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});



// router.post("/", upload.array('file'), imageSettingController.create);


/* GET imageSetting listing. */
router
  .get('/', jwt.verifyToken, (req, res, next) => res.render('imageSetting/index', { user: req.userInfo }))
  // .post('/add', jwt.verifyToken, imageSettingController.add)
  .post('/noticeImage', upload.single('exampleFormControlFile1'),(req,res,next)=>{console.log(req.file); next();} ,imageSettingController.edit);

module.exports = router;
