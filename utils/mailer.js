const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karthikw2l@gmail.com",         // replace with your email
    pass: "hxur erhc fvdz uqli",           // use Gmail App Password, not real password
  },
});

const sendMail = async (to, subject, text) => {

  const mailOptions = {
    from: 'karthikw2l@gmail.com',
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "OTP sent to email successfully" };
  } catch (err) {
    return { success: false, error: err.message };
  }
};

module.exports = sendMail;
