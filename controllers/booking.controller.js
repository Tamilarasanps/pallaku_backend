// controllers/booking.controller.js
const bookingService = require("../services/booking.service");

exports.getBookingById = async (req, res) => {
  try {
    const booking = await bookingService.fetchBookingById(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await bookingService.fetchAllBookings();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
