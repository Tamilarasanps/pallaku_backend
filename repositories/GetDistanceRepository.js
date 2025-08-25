const axios = require("axios");

// Step 1: Convert place name to lat/lng
const getLatLng = async (place) => {
  const API_KEY = process.env.GOOGLE_API_KEY;

  const res = await axios.get("https://maps.googleapis.com/maps/api/geocode/json", {
    params: {
      address: place,
      key: API_KEY,
    },
  });

  if (res.data.status !== "OK") throw new Error(`Geocoding failed for ${place}`);

  const { lat, lng } = res.data.results[0].geometry.location;
  return { latitude: lat, longitude: lng }; // Use Google Routes format
};

// Step 2: Use lat/lng to compute route details
const GetDistanceRepository = async (originPlace, destinationPlace) => {
  const API_KEY = process.env.GOOGLE_API_KEY;

  try {
    // Convert origin and destination to coordinates
    const origin = await getLatLng(originPlace);
    const destination = await getLatLng(destinationPlace);

    const payload = {
      origin: { location: { latLng: origin } },
      destination: { location: { latLng: destination } },
      travelMode: "DRIVE",
      extraComputations: ["TOLLS"],
      routeModifiers: {
        vehicleInfo: {
          emissionType: "GASOLINE",
        },
      },
      languageCode: "en-US",
    };

    const headers = {
      "X-Goog-Api-Key": API_KEY,
      "X-Goog-FieldMask": [
        "routes.legs.duration",
        "routes.legs.distanceMeters",
        "routes.polyline.encodedPolyline",
        "routes.travelAdvisory.tollInfo.estimatedPrice",
        "routes.legs.steps",
      ].join(","),
    };

    const res = await axios.post(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      payload,
      { headers }
    );

    const route = res.data.routes[0];
    const leg = route.legs[0];


    return {
      origin: originPlace,
      destination: destinationPlace,
      distanceMeters: leg.distanceMeters/1000,
      duration: leg.duration,
      tolls: route.travelAdvisory?.tollInfo?.estimatedPrice || '',
      polyline: route.polyline?.encodedPolyline,
      steps: leg.steps,
      apiKey: API_KEY,
    };
  } catch (error) {
    return null;
  }
};

module.exports = GetDistanceRepository;


