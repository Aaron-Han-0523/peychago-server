const disposalRequest = require('../models').disposalRequest;

exports.create = async (obj) => {
    disposalRequest
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("disposalRequest create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    disposalRequest
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { disposalRequest_id: obj.id }
        })
        .then(result => {
            console.log("disposalRequest update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    disposalRequest
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['disposalRequest_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("disposalRequest 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    disposalRequest
        .fineOne({
            where: {
                disposalRequest_id: id
            }
        })
        .then(result => {
            console.log(`disposalRequest_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    disposalRequest
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { disposalRequest_id: obj.id }
        })
        .then(result => {
            console.log("disposalRequest delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}