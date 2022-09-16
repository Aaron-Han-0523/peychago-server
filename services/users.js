const users = require('../models').users;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getUser = async function (userid) {
    try {
        console.log('find', userid)
        var result = await users
            .findOne({
                where: {
                    userid: userid,
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

    return await users
        .update({
            password: obj.newPassword,
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { users_id: obj.id }
        })
        .then(result => {
            console.log("users update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.create = async (obj) => {
    console.log(obj)
    return await users
        .create(Object.assign(obj, {
            createUser: obj.user,
            createDate: new Date()
        }))
        .then(result => {
            console.log("users create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await users
        .update(Object.assign(obj,{
            updateUser: obj.user,
            updateDate: new Date()
        }), {
            where: { userid: obj.userid }
        })
        .then(result => {
            console.log("users update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all users read');

    return await users
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['users_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("users 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    try {
        console.log('find', id)
        var result = await users
            .findOne({
                where: {
                    users_id: id,
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
    return await users
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { users_id: obj.id }
        })
        .then(result => {
            console.log("users delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.checkID = async function (userid) {
    try {
        console.log('check', userid)
        var result = await users
            .findOne({
                where: {
                    userid: userid,
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