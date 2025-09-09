const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for 587
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});
const sendMail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to,
    subject,
    text,
  };

  try {

    const info = await transporter.sendMail(mailOptions);
  
    return { success: true, message: "booking successful", info };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = sendMail;
