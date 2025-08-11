const express = require("express");
const router = express.Router();
const { getAllBookings } = require("../controllers/booking.controller");

router.get("/", getAllBookings);

module.exports = router;
