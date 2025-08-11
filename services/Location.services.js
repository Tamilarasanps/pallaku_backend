const { searchLocations } = require("../repositories/Location.repository");

const getSuggestions = async (query) => {
  try {
    if (!query || query.length < 3) {
      const error = new Error("Query must be at least 3 characters long");
      error.status = 400;
      throw error;
    }

    const results = await searchLocations(query);

    return results.map((place) => ({
      name: place.display_name,
    }));
  } catch (error) {
    throw new Error("Error fetching location suggestions: " + error.message);
  }
};

module.exports = {
  getSuggestions,
};
