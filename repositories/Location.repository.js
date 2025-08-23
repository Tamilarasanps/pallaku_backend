const axios = require("axios");

const searchLocations = async (query) => {
  const response = await axios.get("https://nominatim.openstreetmap.org/search", {
  params: {
    q: query,
    format: "json",
    addressdetails: 1,
    countrycodes: "in",
    limit: 10,
    viewbox: "76.8,11.25,77.5,10.9", // Tiruppur bounding box
    bounded: 1, // restrict to this area
  },
  headers: {
    "Accept-Language": "en",
  },
});


  return response.data;
};

module.exports = { searchLocations };
