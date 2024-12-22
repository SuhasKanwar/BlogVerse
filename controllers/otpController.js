const Users = require('../models/users');
const { sendOTP, generateOTP } = require('../utils/otp');

exports.otpRender = async (req, res) => {
    const user = await Users.findById(req.user._id);

    const otp = generateOTP();

    user.otp = otp.toString();

    user.otpExpiry = Date.now() + 10 * 60 * 1000;

    await Users.findByIdAndUpdate(
        req.user._id, 
        user, 
        { 
          new: true,
          runValidators: true
        }
    );

    await sendOTP(req.user.email, otp);

    return res.render('otp');
};