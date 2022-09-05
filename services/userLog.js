const userLog = require('../models').userlog;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = (obj) => {
    userLog
        .create({
            createUser: obj.user,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("userLog create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            throw new Error(err)
        });
}