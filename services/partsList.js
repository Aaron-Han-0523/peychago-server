const parts = require('../models').parts;
const partslist = require('../models').partslist;
const carinfo = require('../models').carinfo;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    return await partslist
        .create(obj)
        .then(result => {
            console.log("partslist create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw new Error(err);
        });
}

exports.update = async (obj) => {
    console.log("update obj :", obj)
    return await partslist
        .update(obj, {
            where: { partslist_id: obj.id }
        })
        .then(result => {
            console.log("partslist update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}

exports.allRead = async (condition) => {
    // console.log('all partslist read');

    return await partslist
        .findAndCountAll({
            // include: [
            //     {
            //         model: parts,
            //         as: 'part',
            //         where: { deleteDate: null }
            //     },{
            //         model:carinfo,
            //         where: { deleteDate: null }
            //     }
            // ],
            where: condition,
            order: [
                ['parts_id', 'DESC'],
            ]
        })
        .then(result => {
            console.log("partslist 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.readOne = async (id) => {
    return await partslist
        .findByPk(id)
        .then(result => {
            console.log(`partslist_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw new Error(err);
        })
}

exports.delete = async (obj) => {
    return await partslist
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { partslist_id: obj.id }
        })
        .then(result => {
            console.log("partslist delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}