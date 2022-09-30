require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');


var indexRouter = require('./routes/index');
var carInfoRouter = require('./routes/carInfo');
var clientsRouter = require('./routes/clients');
var disposalRequestRouter = require('./routes/disposalRequest');
var disposalClientsRouter = require('./routes/disposalClients');
var exportRequestRouter = require('./routes/exportRequest');
var imageSettingRouter = require('./routes/imageSetting');
var partsRouter = require('./routes/parts');
var noticeRouter = require('./routes/notice');
var processRouter = require('./routes/process');
var reviewRouter = require('./routes/review');
var supplierRequestRouter = require('./routes/supplierRequest');
var supplierUsersRouter = require('./routes/supplierUsers');
var usersRouter = require('./routes/users');
var accountsRouter = require('./routes/accounts');
var uploadsRouter = require('./routes/uploads');
var apiRouter = require('./routes/api');
const myUtils = require('./utils/myUtils');

let sequelize = require('./models/index').sequelize;
sequelize.sync();

var app = express();

// 헤더 정보 숨기기
app.disable('x-powered-by');

// -----------app settings-------------
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// set the cookie option : secure
app.set('jwt-option', {
  httpOnly: true,
  secure: process.env.cookie_secure,
  maxAge: process.env.JWT_MAXAGE * 1000 // ms단위
})
const UPLOADFILES_PATH = process.env.UPLOADFILES_ROOT
myUtils.mkdir(UPLOADFILES_PATH);

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



// console.log(app)

app.use('/users', usersRouter);
app.use('/notice', noticeRouter);
app.use((path.join('/', 'review').replace('\\', '/')), reviewRouter);
app.use('/exportRequest', exportRequestRouter);
app.use('/disposalRequest', disposalRequestRouter);
app.use('/disposalClients', disposalClientsRouter);
app.use('/supplierRequest', supplierRequestRouter);
app.use('/imageSetting', imageSettingRouter);
app.use('/carInfo', carInfoRouter);
app.use('/parts', partsRouter);
app.use('/supplierUsers', supplierUsersRouter);
app.use('/clients', clientsRouter);
app.use('/process', processRouter);
app.use('/accounts', accountsRouter);
app.use(path.join('/', process.env.UPLOADFILES_ROOT).replace('\\', '/'),
  //  (req, res, next) => { console.log('이미지 불러간다'); next(); },
  uploadsRouter
);
app.use('/api', apiRouter);
app.use('/', indexRouter);

// app.get('/uploads/review/:path', function (req, res) {
//   console.log("url :", req.url);
//   let extension = path.extname(req.params.path);

//   console.log("\t", '.' + req.url)
//   fs.readFile('.' + req.url, function (err, data) {
//     res.writeHead(200, { 'Content-Type': extension.slice(1) });
//     res.end(data);
//   })
// })


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
  if (err.status == 404) res.render('error/404page');
  else res.render('error/error');
});

module.exports = app;
