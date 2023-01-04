const express = require("express");
const router = express.Router();

var carInfoRouter = require("../routes/carInfo");
var clientsRouter = require("../routes/clients");
var requestRouter = require("../routes/request");
var imageSettingRouter = require("../routes/imageSetting");
// var partsRouter = require('../routes/parts');
// var noticeRouter = require('../routes/notice');
var processRouter = require("../routes/process");
var reviewRouter = require("../routes/review");
// var supplierRequestRouter = require('../routes/supplierRequest');
var supplierUsersRouter = require("../routes/supplierUsers");
const { get } = require("../app");
// var usersRouter = require('../routes/users');
// var accountsRouter = require('../routes/accounts');
// var uploadsRouter = require('../routes/uploads');
const ts_api_controller = require("../controllers/ts_api");
const fetch = require('node-fetch');

/* GET  listing. */
router
  .use(
    "/clients",
    (req, res, next) => {
      req.api = true;
      next();
    },
    clientsRouter
  )
  .use(
    "/process",
    (req, res, next) => {
      req.api = true;
      next();
    },
    processRouter
  )
  .use(
    "/carInfo",
    (req, res, next) => {
      req.api = true;
      next();
    },
    carInfoRouter
  )
  .use(
    "/review",
    (req, res, next) => {
      req.api = true;
      next();
    },
    reviewRouter
  )
  .use(
    "/imageSetting",
    (req, res, next) => {
      req.api = true;
      next();
    },
    imageSettingRouter
  )
  .use(
    "/supplierUsers",
    (req, res, next) => {
      req.api = true;
      next();
    },
    supplierUsersRouter
  )
  .use(
    "/request",
    (req, res, next) => {
      req.api = true;
      next();
    },
    requestRouter
  )
  .get("/test", ts_api_controller.test)
  .use("/returnURLA", (req, res, next) => {
    console.log(req.method);
    console.log(req.body);
    next();
  })
  .use("/returnURLD", (req, res, next) => {
    console.log(req.method);
    console.log(req.body);
    next();
  })
  .use("/getMinGamInfo", (req, res, next) => {
    fetch("http://211.236.84.211/tsOpenAPI/minGamInfoService/getMinGamInfo?vhcleNo=" + encodeURI(req.query.vhcleNo) + "&svcCode=001C8D0F8FC2E57F1E4EE5C0279754FB&insttCode=001C8D0F8FB78E455492D1096D04F3CC")
      .then(response => response.text())
      .then(data => res.send(data))
  });

module.exports = router;
