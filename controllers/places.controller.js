const placeService = require("../services/places.services");

exports.autocomplete = async (req, res, next) => {
  try {
    const predictions = await placeService.autocomplete(req.query.input, req.query.sessionToken);
    res.json(predictions);
  } catch (err) {
    next(err);
  }
};

exports.details = async (req, res, next) => {
  try {
    const place = await placeService.getDetails(req.query.placeId, req.query.sessionToken);
    res.json(place);
  } catch (err) {
    next(err);
  }
};
