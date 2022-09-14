const reviewService = require('../Services/review');
const carInfoService = require('../Services/carInfo');
const supplierUsersService = require('../Services/supplierUsers');

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;
    body.user = user.userid;
    let files = req.files;
    // console.log("body :", body);
    // console.log("files :", files);

    for (let i = 0; i < 3; i++) {
        if (files[i]) body['attachedFilepath' + (i + 1)] = files[i].path;
    }
    console.log("body :", body);

    try {
        let result = await reviewService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/review');
    }
    catch (e) {
        console.error(e);
        return res.json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - review edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    console.log("body :", body);

    body.user = user.userid;
    body.id = id;

    let files = req.files;
    console.log("files :", files);

    if (files) {
        for (let i = 0; i < 3; i++) {
            if (files[i]) body['attachedFilepath' + (i + 1)] = files[i].path;
        }
    }
    console.log("after body :", body);

    let result = await reviewService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.redirect(`/review/${id}`);
    else res.json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
    let datas = await reviewService
        .allRead()
        .catch(err => console.error(err));

    console.log("datas :", datas.rows[0]);

    return res.render('review/index', {
        count: datas.count,
        datas: datas.rows,
        user: req.userInfo
    });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await reviewService
        .readOne(id)
        .then((data) => data.dataValues)
        .catch(err => console.error(err));

    // console.log(data);

    if (data) return res.render('review/detail', {
        user: user,
        data: data,
        car: await carInfoService.readOne(data.carInfo_id).then(result => result.dataValues),
        supplier: await supplierUsersService.readOne(data.supplierUsers_id).then(result => result.dataValues)
    });
    else res.status(404).json(`fail id:${id}`)
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const user = req.userInfo;
    let obj = {};
    obj.id = id;
    obj.user = user.userid;

    let result = await reviewService
        .delete(obj)
        .catch(err => console.error(err));

    // console.log("delete result :", result)

    if (result) return res.redirect('/review');
    else res.json(`fail id:${id}`)
}