const express = require('express');
const router = express.Router();

const exportRequestController = require('../controllers/exportRequest');
const jwt = require('../services/jwt')

/* GET exportRequest listing. */
router
  .get('/', jwt.verifyToken, exportRequestController.index)
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('exportRequest/add', { user: req.userInfo }))
  .post('/add', jwt.verifyToken, exportRequestController.add)
  .get('/edit/:id', jwt.verifyToken, (req, res, next) => res.render('exportRequest/edit', { user: req.userInfo }))
  .put('/edit/:id', jwt.verifyToken, exportRequestController.edit)
  .delete('/:id', jwt.verifyToken, exportRequestController.delete)
  .get('/:id', jwt.verifyToken, exportRequestController.detail)

module.exports = router;
