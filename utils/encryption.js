const crypto = require('crypto')
const salt = process.env.salt
const stretching_num = parseInt(process.env.stretching_num)

module.exports.hashing = password => {
    // crypto.pbkdf2(password, salt, iterations, keylen, digest, callback)
    // console.log("μνΈν μ€...")
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(
            password, salt, stretching_num, 200, 'sha512',
            (err, key) => {
                if (err) {
                    reject(err);
                }
                resolve(key.toString())
            });
    });
}