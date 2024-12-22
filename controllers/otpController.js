const Users = require("../models/users");
const { sendOTP, generateOTP } = require("../utils/otp");

exports.otpRender = async (req, res) => {
  const user = await Users.findById(req.user._id);

  const otp = generateOTP();

  user.otp = otp.toString();

  user.otpExpiry = Date.now() + 10 * 60 * 1000;

  await Users.findByIdAndUpdate(req.user._id, user, {
    new: true,
    runValidators: true,
  });

  await sendOTP(req.user.email, otp);

  return res.render("otp");
};

exports.otpValidate = async (req, res) => {
  const otpDigit1 = req.body["otp-digit-1"];
  const otpDigit2 = req.body["otp-digit-2"];
  const otpDigit3 = req.body["otp-digit-3"];
  const otpDigit4 = req.body["otp-digit-4"];

  const enteredOTP = otpDigit1 + otpDigit2 + otpDigit3 + otpDigit4;

  const user = await Users.findById(req.user._id);

  if(user.otp !== enteredOTP || user.otpExpiry < Date.now()) {
    return res.render("otp", {
      error: "Invalid OTP or Time Expired",
    });
  }

  if(user.otp === enteredOTP && user.otpExpiry > Date.now()) {
    user.otp = "";
    user.otpExpiry = null;

    await Users.findByIdAndUpdate(req.user._id, user, {
      new: true,
      runValidators: true,
    });

    return res.redirect("/user/reset-password");
  }
};