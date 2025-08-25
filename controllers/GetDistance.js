const GetDistanceRepository = require("../repositories/GetDistanceRepository.js");

const GetDistance = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res
        .status(400)
        .json({ message: "Missing 'from' or 'to' query parameters" });
    }

    const distanceData = await GetDistanceRepository(from, to);
    
    return res.status(200).json(distanceData);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = GetDistance;

// router.get("/distance", async (req, res) => {
//   const { from, to } = req.query;

//   if (!from || !to) {
//     return res
//       .status(400)
//       .json({ message: "Missing 'from' or 'to' query params" });
//   }

// });
