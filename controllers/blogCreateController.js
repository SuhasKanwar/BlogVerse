exports.blogCreateRender = (req, res) => {
    return res.render('blogCreate', {
        user: req.user
    });
};

exports.blogCreateHandler = (req, res) => {
}