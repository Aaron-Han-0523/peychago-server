const imageSetting = require('../models').imagesetting;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.allRead = async () => {
    return await null;
}

exports.readOne = async () => {
    return await null;
}

exports.update = async (valus) => {
    console.log(valus)
    return await imageSetting
        .update(valus, {
            where: {
                imagesetting_id: 1
            }
        })
        .then(result => {
            console.log("carInfo update success");
            return result.pop();
        })
        .catch(err => {
            // console.log(err);
            throw new Error(err);
        })
}