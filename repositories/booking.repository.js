const Booking = require("../models/bookingModel");
const Admin = require("../models/Admin");

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
        const bookings = await Booking.find({});
        const admin = await Admin.findOne(); // adjust if multiple admins

        return ({ tripDetails: bookings, adminPhone: admin.mobile });
    } catch (error) {
        throw new Error("Failed to get all bookings: " + error.message);
    }
};
