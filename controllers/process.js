const processService = require('../services/process');

exports.add = async (req, res, next) => {
  const user = req.userInfo;
  let body = req.body;
  body.user = user.clientName;

  if (req.api) {
    body.createUser = user.clientName;
    body = Object.assign(user, body);
  }
  else body.user = user.userid;

  console.log(body);
  let files = req.files;
  console.log("files :", files);
  if (files) {
    for (let i = 0; i < 5; i++) {
      if (files[i]) body['carImagePath' + (i + 1)] = files[i].path;
    }
  }

  try {
    let result = await processService.create(body);
    // console.log("result :",result);
    return req.api ?
      res.status(201).end()
      : res.status(201).redirect('/process');
  }
  catch (e) {
    console.error(e);
    return res.json(`add fail`)
  }
}

exports.edit = async (req, res, next) => {
  console.log("post - process edit")
  const user = req.userInfo;
  const id = req.params.id;
  let body = req.body;
  console.log(user);
  if (req.api) {
    body.createUser = user.clientName;
    // body = Object.assign(user, body);
    body.id = user.carNum;
  }
  else {
    body.user = user.userid;
    body.id = id;
  }
  // console.log(req.userInfo);

  for (key in body) {
    if (body[key] === '') delete body[key];
  }

  const file = req.file;
  console.log("file :", file);
  if (file) {
    body[file.fieldname] = file.path;
  }

  let files = req.files;
  console.log("files :", files);
  if (files) {
    for (let i = 0; i < 5; i++) {
      if (files[i]) body['carImagePath' + i] = files[i].path;
    }
  }

  await processService
    .update(body)
    .then(() => {
      return req.api ?
        res.end()
        : res.send(`<script>history.go(-1);</script>`);
      //redirect(`/process/${id}`);
    })
    .catch(err => {
      console.error(err);
      res.status(400).json(`fail id:${id}`)
    });
}

exports.index = async (req, res, next) => {
  let data = await processService
    .allRead()
    .catch(err => console.error(err));

  // console.log("data :", data);

  return res.render('process/index', {
    count: data.count,
    data: data.rows,
    user: req.userInfo
  });
}

exports.detail = async (req, res, next) => {
  const user = req.userInfo;
  const id = user && user.carNum ? user.carNum : req.params.id;
  console.log(`open one data user-${user} / id-${id}`)

  let data = await processService
    .readOne(id)
    .catch(err => console.error(err));

  // console.log(data);

  if (data) return res.json(data)
  else res.json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
  const user = req.userInfo;
  const id = user.carNum ? user.carNum : req.params.id;
  let obj = {};
  obj.id = id;
  obj.user = user.userid || user.clientName;

  let result = await processService
    .delete(obj)
    .catch(err => console.error(err));

  // console.log("delete result :", result)

  if (result) return req.api ? res.end() : res.redirect('/process');
  else res.json(`fail id:${id}`)
}

exports.check = async (req, res, next) => {
  const id = req.params.id;
  await processService.readOne(id).then(data => {
    if (data) {
      return res.status(400).send();
    } else {
      return res.send();
    }
  })
}