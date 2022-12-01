const carInfo = require('../models').carinfo;
const partslist = require('../models').partslist;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = async (obj) => {
    const car = await carInfo
        .create(Object.assign(obj, {
            createUser: obj.user,
            createDate: new Date(),
        }))
        .then(result => {
            console.log("carInfo create success");
            return result;
        })
        .catch((err) => {
            // console.error(err);
            throw (err);
        });

    // console.log(car.carInfo_id);
    if (obj.cnt instanceof Array) {
        let partslist_obj = [];
        for (let i = 0; i < obj.cnt.length; i++) {
            partslist_obj.push({
                carInfo_id: car.carInfo_id,
                parts_id: obj.parts_id[i],
                part_cnt: obj.cnt[i],
            });
        }

        await partslist
            .bulkCreate(partslist_obj)
            .then(result => {
                // console.log(result);
            })
            .catch(err => {
                throw (err)
            });
    }
    return true
}

exports.update = async (obj) => {
    console.log("update obj :", obj);
    await carInfo
        .update(Object.assign(obj, {
            updateUser: obj.user,
            updateDate: new Date()
        }), {
            where: { carInfo_id: obj.id }
        })
        .then(result => {
            console.log("carInfo update success");
            return result.pop();
        })
        .catch((err) => {
            // console.error(err);
            throw (err);
        });

    await partslist.destroy({ where: { carInfo_id: obj.id } });

    if (obj.cnt instanceof Array) {
        let partslist_obj = [];
        for (let i = 0; i < obj.cnt.length; i++) {
            partslist_obj.push({
                carInfo_id: obj.id,
                parts_id: obj.parts_id[i],
                part_cnt: obj.cnt[i],
            });
        }

        await partslist
            .bulkCreate(partslist_obj)
            .then(result => {
                // console.log(result);
            })
            .catch(err => {
                throw (err)
            });
    }
    return true
}

exports.allRead = async (condition = {}) => {
    // console.log('all carinfo read');

    return await carInfo
        .findAndCountAll({
            raw: true,
            where: Object.assign(condition, {
                deleteDate: null
            }),
            order: [
                ['carInfo_id', 'DESC']
            ]
        })
        .then(result => {
            console.log("carInfo 'count' and 'rows' read success");
            console.log("data count :", result.count)
            return result;
        })
        .catch(err => {
            // console.error(err);
            throw (err);
        });
}

exports.readOne = async (id) => {
    return await carInfo
        .findByPk(id)
        .then(result => {
            console.log(`carInfo_id-${id} find success`);
            return result
        })
        .catch(err => {
            // console.error(err);
            throw (err);
        })
}

exports.delete = async (obj) => {
    return await carInfo
        .update({
            deleteUser: obj.user,
            deleteDate: new Date()
        }, {
            where: { carInfo_id: obj.id }
        })
        .then(result => {
            console.log("carInfo delete success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw (err);
        })
}