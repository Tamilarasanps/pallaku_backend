const express = require("express");
const router = express.Router();
const placeController = require("../controllers/places.controller");

router.get("/autocomplete", placeController.autocomplete);
router.get("/details", placeController.details);

module.exports = router;
