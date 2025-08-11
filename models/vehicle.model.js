const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  type: { type: String, required: true },
  capacity: { type: String, required: true },
  oneWayPrice: { type: Number, required: true },
  roundTripPrice: { type: Number, required: true },
  options: { type: [String], default: [] },
  img: { type: mongoose.Schema.Types.ObjectId, ref: 'fs.files' },
}, {
  timestamps: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);
module.exports = Vehicle;
