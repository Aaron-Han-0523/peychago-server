const supplierUsersService = require('../Services/supplierUsers');

exports.add = async (req, res, next) => {
    const user = req.userInfo;
    let body = req.body;
    body.user = user.userid;
    
    try {
        let result = await supplierUsersService.create(body);
        // console.log("result :",result);
        return res.redirect('/supplierUsers');
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