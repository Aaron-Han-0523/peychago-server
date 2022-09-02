const carInfo = require('../models').carInfo;

exports.create = async (obj) => {
    carInfo
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("carInfo create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    carInfo
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { carInfo_id: obj.id }
        })
        .then(result => {
            console.log("carInfo update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    carInfo
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['carInfo_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("carInfo 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    carInfo
        .fineOne({
            where: {
                carInfo_id: id
            }
        })
        .then(result => {
            console.log(`carInfo_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    carInfo
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { carInfo_id: obj.id }
        })
        .then(result => {
            console.log("carInfo delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}