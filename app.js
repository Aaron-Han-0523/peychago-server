const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');

let sequelize = require('./models/index').sequelize;
sequelize.sync();

var app = express();

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

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.get('/notice', (req,res,next)=>res.render('pages/notice'))
app.get('/review', (req,res,next)=>res.render('pages/review'))
app.get('/export-request', (req,res,next)=>res.render('pages/export-request'))
app.get('/disposal-request', (req,res,next)=>res.render('pages/disposal-request'))
app.get('/supplier-request', (req,res,next)=>res.render('pages/supplier-request'))
app.get('/image-setting', (req,res,next)=>res.render('pages/image-setting'))
app.get('/car-information', (req,res,next)=>res.render('pages/car-information'))
app.get('/subsidiary-material', (req,res,next)=>res.render('pages/subsidiary-material'))
app.get('/supplier-user', (req,res,next)=>res.render('pages/supplier-user'))
app.get('/change-password', (req,res,next)=>res.render('pages/change-password'))

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
