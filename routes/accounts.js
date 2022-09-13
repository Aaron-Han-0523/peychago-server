const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts');
const jwt = require('../services/jwt')

/* GET accounts listing. */
router
  .get('/login', (req, res, next) => res.render('accounts/main'))
  .get('/logout', accountsController.logout)
  .get('/changePassword', jwt.verifyToken, (req, res, next) => res.render('accounts/changePassword'))

module.exports = router;
