const Booking = require("../models/bookingModel");
const sendMail = require("../utils/mailer");

const sendBookingEmail = async (data) => {
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

  await sendMail(data.email, subject, text);
};

const handleBooking = async (data) => {
  const booking = new Booking(data);

  const saved = await booking.save();

  await sendBookingEmail(data);

  return saved;
};

module.exports = { handleBooking };
