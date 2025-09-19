const { nanoid } = require("nanoid");
const { handleBooking } = require("../repositories/bookingRepo");
const { sendTelegramMessage } = require("../services/Telegram.service");

const confirmBooking = async (req, res) => {
  function generateBookingId() {
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, ""); // YYMMDD
    const randomPart = nanoid(8).toUpperCase(); // 8-character random ID
    return `BK-${datePart}-${randomPart}`;
  }

  const bookingId = generateBookingId();
  let bookingData = req.body;
  bookingData.bookingId = bookingId;

  try {
    const result = await handleBooking(bookingData);
    console.log("bookingData : ", bookingData);

    const formatedDate = bookingData.departureDate.split("T")[0];
    console.log("formatedDate :", formatedDate);
    const message = `
📅 *New Booking!*

BookingId: ${bookingId}
From: ${bookingData.from}
To: ${bookingData.to}
Trip Type: ${bookingData.tripType}
Vehicle: ${bookingData.vehicle?.type} (${bookingData.vehicle?.capacity} seats)
Total KM: ${bookingData.totalKms}
Pick up Time: ${formatedDate}, ${bookingData.pickupTime}
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
    console.log(err);
    res.status(500).json({ error: "Failed to confirm booking" });
  }
};

module.exports = { confirmBooking };
