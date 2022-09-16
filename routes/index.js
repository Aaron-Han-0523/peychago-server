const express = require('express');
const router = express.Router();

const userService = require('../services/users');
const jwt = require('../services/jwt')

/* GET home page. */
router.get('/', jwt.verifyToken, async function (req, res, next) {
  console.log("메인 페이지");

  const user = req.userInfo;
  console.log(user);
  console.log(user.permission5 === undefined);
  delete user.password;

  console.log("메인 페이지 진입");
  // res.render('layout/index', {
  //   title: 'Notice',
  //   user: user,
  // });

  if (user.permission1 === undefined) return res.redirect('/disposalRequest');
  else return res.redirect('/notice');
});

module.exports = router;
