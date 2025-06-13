// routes/distanceRoutes.js

const express = require('express');
const GetDistance = require('../controllers/GetDistance');

const router = express.Router();
console.log('router')

router.get('/', GetDistance);

module.exports = router;
