const exportRequest = require('../models').exportRequest;

exports.create = async (obj) => {
    exportRequest
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("exportRequest create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    exportRequest
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { exportRequest_id: obj.id }
        })
        .then(result => {
            console.log("exportRequest update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    exportRequest
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['exportRequest_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("exportRequest 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    exportRequest
        .fineOne({
            where: {
                exportRequest_id: id
            }
        })
        .then(result => {
            console.log(`exportRequest_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    exportRequest
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { exportRequest_id: obj.id }
        })
        .then(result => {
            console.log("exportRequest delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}