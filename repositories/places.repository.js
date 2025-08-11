const {Client} = require("@googlemaps/google-maps-services-js");
const client = new Client();

const apiKey = process.env.GOOGLE_API_KEY;

exports.autocomplete = async (input, sessionToken) => {
  const res = await client.placeAutocomplete({
    params: { input, key: apiKey, sessiontoken: sessionToken },
    timeout: 1000,
  });
  return res.data.predictions;
};

exports.getDetails = async (placeId, sessionToken) => {
  const res = await client.placeDetails({
    params: {
      place_id: placeId,
      key: apiKey,
      sessiontoken: sessionToken,
      fields: ["formatted_address", "geometry"],
    },
    timeout: 1000,
  });
  return res.data.result;
};
