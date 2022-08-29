const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    // read the token from header or url 
    const token = req.cookies.jwt

    // token does not exist
    if(!token) {
        // return res.status(403).json({
        //     success: false,
        //     message: 'not logged in'
        // })
        return res.redirect('users/login')
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('secret_key'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // process the promise
    p.then((decoded)=>{
        req.userInfo = decoded
        const token = jwt.sign(decoded, secret, {
            algorithm: 'HS512',
            expiresIn: '4h',
        })
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: req.app.secure,
        })
        next()
    }).catch((error) => {
        // res.status(403).json({
        //     success: false,
        //     message: error.message
        // })
        res.redirect('users/login')
    })
}