const clients = require('../models').clients;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getUser = async function (phoneNum) {
    try {
        console.log('find', phoneNum)
        var result = await clients
            .findOne({
                where: {
                    phoneNum: phoneNum,
                }
            })
            .then(result => result.dataValues)
            .catch(err => { throw Error(err) })
        return result;
    } catch (e) {
        console.log(e);
        // throw Error('Error while getUser');
    }
}

exports.create = async (obj) => {
    return await clients
        .create(Object.assign(obj, {
            createDate: new Date()
        }))
        .then(result => {
            console.log("clients create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw (err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await clients
        .update(Object.assign(obj, {
            updateDate: new Date()
        }), {
            where: { clients_id: obj.id }
        })
        .then(result => {
            console.log("clients update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw (err);
        })
}

exports.allRead = async (condition = {}) => {
    // console.log('all clients read');

    return await clients
        .findAndCountAll({
            raw: true,
            where: condition,
        }, {
            order: [
                ['clients_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("clients 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw (err);
        })
}

exports.readOne = async (id) => {
    return await clients
        .findByPk(id)
        .then(result => {
            console.log(`clients_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw (err);
        })
}

exports.delete = async (obj) => {
    return await clients
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { clients_id: obj.id }
        })
        .then(result => {
            console.log("clients delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw (err);
        })
}