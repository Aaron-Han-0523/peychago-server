const jwt = require('../services/jwt')
var express = require('express');
var router = express.Router();

let userService = require('../services/users');

/* GET home page. */
router.get('/', jwt.verifyToken, async function(req, res, next) {
  console.log("메인 페이지");

  const user = req.userInfo;
  console.log(user);

  delete user.password;

  console.log("메인 페이지 진입");
  res.render('pages/index', {
    title: 'Notice',
    user: user,
  });
});

module.exports = router;
