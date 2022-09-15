const processService = require('../Services/process');

exports.add = async (req, res, next) => {
  const user = req.userInfo;
  let body = req.body;
  body.user = user.userid;
  
  try {
      let result = await processService.create(body);
      // console.log("result :",result);
      return res.status(201).redirect('/process');
  }
  catch (e) {
      console.error(e);
      return res.json(`add fail`)
  }
}

exports.edit = async (req, res, next) => {
  // console.log("put - process edit")
  const user = req.userInfo;
  const id = req.params.id;
  let body = req.body;
  body.user = user.userid;
  body.id = id;

  let result = await processService
      .update(body)
      .catch(err => console.error(err));

  // console.log('result :', result)

  if (result) res.redirect(`/process/${id}`);
  else res.json(`fail id:${id}`)
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
  const id = req.params.id;
  console.log(`open one data id-${id}`)

  const user = req.userInfo;
  let data = await processService
      .readOne(id)
      .catch(err => console.error(err));

  // console.log(data);

  if (data) return res.json({
      render: `(process/${id})`,
      data: data.dataValues
  });
  else res.json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
  const id = req.params.id;
  const user = req.userInfo;
  let obj = {};
  obj.id = id;
  obj.user = user.userid;

  let result = await processService
      .delete(obj)
      .catch(err => console.error(err));

  // console.log("delete result :", result)

  if (result) return res.redirect('/process');
  else res.json(`fail id:${id}`)
}