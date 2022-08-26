var user = require('../models').user;

exports.getUser = async function (userid) {
    try {
        var result = await user.findOne({
            where:{
                userid: userid
            }
        })
        .then(res=>res.dataValues)
        .catch(err=>{throw Error(err)})
        return result;
    } catch (e) {
        console.log(e);
        // throw Error('Error while getUser');
    }
}