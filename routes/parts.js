const express = require('express');
const router = express.Router();

const partsController = require('../controllers/parts');
const partsService = require('../services/parts');
const jwt = require('../services/jwt')

/* GET parts listing. */
router
  .get('/add', jwt.verifyToken, async (req, res, next) => res.render('parts/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, partsController.add)
  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => res.render('parts/edit', {
    user: req.userInfo,
    data: await partsService.readOne(req.params.id),
  }))
  .post('/edit/:id', jwt.verifyToken, partsController.edit)
  .get('/delete/:id', jwt.verifyToken, partsController.delete)
  .get('/search', jwt.verifyToken, partsController.search)
  .get('/:id', jwt.verifyToken, partsController.detail)
  .get('/', jwt.verifyToken, partsController.index)

module.exports = router;
