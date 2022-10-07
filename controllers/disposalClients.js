const clientsService = require('../services/clients');
const processService = require('../services/process');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// let query = `
// select supplier.companyName, req.* from supplierrequest req
// left join supplierusers supplier
// on req.supplierUsers_id=supplier.supplierUsers_id
// order by supplierUsers_id desc;
// `
// const data = await models.sequelize.query(query)
//     .then(function (results, metadata) {
//         // 쿼리 실행 성공
//         return results[0];
//     })
//     .catch(function (err) {
//         // 쿼리 실행 에러 
//         console.error(err);
//     });

// console.log("data :", data);

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;
    body.user = user.userid;

    console.log("body ", body)

    try {
        let result = await clientsService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/disposalClients');
    }
    catch (e) {
        console.error(e);
        return res.status(400).json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - clients edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    body.user = user.userid;
    body.id = id;

    let result = await clientsService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.status(200).end();
    //(`/disposalClients/${id}`);
    else res.status(400).json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
    const condition = req.query ? req.query : {};
    console.log("clients condition :", condition);
    condition.processType = 1;

    let data = await processService
        .allRead(condition)
        .catch(err => console.error(err));

    // console.log("data :", data);

    return req.api ?
        res.status(200).json(data)
        : res.render('disposalClients/index', {
            count: data.count,
            data: data.rows,
            user: req.userInfo
        });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await clientsService
        .readOne(id)
        .catch(err => console.error(err));

    // console.log(data);

    if (data) return res.render('disposalClients/detail', {
        data: data.dataValues,

    });
    else res.status(400).json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const user = req.userInfo;
    let obj = {};
    obj.id = id;
    obj.user = user.userid;

    let result = await clientsService
        .delete(obj)
        .catch(err => console.error(err));

    // console.log("delete result :", result)

    if (result) return res.redirect('/disposalClients');
    else res.status(400).json(`fail id:${id}`)
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
                    { ownerName: { [Op.like]: `%${word}%` } },
                    { carNum: { [Op.like]: `%${word}%` } }
                ]
            }
        }
        result = await processService.allRead(condition);
    } catch (err) {
        console.error(err)
    }

    console.log("search result :", result)

    if (result) return res.status(200).json({ user: user, data: result });
    else res.status(400).json(`don't find ${word}`)
}