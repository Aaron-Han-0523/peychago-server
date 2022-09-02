const clients = require('../models').clients;

exports.create = async (obj) => {
    clients
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("clients create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    clients
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { clients_id: obj.id }
        })
        .then(result => {
            console.log("clients update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    clients
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['clients_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("clients 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    clients
        .fineOne({
            where: {
                clients_id: id
            }
        })
        .then(result => {
            console.log(`clients_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    clients
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { clients_id: obj.id }
        })
        .then(result => {
            console.log("clients delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}