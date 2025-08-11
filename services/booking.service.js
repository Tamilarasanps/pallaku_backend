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
    throw new Error("Error fetching all bookings: " + error.message);
  }
};
