const userService = require('../services/user')
const jwt = require('jsonwebtoken')

exports.login = async function (req, res, next) {
    const body = req.body;
    console.log(body)
    console.log("try", body.userID, "login");

    const user = await userService.getUser(body.userID)
    console.log(user)

    if (user) {
        if (user.password == body.userPassword) {
            console.log('login 성공')
            res.cookie("id", user.userid, {
                expires: new Date(Date.now() + 60 * 60 * 24), // 하루
                httpOnly: true,
            })
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