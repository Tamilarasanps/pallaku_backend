const placeRepo = require("../repositories/places.repository");

exports.autocomplete = async (input, sessionToken) => {
  return placeRepo.autocomplete(input, sessionToken);
};

exports.getDetails = async (placeId, sessionToken) => {
  return placeRepo.getDetails(placeId, sessionToken);
};
