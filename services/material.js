const material = require('../models').material;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await material
        .create({
            createUser: obj.user,
            createDate: new Date(),
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("material create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await material
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { material_id: obj.id }
        })
        .then(result => {
            console.log("material update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all material read');

    return await material
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['material_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("material 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await material
        .findByPk(id)
        .then(result => {
            console.log(`material_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await material
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { material_id: obj.id }
        })
        .then(result => {
            console.log("material delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}