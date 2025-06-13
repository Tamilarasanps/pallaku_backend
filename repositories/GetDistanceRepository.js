const axios = require("axios");

// const GetDistanceRepository = async (from, to) => {
//   const apikey = process.env.GOOGLE_API_KEY; // ✅ move this inside the function
//   console.log("Google API Key:", apikey);

//   if (!apikey) {
//     throw new Error("Google API Key is not defined in environment variables");
//   }

//   try {
//     const response = await axios.get(
//       "https://maps.googleapis.com/maps/api/distancematrix/json",
//       {
//         params: {
//           origins: from,
//           destinations: to,
//           key: apikey,
//         },
//       }
//     );

//     const data = response.data;

//     if (data.status !== "OK") {
//       throw new Error("Google API error");
//     }

//     const distanceInfo = data.rows[0].elements[0];
//     if (distanceInfo.status !== "OK") {
//       throw new Error("Invalid location");
//     }

//     return {
//       from,
//       to,
//       distanceText: distanceInfo.distance.text,
//       distanceValue: distanceInfo.distance.value,
//       durationText: distanceInfo.duration.text,
//       durationValue: distanceInfo.duration.value,
//     };
//   } catch (error) {
//     throw new Error(error.message || "Unknown error from Google API");
//   }
// };

// const axios = require("axios");

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
      tolls: route.travelAdvisory?.tollInfo?.estimatedPrice || [],
      polyline: route.polyline?.encodedPolyline,
      steps: leg.steps,
    };
  } catch (error) {
    console.error("Route fetch error:", error.response?.data || error.message);
    return null;
  }
};

module.exports = GetDistanceRepository;


// // Example:
// getTollEstimate(
//   { latitude: 10.7905, longitude: 78.7047 }, // Example: Trichy
//   { latitude: 13.0827, longitude: 80.2707 }  // Example: Chennai
// );

// module.exports = GetDistanceRepository;
