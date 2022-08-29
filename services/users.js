var users = require('../models').users;

exports.getUser = async function (userid) {
    try {
        console.log('find',userid)
        var result = await users.findOne({
            where:{
                userid: userid
            }
        })
        .then(result=>result.dataValues)
        .catch(err=>{throw Error(err)})
        return result;
    } catch (e) {
        console.log(e);
        // throw Error('Error while getUser');
    }
}