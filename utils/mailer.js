const { Resend } = require('resend');
require('dotenv').config();

const resend = new Resend(process.env.RESEND_API_KEY);

const sendMail = async (to, subject, text) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM, // e.g. 'Your Name <you@yourdomain.com>'
      to,
      subject,
      text,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, message: 'Booking successful', info: data };
  } catch (err) {
    throw new Error(`Failed to send booking email: ${err.message}`);
  }
};

module.exports = sendMail;
