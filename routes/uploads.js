const express = require('express');
const router = express.Router();

const path = require('path');
const fs = require('fs');
/* GET accounts listing. */
router
  .get('/review/:path', function (req, res) {
    console.log("url :", req.url);
    let extension = path.extname(req.params.path);

    console.log("\t", '../uploads' + req.url)
    fs.readFile('../uploads' + req.url, function (err, data) {
      res.writeHead(200, { 'Content-Type': extension.slice(1) });
      res.end(data);
    })
  })

module.exports = router;
