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

    Vehicle: ${data.vehicle?.type || "-"} (${data.vehicle?.capacity} seats)

    Total KMs: ${data.totalKms}
    Base Fare: ₹${data.baseFair}
    Toll Charge: ₹${data.tollCharge}
    Driver Allowance: ₹${data.driverAllowance}
    Permit Charges: ₹${data.permitCharges}
    Total Fare: ₹${data.totalFare}
  `;

  await sendMail(data.email, subject, text); // update this email
};

module.exports = { sendBookingEmail };
