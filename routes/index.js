const express = require('express');
const router = express.Router();

const userService = require('../services/users');
const jwt = require('../services/jwt')

/* GET home page. */
router.get('/', jwt.verifyToken, async function(req, res, next) {
  console.log("메인 페이지");

  const user = req.userInfo;
  console.log(user);

  delete user.password;

  console.log("메인 페이지 진입");
  res.json('layout/index');
});

module.exports = router;
