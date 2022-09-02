const clientLog = require('../models').clientLog;

exports.create = async (obj) => {
    clientLog
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("clientLog create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    clientLog
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { clientLog_id: obj.id }
        })
        .then(result => {
            console.log("clientLog update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    clientLog
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['clientLog_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("clientLog 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    clientLog
        .fineOne({
            where: {
                clientLog_id: id
            }
        })
        .then(result => {
            console.log(`clientLog_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    clientLog
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { clientLog_id: obj.id }
        })
        .then(result => {
            console.log("clientLog delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}