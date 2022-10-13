const notice = require('../models').notice;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await notice
        .create(Object.assign(obj, {
            createUser: obj.user,
            createDate: new Date(),
        }))
        .then(result => {
            console.log("notice create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await notice
        .update(Object.assign(obj, {
            updateUser: obj.user,
            updateDate: new Date()
        }), {
            where: { notice_id: obj.id }
        })
        .then(result => {
            console.log("notice update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async (condition = {}, paging = {}) => {
    // console.log('all notice read');

    return await notice
        .findAndCountAll({
            raw: true,
            where: Object.assign(condition, {
                deleteDate: null
            }),
            order: [
                ['type', 'DESC'],
                ['notice_id', 'DESC'],
            ],
            offset: paging.skip,
            limit: paging.limit
        })
        .then(result => {
            console.log("notice 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await notice
        .findByPk(id)
        .then(result => {
            console.log(`notice_id-${id} find success`);
            return result.dataValues;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await notice
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { notice_id: obj.id }
        })
        .then(result => {
            console.log("notice delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}