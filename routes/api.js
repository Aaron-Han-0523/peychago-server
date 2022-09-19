const express = require('express');
const router = express.Router();

var carInfoRouter = require('../routes/carInfo');
var clientsRouter = require('../routes/clients');
// var disposalRequestRouter = require('../routes/disposalRequest');
// var exportRequestRouter = require('../routes/exportRequest');
var imageSettingRouter = require('../routes/imageSetting');
// var partsRouter = require('../routes/parts');
// var noticeRouter = require('../routes/notice');
var processRouter = require('../routes/process');
var reviewRouter = require('../routes/review');
// var supplierRequestRouter = require('../routes/supplierRequest');
var supplierUsersRouter = require('../routes/supplierUsers');
// var usersRouter = require('../routes/users');
// var accountsRouter = require('../routes/accounts');
// var uploadsRouter = require('../routes/uploads');

/* GET  listing. */
router
    .use('/clients', (req, res, next) => { req.api = true; next(); }, clientsRouter)
    .use('/process', (req, res, next) => { req.api = true; next(); }, processRouter)
    .use('/carInfo', (req, res, next) => { req.api = true; next(); }, carInfoRouter)
    .use('/review', (req, res, next) => { req.api = true; next(); }, reviewRouter)
    .use('/imageSetting', (req, res, next) => { req.api = true; next(); }, imageSettingRouter)
    .use('/supplierUsers', (req, res, next) => { req.api = true; next(); }, supplierUsersRouter)

module.exports = router;
