const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
/* GET accounts listing. */
router
  .use('/', express.static(path.join(process.cwd(), process.env.UPLOADFILES_ROOT)))

module.exports = router;
