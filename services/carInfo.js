const carInfo = require('../models').carinfo;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await carInfo
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("carInfo create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await carInfo
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { carInfo_id: obj.id }
        })
        .then(result => {
            console.log("carInfo update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all carinfo read');

    return await carInfo
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['carInfo_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("carInfo 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await carInfo
        .findByPk(id)
        .then(result => {
            console.log(`carInfo_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await carInfo
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { carInfo_id: obj.id }
        })
        .then(result => {
            console.log("carInfo delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}