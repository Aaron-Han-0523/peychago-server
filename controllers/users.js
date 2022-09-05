const usersService = require('../services/users')
const jwt = require('../services/jwt')

exports.login = async function (req, res, next) {
    const body = req.body;
    const secret = req.app.get('secret_key');

    console.log(body)
    console.log("try", body.user_id, "login");

    const user = await usersService.getUser(body.user_id)
    // console.log(user)

    if (user) {
        if (user.password == body.password) {
            delete user.password;
            console.log('secret_key :', secret)
            const token = await jwt.createToken(user);

            console.log(token)
            // res.header('Access-Control-Expose-Headers', 'jwt');
            // res.header('jwt', token);

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

exports.logout = async (req, res, next) => {
    await res.cookie('jwt', '', {
        httpOnly: true,
        secure: req.app.get('cookie-secure')
    });
    res.redirect('/');
    console.log("logout")
}

exports.changePassword = async (req, res, next) => {
    const userInfo = req.userInfo;
    // console.log(userInfo);
    let body = req.body;
    body.id = userInfo.users_id;
    body.user = userInfo.userName;
    const user = await usersService.getUser(userInfo.userid);

    if (body.currentPassword == user.password) {
        let result = await usersService
            .changePassword(body)
            .catch(err => console.error(err));

        if (result) res.redirect(`/`);
        else res.json(`fail : changePassword`)
    }
    else res.json(`check Password`)
}

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;
    body.user = user.userid;

    try {
        let result = await usersService.create(body);
        // console.log("result :",result);
        return res.redirect('/users');
    }
    catch (e) {
        console.error(e);
        return res.json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - users edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    body.user = user.userid;
    body.id = id;

    let result = await usersService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.redirect(`/users/${id}`);
    else res.json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
    let datas = await usersService
        .allRead()
        .catch(err => console.error(err));

    // console.log("datas :", datas);

    return res.json({
        render: '(users/index)',
        count: datas.count,
        datas: datas.rows
    });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await usersService
        .readOne(id)
        .catch(err => console.error(err));

    // console.log(data);

    if (data) return res.json({
        render: `(users/${id})`,
        data: data.dataValues
    });
    else res.json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const user = req.userInfo;
    let obj = {};
    obj.id = id;
    obj.user = user.userid;

    let result = await usersService
        .delete(obj)
        .catch(err => console.error(err));

    // console.log("delete result :", result)

    if (result) return res.redirect('/users');
    else res.json(`fail id:${id}`)
}