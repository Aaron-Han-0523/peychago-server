require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')

var indexRouter = require('./routes/index');
var carInfoRouter = require('./routes/carInfo');
var clientsRouter = require('./routes/clients');
var disposalRequestRouter = require('./routes/disposalRequest');
var exportRequestRouter = require('./routes/exportRequest');
var imageSettingRouter = require('./routes/imageSetting');
var materialRouter = require('./routes/material');
var noticeRouter = require('./routes/notice');
var processRouter = require('./routes/process');
var reviewRouter = require('./routes/review');
var supplierRequestRouter = require('./routes/supplierRequest');
var supplierUsersRouter = require('./routes/supplierUsers');
var usersRouter = require('./routes/users');

let sequelize = require('./models/index').sequelize;
sequelize.sync();

var app = express();

// 헤더 정보 숨기기
app.disable('x-powered-by');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// print the request log on console
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cors());
// app.use(cors({ exposedHeaders: 'jwt' }));

// set the secret key variable for jwt
app.set('secret_key', process.env.SECRET_KEY)

// set the cookie option : secure
app.set('cookie-secure', config.cookie_secure)

console.log(app)

// 추가사항
// clientsRouter
// processRouter
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notice', noticeRouter);
app.use('/review', reviewRouter);
app.use('/exportRequest', exportRequestRouter);
app.use('/disposalRequest', disposalRequestRouter);
app.use('/supplierRequest', supplierRequestRouter);
app.use('/imageSetting', imageSettingRouter);
app.use('/carInfo', carInfoRouter);
app.use('/material', materialRouter);
app.use('/supplierUsers', supplierUsersRouter);
app.use('/clients', clientsRouter);
app.use('/process', processRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.status==404) res.render('error/404page');
  else res.render('error/error');
});

module.exports = app;
