var userService = require('../services/user')

exports.login = async function (req, res, next) {
    const body = req.body;
    console.log(body)
    console.log("try", body.userID, "login");

    const user = await userService.getUser({
        where: {
            userid: body.userID
        }
    })
    console.log(user)
    if (user) {
        if (user.password == body.userPassword) {
            console.log('login 성공')
            res.cookie("id", user.userid, {
                maxAge: Number.MAX_SAFE_INTEGER,
            })
            res.redirect('/')
        } else {
            console.log('비밀번호 불일치')
            res.send(`<script> alert("아이디와 비밀번호를 확인해주세요."); location.href = document.referrer; </script>`)
        }
    } else {
        console.log('아이디 없음')
        res.send(`<script> alert("아이디와 비밀번호를 확인해주세요."); location.href = document.referrer; </script>`)
    }
}