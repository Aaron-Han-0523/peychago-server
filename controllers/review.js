const reviewService = require('../Services/review');
const carInfoService = require('../Services/carInfo');
const supplierUsersService = require('../Services/supplierUsers');
var createError = require('http-errors');

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;

    if (req.api) {
        body.user = user.phoneNum;
        body = Object.assign(user, body);
    }
    else body.user = user.userid;
    // console.log("body :", body);
    // console.log("user :", user);

    let files = req.files;
    // console.log("files :", files);
    if (files) {
        for (let i = 0; i < 3; i++) {
            if (files[i]) body['attachedFilepath' + (i + 1)] = files[i].path;
        }
    }

    // console.log("after body :", body);

    try {
        let result = await reviewService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/review');
    }
    catch (e) {
        console.error(e);
        return res.status(400).json(`add fail : ${e.message}`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - review edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    // console.log("body :", body);

    if (req.api) {
        body.user = user.phoneNum;
        body = Object.assign(user, body);
    }
    else body.user = user.userid;
    body.id = id;

    let files = req.files;
    // console.log("files :", files);
    if (files) {
        for (let i = 0; i < 3; i++) {
            if (files[i]) body['attachedFilepath' + (i + 1)] = files[i].path;
        }
    }

    // console.log("after body :", body);

    let result = await reviewService
        .update(body)
        .catch(err => {
            console.error(err);
            return res.status(400).json(`edit fail : ${err.message}`)
        })
    // console.log('result :', result)

    if (result) res.status(200).redirect(`/review/${id}`);
    else res.status(400).json(`edit fail:${id}`)
}

exports.index = async (req, res, next) => {
    const condition = req.query ? req.query : {};
    console.log("review condition :", condition);

    let data = await reviewService
        .allRead(condition)
        .catch(err => console.error(err));

    console.log("data :", data.rows[0]);

    return req.api ?
        res.status(201).json(data)
        : res.render('review/index', {
            count: data.count,
            data: data.rows,
            user: req.userInfo
        });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await reviewService
        .readOne(id)
        .then((data) => data)
        .catch(err => console.error(err));

    // console.log(data);

    if (data) return req.api ?
        res.status(200).json(data)
        : res.render('review/detail', {
            user: user,
            data: data,
            car: await carInfoService.readOne(data.carInfo_id).then(result => result),
            supplier: await supplierUsersService.readOne(data.supplierUsers_id).then(result => result)
        });
    // else res.status(404).json(`Not found id:${id}`)
    if (req.api) return res.status(404).json(`Not found id:${id}`)
    next(createError(404));
}

exports.delete = async (req, res, next) => {
    const id = req.params.id;
    const user = req.userInfo;
    let body = {};
    body.id = id;
    if (req.api) {
        body.user = user.phoneNum;
        body = Object.assign(user, body);
    }
    else body.user = user.userid;

    let result = await reviewService
        .delete(body)
        .catch(err => {
            console.error(err);
            return res.status(400).json(`add fail : ${err.message}`)
        });

    // console.log("delete result :", result)

    if (result) return res.status(200).redirect('/review');
    else res.status(400).json(`delete fail id:${id}`)
}