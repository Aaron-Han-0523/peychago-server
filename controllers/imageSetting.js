const imageSettingService = require('../Services/imageSetting');
const path = require("path");

exports.edit = async function (req, res) {
    const body = req.body;
    // console.log('req :',req)
    // console.log('edit', body);

    const fieldName = req.url.slice(1);
    console.log('fieldName :',fieldName);
    if (!body[fieldName]) body[fieldName] = '';

    const file = req.file;
    console.log(file);

    if (file) {
        body[file.fieldname] = file.path;
    }

    await imageSettingService
        .update(body)
        .then(result => {
            // console.log(result)
            console.log('imageSetting complete');
        })
        .catch(err => {
            console.log("imageSetting fail");
        })
    return res.redirect('/imageSetting/#'+fieldName)
}

exports.index = async (req, res, next) => {

}

exports.detail = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {

}