// routes/distanceRoutes.js

const express = require('express');
const GetDistance = require('../controllers/GetDistance');

const router = express.Router();

router.get('/', GetDistance);

module.exports = router;
