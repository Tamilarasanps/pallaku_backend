const { handleBooking } = require("../repositories/bookingRepo");
const { sendTelegramMessage } = require("../services/Telegram.service");

const confirmBooking = async (req, res) => {
  const bookingData = req.body;

  try {
    const result = await handleBooking(bookingData);

    const message = `
📅 *New Booking!*
From: ${bookingData.from}
To: ${bookingData.to}
Trip Type: ${bookingData.tripType}
Vehicle: ${bookingData.vehicle?.type} (${bookingData.vehicle?.capacity} seats)
Total KM: ${bookingData.totalKms}
Pick up Time: ${bookingData.departureDate}, ${bookingData.pickupTime}
Total Amount: ${bookingData.totalFare}
Name: ${bookingData.name}
Phone: ${bookingData.mobile}
Email: ${bookingData.email}
    `;

    await sendTelegramMessage(message);

    res.status(200).json({
      message: "Booking confirmed and email sent.",
      newBooking: result,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to confirm booking" });
  }
};

module.exports = { confirmBooking };
