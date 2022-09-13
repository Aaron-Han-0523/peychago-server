const imageSettingService = require('../Services/imageSetting');

exports.edit = async function (req, res) {
    console.log('edit image')
    // let boardId = "";
    // await models.board.create(req.body)
    //   .then(result => {
    //     console.log('내용 추가 완료');
    //     boardId = result.id
    //     res.redirect("/board");
    //   })
    //   .catch(err => {
    //     console.log("내용 추가 실패");
    //     console.log(err)
    //   })
    const fileInfo = req.file;
    console.log(req.file);
    if (req.file) {
        await imageSettingService
            .update({
                noticeImage: fileInfo.path
            })
            .then(result => {
                // console.log(result)
                console.log('파일 추가 완료');
            })
            .catch(err => {
                console.log("파일 추가 실패");
                console.log(err)
            })
    };
    return res.redirect('/imageSetting')
}

exports.index = async (req, res, next) => {

}

exports.detail = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {

}