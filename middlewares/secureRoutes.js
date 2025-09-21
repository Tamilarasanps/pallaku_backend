const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const secureRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.authToken;
    console.log(req.cookies)
    if (!token) {
      const err = new Error("Unauthorized access please log in");
      err.statusCode = 401;
      throw err;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = mongoose.connection.db;
    const user = await db.collection("user").findOne({ _id: new mongoose.Types.ObjectId(decoded.userId) });

    // const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      const err = new Error("Unauthorized access - user not found");
      err.statusCode = 401;
      throw err;
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized Please Login" });
  }
};

module.exports = secureRoute;
