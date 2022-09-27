const express = require('express');
const router = express.Router();

const disposalRequestController = require('../controllers/disposalRequest');
const disposalRequestService = require('../services/disposalRequest');
const jwt = require('../services/jwt')

/* GET disposalRequest listing. */
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('disposalRequest/add', {
    user: req.userInfo,
  }))
  .post('/add', jwt.verifyToken, disposalRequestController.add)

  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => res.render('disposalRequest/edit', {
    user: req.userInfo,
    data: await disposalRequestService.readOne(req.params.id),
  }))
  .post('/edit/:id', jwt.verifyToken, disposalRequestController.edit)

  .get('/delete/:id', jwt.verifyToken, disposalRequestController.delete)

  .get('/search', jwt.verifyToken, disposalRequestController.search)

  .get('/:id', jwt.verifyToken, async (req, res, next) => res.render('disposalRequest/detail', {
    user: req.userInfo,
    data: await disposalRequestService.readOne(req.params.id),
  }))
  .get('/', jwt.verifyToken, disposalRequestController.index)

module.exports = router;
