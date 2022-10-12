const requestService = require('../services/request');
const processService = require('../services/process');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.add = async (req, res, next) => {
  const user = req.userInfo;
  let body = req.body;
  body.user = user.userid || user.clientName;

  try {
    let result = await requestService.create(body);
    // console.log("result :",result);
    return res.status(201).redirect('/request');
  }
  catch (e) {
    console.error(e);
    return res.status(400).json(`add fail`)
  }
}

exports.edit = async (req, res, next) => {
  // console.log("put - request edit")
  const user = req.userInfo;
  const id = req.params.id;
  let body = req.body;
  body.user = user.userid;
  body.id = id;
  console.log(body)

  for ([key, value] of Object.entries(body)) {
    if (value == '') delete body[key];
  }

  let result = await requestService
    .update(body)
    .catch(err => console.error(err));

  // console.log('result :', result)

  if (result) res.send(`<script>history.go(-1);</script>`);
  else res.status(400).json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {

  let query = `
    select supplier.companyName, req.*, process.* from request req
    left join process
      on req.carNum=process.carNum
    left join supplierusers supplier
      on req.supplierUsers_id=supplier.supplierUsers_id
    where (req.deleteDate is null) and (process.processType=1)
    order by req.createDate;
  `
  const data = await models.sequelize.query(query)
    .then(function (results, metadata) {
      // 쿼리 실행 성공
      return results[0];
    })
    .catch(function (err) {
      // 쿼리 실행 에러 
      console.error(err);
    });

  // console.log("data :", data);

  return res.render('request/index', {
    count: data.length,
    data: data,
    user: req.userInfo
  });
}

exports.detail = async (req, res, next) => {
  const id = req.params.id;
  console.log(`open one data id-${id}`)

  const user = req.userInfo;
  let data = await requestService
    .readOne(id)
    .catch(err => console.error(err));

  console.log("data :", data);

  if (data) return res.render(`request/detail`, {
    user: user,
    data: data
  });
  else res.status(404).json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const user = req.userInfo;
  let obj = {};
  obj.id = id;
  obj.user = user.userid;

  let result = await requestService
    .delete(obj)
    .catch(err => console.error(err));

  // console.log("delete result :", result)

  if (result) return res.redirect('/request');
  else res.status(400).json(`fail id:${id}`)
}

exports.search = async (req, res, next) => {
  const user = req.userInfo;
  let word = req.query.q.replace(';', '').trim();
  console.log("search", word, "start")

  // let condition = {};

  let query = `
    select supplier.companyName, req.*, process.* from request req
    left join process
      on req.carNum=process.carNum
    left join supplierusers supplier
      on req.supplierUsers_id=supplier.supplierUsers_id
    where (req.deleteDate is null) and (process.processType=1)
      and (process.carNum like('%${word}%') or process.ownerName like('%${word}%'))
    order by req.createDate;
    `
  const result = await models.sequelize.query(query)
    .then(function (results, metadata) {
      // 쿼리 실행 성공
      return results[0];
    })
    .catch(function (err) {
      // 쿼리 실행 에러 
      console.error(err);
    });

  console.log("search result :", result)

  if (result) return res.status(200).json({ user: user, data: { rows: result, count: result.length } });
  else res.status(400).json(`don't find ${word}`)
}

exports.upload = async (req, res, next) => {
  const file = req.file;
  // console.log('request file :', file);
  if (!file) return res.status(400).json("Not found file");

  let body = {};
  body.id = req.params.id;

  const fieldName = 'requestPath';

  body[fieldName] = file.path;

  await processService
    .update(body)
    .then(result => {
      // console.log(result)
      console.log(fieldName + ' upload complete');
    })
    .catch(err => {
      console.error(err);
      console.log(fieldName + " upload fail");
      return res.status(400).json(err);
    })
  return res.json(fieldName + ' upload success')
}
