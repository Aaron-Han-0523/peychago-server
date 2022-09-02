const users = require('../models').users;

exports.create = async (obj) => {
    users
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("users create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    users
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { users_id: obj.id }
        })
        .then(result => {
            console.log("users update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    users
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['users_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("users 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    users
        .fineOne({
            where: {
                users_id: id
            }
        })
        .then(result => {
            console.log(`users_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    users
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { users_id: obj.id }
        })
        .then(result => {
            console.log("users delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}