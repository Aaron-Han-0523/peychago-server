const supplierUsers = require('../models').supplierusers;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await supplierUsers
        .create({
            companyName: obj.companyName
            , mainPhoneNum: obj.mainPhoneNum
            , password: "123456"
            , address: obj.address
            , companyNumber: obj.companyNumber
            , ownerName: obj.ownerName
            , phoneNum: obj.phoneNum
            , email: obj.email
            , createUser: obj.user
        })
        .then(result => {
            console.log("supplierUsers create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw (err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await supplierUsers
        .update({
            companyName: obj.companyName
            , mainPhoneNum: obj.mainPhoneNum
            , password: obj.password
            , address: obj.address
            , companyNumber: obj.companyNumber
            , ownerName: obj.ownerName
            , phoneNum: obj.phoneNum
            , email: obj.email
            , updateUser: obj.user
            , updateDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw (err);
        })
}

exports.allRead = async () => {
    // console.log('all supplierUsers read');

    return await supplierUsers
        .findAndCountAll({
            where: {
                deleteDate: null
            },
            order: [
                ['supplierUsers_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("supplierUsers 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw (err);
        })
}

exports.readOne = async (id) => {
    return await supplierUsers
        .findByPk(id)
        .then(result => {
            console.log(`supplierUsers_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw (err);
        })
}

exports.delete = async (obj) => {
    return await supplierUsers
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { supplierUsers_id: obj.id }
        })
        .then(result => {
            console.log("supplierUsers delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw (err);
        })
}