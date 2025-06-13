const { sendBookingEmail } = require("../repositories/bookingRepo");

const confirmBooking = async (req, res) => {
  const bookingData = req.body;

  try {
    await sendBookingEmail(bookingData);
    res.status(200).json({ message: "Booking confirmed and email sent." });
  } catch (err) {
    console.error("Booking confirmation error:", err);
    res.status(500).json({ error: "Failed to confirm booking" });
  }
};

module.exports = { confirmBooking };
