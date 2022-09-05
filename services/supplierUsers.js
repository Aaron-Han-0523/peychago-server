const supplierUsers = require('../models').supplierusers;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await supplierUsers
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("supplierUsers create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await supplierUsers
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all supplierUsers read');

    return await supplierUsers
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['supplierUsers_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("supplierUsers 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await supplierUsers
        .findByPk(id)
        .then(result => {
            console.log(`supplierUsers_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await supplierUsers
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}