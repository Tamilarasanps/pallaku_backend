const Booking = require("../models/bookingModel");
const Admin = require("../models/Admin");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getBookingById = async (id) => {
  try {
    const booking = await Booking.findById(id);
    const admin = await Admin.findOne(); // adjust if multiple admins

    return {
      ...booking.toObject(),
      adminPhone: admin?.phone || null,
    };
  } catch (error) {
    throw new Error("Failed to get booking by ID: " + error.message);
  }
};

exports.getAllBookings = async () => {
  try {
    const bookings = await Booking.find({}).populate("vehicle");
    const admin = await Admin.findOne(); // adjust if multiple admins

    return { tripDetails: bookings, adminPhone: admin.mobile };
  } catch (error) {
    throw new Error("Failed to get all bookings: " + error.message);
  }
};

exports.updateTrip = async (tripId, data) => {
  try {
    const updated = await Booking.findByIdAndUpdate(
      tripId,
      { $set: data }, // ✅ ensure only provided fields are updated
      { new: true, runValidators: true } // ✅ return updated doc + validate schema
    );

    return updated;
  } catch (err) {
    console.error("Repo error in updateTrip:", err);
    throw err;
  }
};

exports.login = async (username, password) => {
  try {
    const db = mongoose.connection.db;
    const user = await db.collection("user").findOne({ username });

    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Wrong password");

    // Short-lived token for session
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "15m", // short-lived token
    });

    return {
      token,
      role: user.role,
      userId: user._id,
      message: "Logged in successfully",
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.statusUpdate = async (id, payload) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, payload, {
      new: true, // returns updated document
      runValidators: true,
    });
    return updatedBooking;
  } catch (err) {
    throw new Error(err.message);
  }
};
