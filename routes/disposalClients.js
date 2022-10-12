const express = require('express');
const router = express.Router();

const disposalClientsController = require('../controllers/disposalClients');
const supplierUsersService = require('../services/supplierUsers');
const clientsService = require('../services/clients');
const processService = require('../services/process');
const disposalRequestService = require('../services/request');
const jwt = require('../services/jwt')

/* GET disposalClients listing. */
router
  .get('/add', jwt.verifyToken, (req, res, next) => res.render('disposalClients/add', {
    user: req.userInfo
  }))
  .post('/add', jwt.verifyToken, disposalClientsController.add)

  .get('/edit/:id', jwt.verifyToken, async (req, res, next) => {
    const process = processService.readOne(req.params.id);
    const request = disposalRequestService.readOne(req.params.id);

    const data = await Promise.all([process, request])
      .then(async (data) => {
        const client = clientsService.readOne(data[0].clients_id);
        const supplierUser = data[1].supplierUsers_id ? supplierUsersService.readOne(data[1].supplierUsers_id) : null;
        await Promise.all([client, supplierUser]).then(result => {
          data.push(...result);
        })
        return data;
      })
      .catch(err => {
        console.error(err);
      });

    // console.log("edit load data :", data);
    const res_data = {
      user: req.userInfo
      , process: data[0]
      , request: data[1]
      , clients: data[2]
      , supplier: data[3]
    }
    return res.render('disposalClients/edit', res_data);
  })
  .put('/edit/:id', jwt.verifyToken, disposalClientsController.edit)

  .get('/search', jwt.verifyToken, disposalClientsController.search)

  .get('/delete/:id', jwt.verifyToken, disposalClientsController.delete)

  .get('/:id', jwt.verifyToken, disposalClientsController.detail)
  .get('/', jwt.verifyToken, disposalClientsController.index)

module.exports = router;
