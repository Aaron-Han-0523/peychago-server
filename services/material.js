const material = require('../models').material;

exports.create = async (obj) => {
    material
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("material create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    material
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { material_id: obj.id }
        })
        .then(result => {
            console.log("material update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    material
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['material_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("material 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    material
        .fineOne({
            where: {
                material_id: id
            }
        })
        .then(result => {
            console.log(`material_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    material
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { material_id: obj.id }
        })
        .then(result => {
            console.log("material delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}