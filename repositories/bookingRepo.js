const Booking = require("../models/bookingModel");
const sendMail = require("../utils/mailer");

const sendBookingEmail = async (data) => {
  const subject = "New Booking Confirmation";
  const text = `
    Name: ${data.name}
    Mobile: ${data.mobile}
    Email: ${data.email}
    From: ${data.from}
    To: ${data.to}
    Pickup Time: ${data.pickupTime}
    Vehicle: ${data.vehicle?.type || "-"} (${data.vehicle?.capacity || 0} seats)
    Total KMs: ${data.totalKms}
    Base Fare: ₹${data.baseFair}
    Toll Charge: ₹${data.tollCharge}
    Driver Allowance: ₹${data.driverAllowance}
    Permit Charges: ₹${data.permitCharges}
    Total Fare: ₹${data.totalFare}
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
