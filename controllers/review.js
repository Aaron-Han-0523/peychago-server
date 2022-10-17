const reviewService = require('../services/review');
const carInfoService = require('../services/carInfo');
const processService = require('../services/process');
const supplierUsersService = require('../services/supplierUsers');
var createError = require('http-errors');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;

    if (req.api) {
        processInfo = await processService.readOne(user.carNum);
        body.carInfo_id = processInfo.carInfo_id;
        body.createUser = user.clientName;
        body = Object.assign(user, body);
    }
    else body.user = user.userid;
    console.log("body :", body);
    // console.log("user :", user);

    let files = req.files;
    console.log("files :", files);
    if (files) {
        for (let i = 0; i < 3; i++) {
            if (files[i]) body['attachedFilepath' + (i + 1)] = files[i].path;
        }
    }

    // console.log("after body :", body);

    try {
        let result = await reviewService.create(body);
        // console.log("result :",result);
        return req.api ?
            res.status(201).end()
            : res.status(201).redirect('/review');
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

    const target = await reviewService.readOne(id).catch(err => {
        return res.status(403).json(err);
    });
    // console.log("target :", target);
    if (req.api) {
        if (user.clients_id != target.clients_id) return res.status(403).json("작성자가 아닙니다.")
        processInfo = await processService.readOne(user.carNum);
        body.carInfo_id = processInfo.carInfo_id;
        body.createUser = user.clientName;
        body = Object.assign(user, body);
    }
    else body.user = user.userid;

    // console.log("body :", body);

    body.id = id;
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

    await reviewService
        .update(body)
        .catch(err => {
            console.error(err);
            return res.status(400).json(`edit fail : ${err.message}`)
        })

    return req.api ?
        res.status(200).end()
        : res.status(200).redirect(`/review/${id}`);
}

exports.index = async (req, res, next) => {
    const page = req.query.p ? req.query.p : 1;
    const word = req.query.q;
    const skip = +req.query.skip;
    const limit = +req.query.limit;

    let paging = {
        skip: skip ? skip : (page - 1) * 10,
        limit: limit ? limit : 10
    }
    let condition = word ?
        {
            [Op.or]: [
                { title: { [Op.like]: `%${word}%` } },
                { content: { [Op.like]: `%${word}%` } }
            ]
        }
        : {}
    if(req.query.carInfo_id) condition.carInfo_id = req.query.carInfo_id;
    // console.log("review condition :", condition);
    // console.log("review paging :", paging);

    let data = await reviewService
        .allRead(condition, paging)
        .catch(err => console.error(err));

    console.log("data :", data);

    return req.api ?
        res.status(200).json(data)
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

    const target = await reviewService.readOne(id);
    console.log("target :", target);
    if (!target) next(createError(404));

    if (req.api) {
        if (user.clients_id != target.clients_id) return res.status(403).json("작성자가 아닙니다.")
    }

    let body = {};
    body.id = id;
    if (req.api) {
        body.user = user.phoneNum;
        body = Object.assign(user, body);
    }
    else body.user = user.userid;

    await reviewService
        .delete(body)
        .catch(err => {
            console.error(err);
            return res.status(400).json(`add fail : ${err.message}`)
        });

    // console.log("delete result :", result)

    return req.api ?
        res.status(200).end()
        : res.status(200).redirect(`/review/${id}`);
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
                    { title: { [Op.like]: `%${word}%` } },
                    { content: { [Op.like]: `%${word}%` } }
                ]
            }
        }
        result = await reviewService.allRead(condition);
    } catch (err) {
        console.error(err)
    }

    console.log("search result :", result)

    if (result) return res.status(200).json({ user: user, data: result });
    else res.status(400).json(`don't find ${word}`)
}