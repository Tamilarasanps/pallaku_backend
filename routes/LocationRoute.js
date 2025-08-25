const express = require("express");
const router = express.Router();
const { getSuggestions } = require("../services/Location.services");
const handleError = require("../utils/error.handler");

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const suggestions = await getSuggestions(query);
    res.json({ success: true, data: suggestions });
  } catch (err) {
    handleError(res, err);
  }
});

module.exports = router;