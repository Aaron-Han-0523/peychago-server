const subsidiary = require('../models').subsidiary;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await subsidiary
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("subsidiary create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await subsidiary
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { subsidiary_id: obj.id }
        })
        .then(result => {
            console.log("subsidiary update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all subsidiary read');

    return await subsidiary
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['subsidiary_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("subsidiary 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await subsidiary
        .findByPk(id)
        .then(result => {
            console.log(`subsidiary_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await subsidiary
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { subsidiary_id: obj.id }
        })
        .then(result => {
            console.log("subsidiary delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}