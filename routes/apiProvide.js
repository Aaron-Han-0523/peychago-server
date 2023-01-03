const express = require("express");
const router = express.Router();

// const usersController = require('../controllers/users');

/* GET accounts listing. */
router
  .use("/returnURLA", (req, res, next) => {
    console.log(req.method);
    console.log(req.body);
  })
  .use("/returnURLD", (req, res, next) => {
    console.log(req.method);
    console.log(req.body);
  });

module.exports = router;
