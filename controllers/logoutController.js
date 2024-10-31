exports.logoutHandler = (req, res) => {
    res.clearCookie("token").redirect('/login');
}