const usersService = require('../services/users')
const jwt = require('../services/jwt')
const encryption = require('../utils/encryption');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.login = async function (req, res, next) {
    const body = req.body;

    console.log(body)
    console.log("try", body.user_id, "login");

    const user = await usersService.getUser(body.user_id)
    // console.log(user)

    const hashedPassword = await encryption.hashing(body.password);
    console.log("해싱된 패스워드", hashedPassword);
    console.log("저장된 패스워드", user.password);

    if (user) {
        if (user.password == hashedPassword) {
            let password = user.password;

            delete user.password;
            const token = await jwt.createToken(user)

            console.log(token)
            // res.header('Access-Control-Expose-Headers', 'jwt');
            // res.header('jwt', token);

            res.cookie('jwt', token, req.app.get('jwt-option'))
            // return res.status(201).json({
            //     result: 'ok',
            //     token
            // })
            const initPassword = await encryption.hashing('123456');

            if (password == initPassword) return res.redirect('/accounts/changePassword');
            return res.redirect('/');
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
    console.log("user information :", userInfo);

    let body = req.body;
    body.id = userInfo.users_id;
    body.user = userInfo.userName;
    console.log("body :", body);

    const user = await usersService.getUser(userInfo.userid);
    console.log("user :", user);

    const hashedPassword = await encryption.hashing(body.currentPassword);

    if (hashedPassword == user.password) {
        body.newPassword = await encryption.hashing(body.newPassword);

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
    body.password = await encryption.hashing(body.password);
    console.log("Users body :", body);

    body.user = user.userid;
    console.log(body);
    try {
        let result = await usersService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/users');
    }
    catch (e) {
        console.error(e);
        return res.status(409).json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - users edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    body.user = user.userid;
    if (body.password) body.password = await encryption.hashing(body.password);
    body.id = id;

    let result = await usersService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.redirect(`/users/${id}`);
    else res.json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
    let data = await usersService
        .allRead()
        .catch(err => console.error(err));

    // console.log("data :", data);

    return res.render('users/index', {
        count: data.count,
        data: data.rows,
        user: req.userInfo
    });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await usersService
        .readOne(id)
        .catch(err => console.error(err));

    console.log("data :", data);

    if (data) return res.render('users/detail', {
        user: user,
        data: data
    });
    else res.json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const user = req.userInfo;

    console.log('delete', id);

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

exports.checkID = async (req, res, next) => {
    let userid = req.body.userid;
    // console.log(userid)
    const user = await usersService.checkID(userid);
    if (user) return res.status(409).json({ exist: true });
    else return res.status(200).json({ exist: false });
}

exports.search = async (req, res, next) => {
    const user = req.userInfo;
    let word = req.query.q;
    console.log("search", word, "start")

    let result = null;
    let condition = {};
    try {
        if (word) {
            condition = {
                [Op.or]: [
                    { userName: { [Op.like]: `%${word}%` } }
                ]
            }
        }
        result = await usersService.allRead(condition);
    } catch (err) {
        console.error(err)
    }

    console.log("search result :", result)

    if (result) return res.status(200).json({ user: user, data: result });
    else res.status(400).json(`don't find ${word}`)
}