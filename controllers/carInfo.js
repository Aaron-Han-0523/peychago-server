const carInfoService = require('../services/carInfo');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;
    body.user = user.userid;

    console.log("body ", body)

    try {
        let result = await carInfoService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/carInfo');
    }
    catch (e) {
        console.error(e);
        return res.json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - carInfo edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    body.user = user.userid;
    body.id = id;

    let result = await carInfoService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.redirect(`/carInfo/${id}`);
    else res.json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
    const condition = req.query ? req.query : {};
    console.log("carInfo condition :", condition);

    let data = await carInfoService
        .allRead(condition)
        .catch(err => console.error(err));

    // console.log("data :", data);

    return req.api ?
        res.status(200).json(data)
        : res.render('carInfo/index', {
            count: data.count,
            data: data.rows,
            user: req.userInfo
        });
}

// exports.detail = async (req, res, next) => {
//     const id = req.params.id;
//     console.log(`open one data id-${id}`)

//     const user = req.userInfo;
//     let data = await carInfoService
//         .readOne(id)
//         .catch(err => console.error(err));

//     // console.log(data);

//     if (data) return res.render('carInfo/detail', {
//         data: data.dataValues,

//     });
//     else res.json(`fail id:${id}`)
// }

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const user = req.userInfo;
    let obj = {};
    obj.id = id;
    obj.user = user.userid;

    let result = await carInfoService
        .delete(obj)
        .catch(err => console.error(err));

    // console.log("delete result :", result)

    if (result) return res.redirect('/carInfo');
    else res.json(`fail id:${id}`)
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
                    { maker: { [Op.like]: `%${word}%` } },
                    { model: { [Op.like]: `%${word}%` } }
                ]
            }
        }
        result = await carInfoService.allRead(condition);
    } catch (err) {
        console.error(err)
    }

    console.log("search result :", result)

    if (result) return res.status(200).json({ user: user, data: result });
    else res.status(400).json(`don't find ${word}`)
}