// routes/admin.routes.js
const express = require("express");
const router = express.Router();
const { updateMobile } = require("../controllers/admin.controller");
const secureRoute = require('../middlewares/secureRoutes')


router.put("/mobile",secureRoute, updateMobile);

module.exports = router;
