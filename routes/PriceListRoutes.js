const express = require("express");
const GetPriceList = require("../controllers/PriceListController");

const router = express.Router();

router.get("/", GetPriceList);
 
module.exports = router;
