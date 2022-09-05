const clients = require('../models').clients;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await clients
        .create({
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("clients create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await clients
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { clients_id: obj.id }
        })
        .then(result => {
            console.log("clients update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all clients read');

    return await clients
        .findAndCountAll({            
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
            throw new Error(err);
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
            throw new Error(err);
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
            throw new Error(err);
        })
}