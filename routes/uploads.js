const express = require('express');
const router = express.Router();

const path = require('path')

/* GET accounts listing. */
router
  .use('/', express.static(path.join(__dirname, './uploads')))

module.exports = router;