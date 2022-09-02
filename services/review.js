const review = require('../models').review;

exports.create = async (obj) => {
    review
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("review create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}

exports.update = async (obj) => {
    review
        .update({
            updateUser: obj.user,
            updateDate: new Date()
        }, {
            where: { review_id: obj.id }
        })
        .then(result => {
            console.log("review update success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}

exports.allRead = async () => {
    review
        .findAndCountAll({
            where: {
                deleteDate: {
                    [Op.ne]: null
                }
            },
            order: [
                ['review_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("review 'count' and 'rows' read success");
            return result;
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.readOne = async (id) => {
    review
        .fineOne({
            where: {
                review_id: id
            }
        })
        .then(result => {
            console.log(`review_id-${id} find success`);
            return result
        })
        .catch(err => {
            console.error(err);
            return err;
        })
}

exports.delete = async () => {
    review
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { review_id: obj.id }
        })
        .then(result => {
            console.log("review delete success");
            return result;
        })
        .catch(err => {
            console.log(err);
            return err;
        })
}