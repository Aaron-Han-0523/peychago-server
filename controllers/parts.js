const partsService = require('../Services/parts');

exports.add = async (req, res, next) => {
  const user = req.userInfo;
  let body = req.body;
  body.user = user.userid;
  
  try {
      let result = await partsService.create(body);
      // console.log("result :",result);
      return res.status(201).redirect('/parts');
  }
  catch (e) {
      console.error(e);
      return res.json(`add fail`)
  }
}

exports.edit = async (req, res, next) => {
  // console.log("put - parts edit")
  const user = req.userInfo;
  const id = req.params.id;
  let body = req.body;
  body.user = user.userid;
  body.id = id;

  let result = await partsService
      .update(body)
      .catch(err => console.error(err));

  // console.log('result :', result)

  if (result) res.redirect(`/parts/${id}`);
  else res.json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
  let datas = await partsService
      .allRead()
      .catch(err => console.error(err));

  // console.log("datas :", datas);

  return res.render('parts/index', {
      count: datas.count,
      datas: datas.rows,
      user: req.userInfo
  });
}

exports.detail = async (req, res, next) => {
  const id = req.params.id;
  console.log(`open one data id-${id}`)

  const user = req.userInfo;
  let data = await partsService
      .readOne(id)
      .catch(err => console.error(err));

  // console.log(data);

  if (data) return res.json({
      render: `(parts/${id})`,
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

  let result = await partsService
      .delete(obj)
      .catch(err => console.error(err));

  // console.log("delete result :", result)

  if (result) return res.redirect('/parts');
  else res.json(`fail id:${id}`)
}