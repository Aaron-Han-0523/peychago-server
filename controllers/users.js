const userService = require('../services/users')
const jwt = require('jsonwebtoken')

exports.login = async function (req, res, next) {
    const body = req.body;
    const secret = req.app.get('secret_key');

    console.log(body)
    console.log("try", body.user_id, "login");

    const user = await userService.getUser(body.user_id)
    console.log(user)

    if (user) {
        if (user.password == body.password) {
            delete user.password;
            console.log('secret_key :', secret)
            const token = await jwt.sign(user, secret, {
                algorithm: 'HS512',
                expiresIn: '4h',
            })

            console.log(token)
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: req.app.get('cookie-secure'),
            })
            // return res.status(201).json({
            //     result: 'ok',
            //     token
            // })
            return res.redirect('/')
        } else {
            console.log('비밀번호 불일치')
            return res.send(`<script> alert("아이디와 비밀번호를 확인해주세요."); location.href = document.referrer; </script>`)
        }
    } else {
        console.log('아이디 없음')
        return res.send(`<script> alert("아이디와 비밀번호를 확인해주세요."); location.href = document.referrer; </script>`)
    }
}

exports.add = async (req, res, next) => {
    res.render('users/add');
}

exports.edit = async (req, res, next) => {
  
}

exports.index = async (req, res, next) => {
  
}

exports.detail = async (req, res, next) => {
  
}

exports.delete = async (req, res, next) => {
  
}

exports.changePassword = async (req, res, next) => {
  
}