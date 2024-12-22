const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

exports.generateOTP = () => {
  return crypto.randomBytes(2).toString('hex');
};

exports.sendOTP = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: 'Your OTP for Password Change',
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  };

  console.log("Sending email to:", email);
  return transporter.sendMail(mailOptions)
    .then(info => {
      console.log("Email sent:", info.response);
    })
    .catch(error => {
      console.error("Error sending email:", error);
    });
};