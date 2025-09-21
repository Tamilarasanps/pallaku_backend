const express = require("express");
const router = express.Router();
const { getAllBookings } = require("../controllers/booking.controller");
const { getBookingById } = require("../controllers/booking.controller");
const { updateTrip } = require("../controllers/booking.controller");
const { login } = require("../controllers/booking.controller");
const secureRoute = require('../middlewares/secureRoutes')

router.get("/booking/:id",  getBookingById);
router.get("/", secureRoute, getAllBookings);
router.put("/update/:id",  updateTrip);
router.post("/adminLogin",  login);

module.exports = router;
