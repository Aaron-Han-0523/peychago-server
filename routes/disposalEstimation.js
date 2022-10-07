const express = require('express');
const router = express.Router();

const disposalEstimationController = require('../controllers/disposalEstimation');
const disposalEstimationService = require('../services/disposalEstimation');
const processService = require('../services/process');
const jwt = require('../services/jwt')

/* GET disposalRequest listing. */
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('disposalRequest/add', {
    user: req.userInfo,
  }))
  .post('/add', jwt.verifyToken, disposalEstimationController.add)

  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => {
    const data = await disposalRequestService.readOne(req.params.id);
    const process = await processService.readOne(req.params.id);
    const supplier = await supplierUsersService.readOne(data.supplierUsers_id);
    const supplierUsers = await supplierUsersService.allRead();
    return req.api ?
      res.json({
        user: req.userInfo,
        data: data,
        process: process,
        supplier: supplier,
        supplierUsers: supplierUsers
      })
      : res.render('disposalRequest/edit', {
        user: req.userInfo,
        data: data,
        process: process,
        supplier: supplier,
        supplierUsers: supplierUsers
      })
  })
  .post('/edit/:id', jwt.verifyToken, disposalEstimationController.edit)

  .get('/delete/:id', jwt.verifyToken, disposalEstimationController.delete)

  .get('/search', jwt.verifyToken, disposalEstimationController.search)

  .post('/upload/:id', jwt.verifyToken,
    // (req, res, next) => { console.log('disposalRequest body\n', req.get('content-Type')); next(); },
    (req, res, next) => upload('폐차회수요청서').single('diposalRequest')(req, res, function (err) {
      if (err) {
        console.error(err); // multer 에러 확인
        return
      }
      next();
    }),
    // (req, res, next) => { console.log('disposalRequest upload file\n', req.file); next(); },
    disposalEstimationController.upload)

  .get('/:id', jwt.verifyToken, async (req, res, next) => {
    const data = await disposalRequestService.readOne(req.params.id)
    res.render('disposalRequest/detail', {
      user: req.userInfo,
      data: data,
      process: await processService.readOne(req.params.id),
      supplier: data.supplierUsers_id ? await supplierUsersService.readOne(data.supplierUsers_id) : null,
    })
  })
  .get('/', jwt.verifyToken, disposalEstimationController.index)

module.exports = router;
