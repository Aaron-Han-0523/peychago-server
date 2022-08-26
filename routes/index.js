var express = require('express');
var router = express.Router();

let userService = require('../services/user');

/* GET home page. */
router.get('/', async function(req, res, next) {
  console.log("메인 페이지")

  // const cookies = req.cookies;
  // console.log('cookies :',cookies)
  // if (!cookies.id) {
  //   console.log("id쿠키없음")
  //   return res.redirect('/user/login')
  // }

  // const user = await (userService.getUser(cookies.id))

  // delete user.password
  // console.log(user)

  // console.log("메인 페이지 진입")
  res.render('pages/index', {
    title: 'Notice',
    // user: user,
  });
});

module.exports = router;
