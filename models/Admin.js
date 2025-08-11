// models/Admin.js
const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  mobile: { type: String, required: true },
});

module.exports = mongoose.model("Admin", adminSchema);
