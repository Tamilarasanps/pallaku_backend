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

exports.updateTrip = async (req, res) => {
  try {
    const tripId = req.params.id;
    const form = req.body; // ✅ plain object from frontend

    if (!tripId) {
      return res.status(400).json({ message: "Trip ID is required" });
    }

    const updatedTrip = await bookingService.updateTrip(tripId, form);

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json(updatedTrip); // ✅ send updated trip
  } catch (err) {
    console.error("Error updating trip:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const result = await bookingService.login(username, password);
    if (result) {
      res.cookie("authToken", result.token, {
        httpOnly: true,
        secure: true, // must be true in production
        sameSite: "None", // allows cross-domain cookies
        maxAge: 15 * 60 * 1000,
      });

      res.status(200).json({
        message: "Logged in successfully",
        token: result.token,
        role: result.role,
        userId: result.userId,
        message: result.message,
      });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
