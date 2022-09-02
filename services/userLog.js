const userLog = require('../models').userLog;

exports.create = async (obj) => {
    userLog
        .create({
            createUser: obj.createUser,
            createDate: new Date()
        }, {
            fields: ['createUser', 'createDate']
        })
        .then(result => {
            console.log("userLog create success");
            return result;
        })
        .catch((err) => {
            console.error(err);
            return err;
        });
}