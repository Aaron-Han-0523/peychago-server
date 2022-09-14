const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const usersService = require('../services/users');
const jwt = require('../services/jwt');

/* GET users listing. */
router
  .get('/login', (req, res, next) => res.render('users/login'))
  .post('/login', usersController.login)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('users/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, usersController.add)
  .post('/checkID', jwt.verifyToken, usersController.checkID)
  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => {
    // console.log("id :", req.params.id)
    res.render('users/edit', {
      user: req.userInfo,
      data: await usersService.readOne(req.params.id)
    })
  })
  .put('/edit/:id', jwt.verifyToken, usersController.edit)
  .get('/delete/:id', jwt.verifyToken, usersController.delete)
  .put('/changePassword', jwt.verifyToken, usersController.changePassword)
  .get('/:id', jwt.verifyToken, usersController.detail)
  .get('/', jwt.verifyToken, usersController.index)

module.exports = router;
