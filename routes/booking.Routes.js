const express = require("express");
const router = express.Router();
const { getAllBookings } = require("../controllers/booking.controller");
const { getBookingById } = require("../controllers/booking.controller");

router.get("/booking/:id", getBookingById);
router.get("/", getAllBookings);

module.exports = router;
