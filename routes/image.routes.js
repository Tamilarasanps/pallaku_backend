// routes/imageRoutes.js
const express = require("express");
const { getImageById } = require("../controllers/image.controller");
const router = express.Router();

router.get("/:id", getImageById);

module.exports = router;
