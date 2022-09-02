const supplierRequest = require('../models').supplierRequest;

exports.create = async (obj) => {
    supplierRequest
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("supplierRequest create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    supplierRequest
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { supplierRequest_id: obj.id }
        })
        .then(result => {
            console.log("supplierRequest update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    supplierRequest
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['supplierRequest_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("supplierRequest 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    supplierRequest
        .fineOne({
            where: {
                supplierRequest_id: id
            }
        })
        .then(result => {
            console.log(`supplierRequest_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    supplierRequest
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { supplierRequest_id: obj.id }
        })
        .then(result => {
            console.log("supplierRequest delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}