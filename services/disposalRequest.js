const disposalRequest = require('../models').disposalrequest;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await disposalRequest
        .create(Object.assign(obj, {
            createUser: obj.user,
            createDate: new Date(),
        }))
        .then(result => {
            console.log("disposalRequest create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await disposalRequest
        .update(Object.assign(obj, {
            updateUser: obj.user,
            updateDate: new Date()
        }), {
            where: { carNum: obj.id }
        })
        .then(result => {
            console.log("disposalRequest update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async (condition = {}) => {
    // console.log('all disposalRequest read');

    return await disposalRequest
        .findAndCountAll({
            raw: true,
            where: Object.assign(condition, {
                deleteDate: null
            }),
            order: [
                ['type', 'DESC'],
                ['carNum', 'DESC'],
            ]
        })
        .then(result => {
            console.log("disposalRequest 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await disposalRequest
        .findByPk(id)
        .then(result => {
            console.log(`carNum-${id} find success`);
            return result.dataValues;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await disposalRequest
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { carNum: obj.id }
        })
        .then(result => {
            console.log("disposalRequest delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}