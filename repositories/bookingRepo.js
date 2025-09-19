const Booking = require("../models/bookingModel");
const sendMail = require("../utils/mailer");

const sendBookingEmail = async (data) => {
  const formatedDate = data.departureDate.split("T")[0];
  console.log("departureDate :", formatedDate);
  console.log("data :", data);
  const subject = "Your Booking Confirmation – Thank You for Choosing Us!";
  const text = `
Dear ${data.name},

Thank you for booking with us! Here are your booking details:

Booking Details:
------------------------
Name: ${data.name}
Mobile: ${data.mobile}
Email: ${data.email}
From: ${data.from}
To: ${data.to}
Pickup Time: ${data.pickupTime}
Pickup Date: ${formatedDate}

Vehicle Details:
------------------------
Type: ${data.vehicle?.type || "-"}
Capacity: ${data.vehicle?.capacity || 0} Seats

Fare Details:
------------------------
Total KMs: ${data.totalKms}
Base Fare: ₹${data.baseFair}
Toll Charges: ₹${data.tollCharge}
Driver Allowance: ₹${data.driverAllowance}
Permit Charges: ₹${data.permitCharges}
------------------------
Total Fare: ₹${data.totalFare}

Our driver will contact you shortly for further details.  
Thank you for choosing our services. We look forward to serving you again!

For any queries, please contact us call us at +91-7871237890.

Warm regards,  
[Shree Pallak Cabs]
  `;

  try {
    const result = await sendMail(data.email, subject, text);
    return result;
  } catch (err) {
    throw new Error("Failed to send booking email: " + err.message);
  }
};

const handleBooking = async (data) => {
  try {
    const booking = new Booking(data);
    const saved = await booking.save();

    try {
      await sendBookingEmail(data);
    } catch (emailErr) {
      console.error("Booking saved but email failed:", emailErr);
      throw new Error(emailErr);
      // Optionally, you can return partial success info
    }

    return saved;
  } catch (err) {
    console.error("Error creating booking:", err);
    throw new Error("Failed to complete booking: " + err.message);
  }
};

module.exports = { handleBooking };
