exports.indexRender = (req, res) => {
    res.render('index', {
        user: req.user
    });
}