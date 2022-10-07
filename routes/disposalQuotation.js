const express = require('express');
const router = express.Router();

const disposalRequestController = require('../controllers/disposalRequest');
const disposalRequestService = require('../services/disposalRequest');
const supplierUsersService = require('../services/supplierUsers');
const processService = require('../services/process');
const jwt = require('../services/jwt')

/* GET disposalRequest listing. */
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('disposalRequest/add', {
    user: req.userInfo,
  }))
  .post('/add', jwt.verifyToken, disposalRequestController.add)

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
  .post('/edit/:id', jwt.verifyToken, disposalRequestController.edit)

  .get('/delete/:id', jwt.verifyToken, disposalRequestController.delete)

  .get('/search', jwt.verifyToken, disposalRequestController.search)

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
    disposalRequestController.upload)

  .get('/:id', jwt.verifyToken, async (req, res, next) => {
    const data = await disposalRequestService.readOne(req.params.id)
    res.render('disposalRequest/detail', {
      user: req.userInfo,
      data: data,
      process: await processService.readOne(req.params.id),
      supplier: data.supplierUsers_id ? await supplierUsersService.readOne(data.supplierUsers_id) : null,
    })
  })
  .get('/', jwt.verifyToken, disposalRequestController.index)

module.exports = router;
