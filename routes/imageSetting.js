const express = require('express');
const router = express.Router();

const imageSettingController = require('../controllers/imageSetting');
const imageSettingService = require('../Services/imageSetting');
const jwt = require('../services/jwt')
const multer = require("multer");
const path = require("path");

function formatDate(d_t) {
    let year = d_t.getFullYear(); let month = ("0"
        + (d_t.getMonth() + 1)).slice(-2); let day = ("0" +
            d_t.getDate()).slice(-2); let hour = ("0" + d_t.getHours()).slice(-2);
    let minute = ("0" + d_t.getMinutes()).slice(-2); let seconds = ("0" +
        d_t.getSeconds()).slice(-2); return year + "-" + month + "-" + day
            + "_" + hour + "h" + minute + "m" + seconds + "s"
}

const storage = (fileName) => multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "uploads/imageSetting/")
    }, filename: function (req, file, callback) {
        let extension = path.extname(file.originalname);
        callback(null, fileName + '-' + req.userInfo.userName + '_' + formatDate(new Date) + extension);
    },
});

// 1. 미들웨어 등록
const upload = (fileName) => multer({
    storage: storage(fileName), // file size 5MB로 제한
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

function formatDate(d_t) {
    let year = d_t.getFullYear(); let month = ("0"
        + (d_t.getMonth() + 1)).slice(-2); let day = ("0" +
            d_t.getDate()).slice(-2); let hour = ("0" + d_t.getHours()).slice(-2);
    let minute = ("0" + d_t.getMinutes()).slice(-2); let seconds = ("0" +
        d_t.getSeconds()).slice(-2); return year + "-" + month + "-" + day
            + "_" + hour + "h" + minute + "m" + seconds + "s"
}

/* GET imageSetting listing. */
router
    .get('/', jwt.verifyToken, async (req, res, next) => res.render('imageSetting/index', {
        user: req.userInfo,
        data: await imageSettingService.readOne()
    }))
    .post('/noticeImagePath', jwt.verifyToken, upload('noticeImage').single('noticeImagePath'), imageSettingController.edit)
    .post('/about1Title', jwt.verifyToken, imageSettingController.edit)
    .post('/about1URL', jwt.verifyToken, imageSettingController.edit)
    .post('/about2Title', jwt.verifyToken, imageSettingController.edit)
    .post('/about2ImagePath', jwt.verifyToken, upload('about2Image').single('about2ImagePath'), imageSettingController.edit)
    .post('/privacyImagePath', jwt.verifyToken, upload('privacyImage').single('privacyImagePath'), imageSettingController.edit)
    .post('/termOfServicePath', jwt.verifyToken, upload('termOfService').single('termOfServicePath'), imageSettingController.edit)
    .post('/exportNoticePath', jwt.verifyToken, upload('exportNotice').single('exportNoticePath'), imageSettingController.edit)
    .post('/exportPicturePath', jwt.verifyToken, upload('exportPicture').single('exportPicturePath'), imageSettingController.edit)

module.exports = router;
