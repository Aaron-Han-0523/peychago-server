const process = require('../models').process;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await process
        .create(Object.assign(obj, {
            createUser: obj.user,
            createDate: new Date(),
        }))
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
        .update(Object.assign(obj, {
            updateUser: obj.user,
            updateDate: new Date()
        }), {
            where: { carNum: obj.id }
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

exports.allRead = async (condition = {}) => {
    // console.log('all process read');

    return await process
        .findAndCountAll({
            raw: true,
            where: Object.assign(condition, {
                date0: { [Op.ne]: null },
                deleteDate: null
            }),
            order: [
                ['date0', 'ASC'],
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
            console.log(`carNum-${id} find result`);
            console.log(result.dataValues);
            return result.dataValues;
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
            where: { carNum: obj.id }
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