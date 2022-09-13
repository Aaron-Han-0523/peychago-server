exports.logout = async (req, res, next) => {
    await res.cookie('jwt', '', {
        httpOnly: true,
        secure: req.app.get('cookie-secure')
    });
    res.redirect('/');
    console.log("logout")
}