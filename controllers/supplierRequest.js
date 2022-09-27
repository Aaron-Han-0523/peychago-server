const supplierRequestService = require('../services/supplierRequest');
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;
    body.user = user.userid;

    try {
        let result = await supplierRequestService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/supplierRequest');
    }
    catch (e) {
        console.error(e);
        return res.status(400).json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - supplierRequest edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    body.user = user.userid;
    body.id = id;

    let result = await supplierRequestService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.redirect(`/supplierRequest/${id}`);
    else res.status(400).json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {

    let query = `
    select supplier.companyName, req.* from supplierrequest req
    left join supplierusers supplier
    on req.supplierUsers_id=supplier.supplierUsers_id
    order by supplierUsers_id desc;
    `
    const data = await models.sequelize.query(query)
        .then(function (results, metadata) {
            // 쿼리 실행 성공
            return results[0];
        })
        .catch(function (err) {
            // 쿼리 실행 에러 
            console.error(err);
        });

    console.log("data :", data);

    return res.render('supplierRequest/index', {
        count: data.length,
        data: data,
        user: req.userInfo
    });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await supplierRequestService
        .readOne(id)
        .catch(err => console.error(err));

    // console.log(data);

    if (data) return res.json({
        render: `(supplierRequest/${id})`,
        data: data.dataValues
    });
    else res.status(400).json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const user = req.userInfo;
    let obj = {};
    obj.id = id;
    obj.user = user.userid;

    let result = await supplierRequestService
        .delete(obj)
        .catch(err => console.error(err));

    // console.log("delete result :", result)

    if (result) return res.redirect('/supplierRequest');
    else res.status(400).json(`fail id:${id}`)
}