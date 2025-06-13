const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const GetDistance = require("./routes/GetDistanceRoutes");
const PriceListRoutes = require("./routes/PriceListRoutes");
const bookingRoute = require('./routes/bookingRoute')

const connect = require("./db");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connect();

// // Attach the router to /api
// app.use("/api", router); // ✅ This line is crucial!

// Sample route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

// API route
app.use("/distance", GetDistance);
app.use("/pricelist", PriceListRoutes);
app.use("/conform", bookingRoute);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
