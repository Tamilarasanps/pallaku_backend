const bookingRepo = require("../repositories/booking.repository");

exports.fetchBookingById = async (id) => {
  try {
    const booking = await bookingRepo.getBookingById(id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    return booking;
  } catch (error) {
    throw new Error("Error fetching booking by ID: " + error.message);
  }
};

exports.fetchAllBookings = async () => {
  try {
    const bookings = await bookingRepo.getAllBookings();
    return bookings;
  } catch (error) {
    throw new Error(error.message);
  }
};


exports.updateTrip = async (tripId, data) => {
  try {
    return await bookingRepo.updateTrip(tripId, data);
  } catch (err) {
    console.error("Service error in updateTrip:", err);
    throw err;
  }
};


exports.login = async (username, password) => {
  try {
    const result = await bookingRepo.login(username, password);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.statusUpdate = async (id, payload) => {
  try {
    const updatedBooking = await bookingRepo.statusUpdate(id, payload);
    if (!updatedBooking) throw new Error("Booking not found");
    return updatedBooking;
  } catch (err) {
    throw new Error(err.message);
  }
};

