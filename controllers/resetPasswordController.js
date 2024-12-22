const Users = require('../models/users');

exports.resetPasswordRender = (req, res) => {
    return res.render('reset-password');
}

exports.resetPasswordHandler = async (req, res) => {
    try {
        const user = await Users.findById(req.user._id);
        const { newPassword, confirmPassword } = req.body;
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        } else {
            user.password = newPassword;
            user.save();
            return res.redirect('/user/logout');
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}