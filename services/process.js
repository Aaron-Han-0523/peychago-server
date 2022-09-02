const process = require('../models').process;

exports.create = async (obj) => {
    process
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("process create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    process
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { process_id: obj.id }
        })
        .then(result => {
            console.log("process update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    process
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['process_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("process 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    process
        .fineOne({
            where: {
                process_id: id
            }
        })
        .then(result => {
            console.log(`process_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    process
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { process_id: obj.id }
        })
        .then(result => {
            console.log("process delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}