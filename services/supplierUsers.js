const supplierUsers = require('../models').supplierusers;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getUser = async function (mainPhoneNum) {
    try {
        console.log('find', mainPhoneNum)
        var result = await supplierUsers
            .findOne({
                where: {
                    mainPhoneNum: mainPhoneNum,
                    deleteDate: null
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

exports.changePassword = async (obj) => {
    console.log("update obj :", obj)

    return await supplierUsers
        .update({
            password: obj.newPassword,
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.create = async (obj) => {
    return await supplierUsers
        .create(Object.assign(obj, {
            createUser: obj.user,
            createDate: new Date()
        }))
        .then(result => {
            console.log("supplierUsers create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw (err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await supplierUsers
        .update(Object.assign(obj, {
            updateUser: obj.user,
            updateDate: new Date()
        }), {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw (err);
        })
}

exports.allRead = async (condition = {}) => {
    // console.log('all supplierUsers read');

    return await supplierUsers
        .findAndCountAll({
            raw: true,
            where: Object.assign(condition, {
                deleteDate: null
            }),
            order: [
                ['supplierUsers_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("supplierUsers 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw (err);
        })
}

exports.readOne = async (id) => {
    try {
        console.log('find', id)
        var result = await supplierUsers
            .findOne({
                where: {
                    supplierUsers_id: id,
                    deleteDate: null
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

exports.delete = async (obj) => {
    return await supplierUsers
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw (err);
        })
}

exports.checkID = async function (mainPhoneNum) {
    try {
        console.log('check', mainPhoneNum)
        var result = await supplierUsers
            .findOne({
                where: {
                    mainPhoneNum: mainPhoneNum,
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