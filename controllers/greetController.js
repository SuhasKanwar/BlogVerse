exports.greetRender = (req, res) => {
    return res.render('greet', {
        user: req.user
    });
}