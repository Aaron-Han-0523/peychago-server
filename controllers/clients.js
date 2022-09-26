const clientsService = require('../services/clients');
const jwt = require('../services/jwt');
const encryption = require('../utils/encryption');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.login = async function (req, res, next) {
  const body = req.body;

  console.log(body)
  console.log("try", body.phoneNum, "login");

  const user = await clientsService.getUser(body.phoneNum)
  console.log(user)

  hashedPassword = await encryption.hashing(body.password);

  if (user) {
    if (user.password == hashedPassword) {
      let password = user.password;

      delete user.password;
      const token = await jwt.createToken(user)

      console.log(token)
      // res.header('Access-Control-Expose-Headers', 'jwt');
      // res.header('jwt', token);

      res.cookie('jwt', token, req.app.get('jwt-option'))
      // return res.status(201).json({
      //     result: 'ok',
      //     token
      // })
      if (req.api) return res.status(200).json(`welcome ${user.clientName}`);
      if (password == '123456') return res.redirect('/accounts/changePassword');
      return res.redirect('/');
    } else {
      console.log('비밀번호 불일치')
      return res.status(400).send(`<script> alert("아이디와 비밀번호를 확인해주세요."); location.href = document.referrer; </script>`)
    }
  } else {
    console.log('아이디 없음')
    return res.status(400).send(`<script> alert("아이디와 비밀번호를 확인해주세요."); location.href = document.referrer; </script>`)
  }
}

exports.add = async (req, res, next) => {
  let body = req.body;
  console.log("client add", body);

  try {
    let result = await clientsService.create(body);
    // console.log("result :",result);
    return req.api ?
      res.status(201).json("client add success")
      : res.status(201).redirect('/clients');
  }
  catch (e) {
    console.error(e);
    return res.status(400).json(`add fail`)
  }
}

exports.edit = async (req, res, next) => {
  // console.log("put - clients edit")
  const user = req.userInfo;
  const id = req.params.id;
  let body = req.body;
  body.user = user.userid;
  body.id = id;

  let result = await clientsService
    .update(body)
    .catch(err => console.error(err));

  // console.log('result :', result)

  if (result) return req.api ?
    res.status(200).json("client edit success")
    : res.redirect(`/clients/${id}`);
  else return res.status(400).json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
  let condition = req.query ?
    req.query
    : {};
  console.log(`find all ${condition}`)

  let data = await clientsService
    .allRead(condition)
    .catch(err => console.error(err));

  // console.log("data :", data);

  return req.api ?
    res.json(data)
    : res.render('clients/index', {
      count: data.count,
      data: data.rows,
      user: req.userInfo
    });
}

exports.detail = async (req, res, next) => {
  const id = req.params.id;
  console.log(`open one data id-${id}`)

  const user = req.userInfo;
  let data = await clientsService
    .readOne(id)
    .catch(err => console.error(err));

  // console.log(data);

  if (data) return res.json({
    render: `(clients/${id})`,
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

  let result = await clientsService
    .delete(obj)
    .catch(err => console.error(err));

  // console.log("delete result :", result)

  if (result) return res.redirect('/clients');
  else res.json(`fail id:${id}`)
}

exports.selectCompany = async (req, res, next) => {
  const body = req.body;
  console.log("Select Company body :", body);

  const user = req.userInfo;
  console.log("target client :", user);

  body.id = user.clients_id;

  let result = await clientsService.update(body);

  return result ?
    res.status(200).json("Select Company Success")
    : res.status(400).json("Select Company fail");
}

exports.info = async (req, res, next) => {
  const user = req.userInfo;
  console.log("client :", user);

  return user ?
    res.status(200).json(user)
    : res.status(400).json("접속한 고객이 없습니다.");
}


exports.search = async (req, res, next) => {
    const user = req.userInfo;
    let word = req.query.q;
  console.log("search", word, "start")

  let result = null;
  let condition = {};
  try {
    if (word) {
      condition = {
        [Op.or]: [
          { clientName: { [Op.like]: `%${word}%` } },
          { carNum: { [Op.like]: `%${word}%` } },
          { phoneNum: { [Op.like]: `%${word}%` } }
        ]
      }
    }
    result = await clientsService.allRead(condition);
  } catch (err) {
    console.error(err)
  }

  console.log("search result :", result)

  if (result) return res.status(200).json({ user: user, data: result });
  else res.status(400).json(`don't find ${word}`)
}