const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET_KEY
const login_url = '/users/login'    // 로그인 분리 시 url : '/accounts/login'
const clients = require('../models').clients;

exports.verifyToken = async (req, res, next) => {
    console.log('verify token')
    console.log('Request url :', req.originalUrl)
    console.log('jwt body :', req.body)
    console.log('jwt headers :', req.headers)
    if(req.api) {
        // clients_id 사용자 정보 가져와서  req.userInfo
	console.log(req.body.clients_id);
        const id = req.body.clients_id || req.query.clients_id;
	req.userInfo = await clients.findByPk(id,{raw:true});
	console.log(req.userInfo);
        next()
    } else {
    // read the token from header or url 
    const token = req.cookies.jwt
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
        delete decoded.createDate;
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
}

exports.createToken = (payload) => {
    return jwt.sign(payload, secret, {
        algorithm: 'HS512',
        expiresIn: '4h',
    })
}
