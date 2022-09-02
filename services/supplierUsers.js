const supplierUsers = require('../models').supplierUsers;

exports.create = async (obj) => {
    supplierUsers
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("supplierUsers create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    supplierUsers
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    supplierUsers
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['supplierUsers_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("supplierUsers 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    supplierUsers
        .fineOne({
            where: {
                supplierUsers_id: id
            }
        })
        .then(result => {
            console.log(`supplierUsers_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    supplierUsers
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}