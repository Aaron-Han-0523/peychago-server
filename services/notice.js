const notice = require('../models').notice;

exports.create = async (obj) => {
    notice
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("notice create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    notice
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { notice_id: obj.id }
        })
        .then(result => {
            console.log("notice update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    notice
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['notice_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("notice 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    notice
        .fineOne({
            where: {
                notice_id: id
            }
        })
        .then(result => {
            console.log(`notice_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    notice
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { notice_id: obj.id }
        })
        .then(result => {
            console.log("notice delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}