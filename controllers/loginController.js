const Users = require('../models/users');

exports.loginRender = (req, res) => {
    res.render('login');
}

exports.signupHandler = async (req, res) => {
    const { fullName, userName, email, password } = req.body;
    await Users.create({
        fullName,
        userName,
        email,
        password
    });
    return res.redirect('/');
}

exports.loginHandler = async (req, res) => {
    try{
        const { email, password } = req.body;
        const token = await Users.matchPassword(email, password);
    
        return res.cookie("token", token).redirect('/');
    }
    catch(error){
        return res.redirect('/login');
        // return res.render('/login', {
        //     error: "Incorrect Email or Password"
        // });
    }
}