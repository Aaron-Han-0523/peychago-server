const jwt = require('jsonwebtoken')

exports.verifyToken = (req, res, next) => {
    console.log('verify token')

    // read the token from header or url 
    const token = req.cookies.jwt
    const secret = req.app.get('secret_key')
    // console.log(token)

    // token does not exist
    if(!token) {
        console.log('no token')
        // return res.status(403).json({
        //     success: false,
        //     message: 'not logged in'
        // })
        return res.redirect('/users/login')
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // process the promise
    p.then((decoded)=>{
        req.userInfo = decoded
        // console.log(decoded)
        delete decoded.iat
        delete decoded.exp
        const token = jwt.sign(decoded, secret, {
            algorithm: 'HS512',
            expiresIn: '4h',
        })
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: req.app.get('cookie-secure'),
        })
        console.log('verify complete')
        next()
    }).catch((error) => {
        console.log(error)
        // res.status(403).json({
        //     success: false,
        //     message: error.message
        // })
        return res.redirect('/users/login')
    })
}