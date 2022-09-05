const supplierRequest = require('../models').supplierrequest;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await supplierRequest
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("supplierRequest create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await supplierRequest
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { supplierRequest_id: obj.id }
        })
        .then(result => {
            console.log("supplierRequest update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all supplierRequest read');

    return await supplierRequest
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['supplierRequest_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("supplierRequest 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await supplierRequest
        .findByPk(id)
        .then(result => {
            console.log(`supplierRequest_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await supplierRequest
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { supplierRequest_id: obj.id }
        })
        .then(result => {
            console.log("supplierRequest delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}