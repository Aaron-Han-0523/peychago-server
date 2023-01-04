const express = require("express");
const router = express.Router();

// const usersController = require('../controllers/users');

/* GET accounts listing. */
router
  .use("/returnURLA", (req, res, next) => {
    console.log("/returnURLA");
    console.log(req.method);
    console.log(req.body);
    return res.redirect('/');
  })
  .use("/returnURLD", (req, res, next) => {
    console.log("/returnURLD");
    console.log(req.method);
    console.log(req.body);
  });

module.exports = router;
