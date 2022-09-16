const express = require('express');
const router = express.Router();

const accountsController = require('../controllers/accounts');
const usersController = require('../controllers/users');
const supplierUsersController = require('../controllers/supplierUsers');
const jwt = require('../services/jwt')

/* GET accounts listing. */
router
  .get('/login', (req, res, next) => res.render('accounts/main'))
  .get('/logout', accountsController.logout)
  .get('/changePassword', jwt.verifyToken, (req, res, next) => res.render('accounts/changePassword', { user: req.userInfo }))
  .post('/changePassword', jwt.verifyToken, (req, res, next) => {
    console.log('accounts change password');
    console.log('body :', req.body);
    
    const user = req.userInfo;
    // console.log(user);
    if(user.permission1===undefined) return supplierUsersController.changePassword(req, res, next);
    else return usersController.changePassword(req, res, next);
  })

module.exports = router;
