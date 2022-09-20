const express = require('express');
const router = express.Router();

const carInfoController = require('../controllers/carInfo');
const carInfoService = require('../services/carInfo');
const partsService = require('../services/parts');
const partsListService = require('../services/partsList');
const jwt = require('../services/jwt')

/* GET carinfo listing. */
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('carInfo/add', {
    user: req.userInfo,
    parts: await partsService.allRead(),
  }))
  .post('/add', jwt.verifyToken, carInfoController.add)
  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => res.render('carInfo/edit', {
    user: req.userInfo,
    parts: await partsService.allRead(),
    partsList: await partsListService.allRead({
      carInfo_id:req.params.id
    }),
    data: await carInfoService.readOne(req.params.id),
  }))
  .post('/edit/:id', jwt.verifyToken, carInfoController.edit)
  .get('/delete/:id', jwt.verifyToken, carInfoController.delete)
  .get('/:id', jwt.verifyToken, async (req, res, next) => res.render('carInfo/detail', {
    user: req.userInfo,
    parts: await partsService.allRead(),
    partsList: await partsListService.allRead({
      carInfo_id:req.params.id
    }),
    data: await carInfoService.readOne(req.params.id),
  }))
  .get('/', jwt.verifyToken, carInfoController.index)

module.exports = router;
