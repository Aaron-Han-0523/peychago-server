exports.logout = async (req, res, next) => {
    console.log(req.userInfo)
    await res.clearCookie('jwt', {
        httpOnly: true,
        secure: req.app.get('cookie-secure')
    });
    res.redirect('/');
    console.log("logout")
}