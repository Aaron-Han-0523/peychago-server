const supplierUsersService = require('../Services/supplierUsers');
const jwt = require('../services/jwt')

exports.login = async function (req, res, next) {
    const body = req.body;

    console.log(body)
    console.log("try", body.user_id, "login");

    const supplier = await supplierUsersService.getUser(body.user_id)
    // console.log(user)

    if (supplier) {
        if (supplier.password == body.password) {
            delete supplier.password;
            const token = await jwt.createToken(supplier)

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

exports.changePassword = async (req, res, next) => {
    const userInfo = req.userInfo;
    // console.log(userInfo);
    let body = req.body;
    body.id = userInfo.users_id;
    body.user = userInfo.userName;
    const user = await supplierUsersService.getUser(userInfo.userid);

    if (body.currentPassword == user.password) {
        let result = await supplierUsersService
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
        let result = await supplierUsersService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/supplierUsers');
    }
    catch (e) {
        console.error(e);
        return res.json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - supplierUsers edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    body.user = user.userid;
    body.id = id;

    let result = await supplierUsersService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.redirect(`/supplierUsers/${id}`);
    else res.json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
    let datas = await supplierUsersService
        .allRead()
        .catch(err => console.error(err));

    // console.log("datas :", datas);

    return res.json({
        render: '(supplierUsers/index)',
        count: datas.count,
        datas: datas.rows
    });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await supplierUsersService
        .readOne(id)
        .catch(err => console.error(err));

    // console.log(data);

    if (data) return res.json({
        render: `(supplierUsers/${id})`,
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

    let result = await supplierUsersService
        .delete(obj)
        .catch(err => console.error(err));

    // console.log("delete result :", result)

    if (result) return res.redirect('/supplierUsers');
    else res.json(`fail id:${id}`)
}