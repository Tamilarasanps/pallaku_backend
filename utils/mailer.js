const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pallakcab@gmail.com", // replace with your email
    pass: "Jsjsndid28hUhu88snsk", // use Gmail App Password, not real password
  },
});

const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: "pallakcab@gmail.com",
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
