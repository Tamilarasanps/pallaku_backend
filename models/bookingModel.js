const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  capacity: { type: String, required: true },
  options: { type: Array, required: true },
});

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  tripType: { type: String, required: true },
  pickupTime: { type: String, required: true },
  vehicle: vehicleSchema,   
  totalKms: { type: Number, required: true },
  baseFair: { type: Number, required: true },
  tollCharge: { type: Number, default: 0 },
  driverAllowance: { type: Number, default: 0 },
  permitCharges: { type: Number, default: 0 },
  totalFare: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
