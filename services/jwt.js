const jwt = require('jsonwebtoken')
const secret = process.env.SECRET_KEY
const login_url = '/users/login'    // 로그인 분리 시 url : '/accounts/login'

exports.verifyToken = async (req, res, next) => {
    console.log('verify token')
    console.log('Request url :', req.url)

    // read the token from header or url 
    const token = req.cookies.jwt
    const secret = req.app.get('secret_key')
    // console.log(token)

    // token does not exist
    if (!token) {
        console.log('no token', req.ip)
        // return res.status(403).json({
        //     success: false,
        //     message: 'not logged in'
        // })
        return req.api ?
            res.status(403).json("접근할 수 없습니다.")
            : res.redirect(login_url)
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, secret, (err, decoded) => {
                if (err) reject(err)
                resolve(decoded)
            })
        }
    )

    // process the promise
    p.then(async (decoded) => {
        // console.log(decoded)
        delete decoded.iat;
        delete decoded.exp;
        req.userInfo = decoded;

        const token = await this.createToken(decoded);
        // console.log(token);

        res.cookie('jwt', token, req.app.get('jwt-option'))
        console.log('verify complete')
        next()
    }).catch((error) => {
        console.log(error)
        // res.status(403).json({
        //     success: false,
        //     message: error.message
        // })
        return req.api ?
            res.status(403).json("접근할 수 없습니다.")
            : res.redirect(login_url)
    })
}

exports.createToken = (payload) => {
    return jwt.sign(payload, secret, {
        algorithm: 'HS512',
        expiresIn: '4h',
    })
}