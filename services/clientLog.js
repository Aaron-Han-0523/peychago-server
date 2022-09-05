const clientLog = require('../models').clientlog;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = (obj) => {
    return clientLog
        .create({
            createUser: obj.user,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("clientLog create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err)
        });
    }