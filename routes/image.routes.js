// routes/imageRoutes.js
const express = require("express");
const { getImageById } = require("../controllers/image.controller");
const router = express.Router();

console.log('route reached')
router.get("/:id", getImageById);

module.exports = router;
