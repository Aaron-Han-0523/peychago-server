var user = require('../models').user;

exports.getUser = async function (orm) {
    try {
        var result = user.findOne(orm).then(res=>res);
        return result;
    } catch (e) {
        console.log(e);
        throw Error('Error while getUser');
    }
}