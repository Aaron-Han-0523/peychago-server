const noticeService = require('../Services/notice');

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;
    body.user = user.userid;
    
    try {
        let result = await noticeService.create(body);
        // console.log("result :",result);
        return res.status(201).redirect('/notice');
    }
    catch (e) {
        console.error(e);
        return res.json(`add fail`)
    }
}

exports.edit = async (req, res, next) => {
    // console.log("put - notice edit")
    const user = req.userInfo;
    const id = req.params.id;
    let body = req.body;
    body.user = user.userid;
    body.id = id;

    let result = await noticeService
        .update(body)
        .catch(err => console.error(err));

    // console.log('result :', result)

    if (result) res.redirect(`/notice/${id}`);
    else res.json(`fail id:${id}`)
}

exports.index = async (req, res, next) => {
    let datas = await noticeService
        .allRead()
        .catch(err => console.error(err));

    // console.log("datas :", datas);

  return res.render('notice/index', {
        count: datas.count,
        datas: datas.rows
    });
}

exports.detail = async (req, res, next) => {
    const id = req.params.id;
    console.log(`open one data id-${id}`)

    const user = req.userInfo;
    let data = await noticeService
        .readOne(id)
        .catch(err => console.error(err));

    // console.log(data);

    if (data) return res.json({
        render: `(notice/${id})`,
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

    let result = await noticeService
        .delete(obj)
        .catch(err => console.error(err));

    // console.log("delete result :", result)

    if (result) return res.redirect('/notice');
    else res.json(`fail id:${id}`)
}