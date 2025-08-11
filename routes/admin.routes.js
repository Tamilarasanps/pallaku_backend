// routes/admin.routes.js
const express = require("express");
const router = express.Router();
const { updateMobile } = require("../controllers/admin.controller");

router.put("/mobile", updateMobile);

module.exports = router;
