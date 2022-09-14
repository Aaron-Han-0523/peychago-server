const review = require('../models').review;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await review
        .create(Object.assign(obj, {
            createUser: obj.user,
            createDate: new Date()
        }))
        .then(result => {
            console.log("review create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await review
        .update(Object.assign(obj, {
            updateUser: obj.user,
            updateDate: new Date()
        }), {
            where: { review_id: obj.id }
        })
        .then(result => {
            console.log("review update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async () => {
    // console.log('all review read');

    return await review
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['review_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("review 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await review
        .findByPk(id)
        .then(result => {
            console.log(`review_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await review
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { review_id: obj.id }
        })
        .then(result => {
            console.log("review delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}