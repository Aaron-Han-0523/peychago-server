const parts = require('../models').parts;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await parts
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("parts create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await parts
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { parts_id: obj.id }
        })
        .then(result => {
            console.log("parts update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all parts read');

    return await parts
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['parts_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("parts 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await parts
        .findByPk(id)
        .then(result => {
            console.log(`parts_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await parts
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { parts_id: obj.id }
        })
        .then(result => {
            console.log("parts delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}