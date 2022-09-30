const express = require('express');
const router = express.Router();

const imageSettingController = require('../controllers/imageSetting');
const imageSettingService = require('../services/imageSetting');
const jwt = require('../services/jwt')
const multer = require("multer");
const path = require("path");
const myUtils = require('../utils/myUtils');

// 날짜 형식 포맷터 YYYY-MM-DD_시간h분m초s
function formatDate(d_t) {
    let year = d_t.getFullYear(); let month = ("0"
        + (d_t.getMonth() + 1)).slice(-2); let day = ("0" +
            d_t.getDate()).slice(-2); let hour = ("0" + d_t.getHours()).slice(-2);
    let minute = ("0" + d_t.getMinutes()).slice(-2); let seconds = ("0" +
        d_t.getSeconds()).slice(-2); return year + "-" + month + "-" + day
            + "_" + hour + "h" + minute + "m" + seconds + "s"
}

// 업로드 파일 저장 설정
const storage = (fileName) => multer.diskStorage({
    destination: function (req, file, callback) {
        const FILES_PATH = path.join('/', process.env.UPLOADFILES_ROOT, "appImage");
        const FOLDER_PATH = path.join(process.cwd(), FILES_PATH);
        myUtils.mkdir(FOLDER_PATH);

        callback(null, FILES_PATH)
    }, filename: function (req, file, callback) {
        let extension = path.extname(file.originalname);
        const newFilename = fileName + '-' + req.userInfo.userName + '_' + formatDate(new Date) + extension
        console.log("save filename :", newFilename)
        callback(null, newFilename);
    },
});

// 미들웨어 등록
const upload = (fileName) => multer({
    storage: storage(fileName), // file size 5MB로 제한
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});


/* GET imageSetting listing. */
router
    .get('/', jwt.verifyToken, async (req, res, next) =>
        req.api ?
            res.status(200).json(await imageSettingService.readOne())
            : res.render('imageSetting/index', {
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
