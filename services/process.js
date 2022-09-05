const process = require('../models').process;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await process
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("process create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await process
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { process_id: obj.id }
        })
        .then(result => {
            console.log("process update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all process read');

    return await process
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['process_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("process 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await process
        .findByPk(id)
        .then(result => {
            console.log(`process_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await process
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { process_id: obj.id }
        })
        .then(result => {
            console.log("process delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}