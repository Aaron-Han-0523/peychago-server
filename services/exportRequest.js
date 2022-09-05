const exportRequest = require('../models').exportrequest;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await exportRequest
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("exportRequest create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await exportRequest
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { exportRequest_id: obj.id }
        })
        .then(result => {
            console.log("exportRequest update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all exportRequest read');

    return await exportRequest
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['exportRequest_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("exportRequest 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await exportRequest
        .findByPk(id)
        .then(result => {
            console.log(`exportRequest_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await exportRequest
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { exportRequest_id: obj.id }
        })
        .then(result => {
            console.log("exportRequest delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}