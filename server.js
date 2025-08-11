const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const GetDistance = require("./routes/GetDistanceRoutes");
const PriceListRoutes = require("./routes/PriceListRoutes");
const bookingRoute = require('./routes/bookingRoute')
const bookingRoutes = require("./routes/booking.Routes")
const locationRoutes = require("./routes/LocationRoute");
const adminRoutes = require("./routes/admin.routes");
const vehicleRoutes = require("./routes/vehicle.route");
const imageRoute = require('./routes/image.routes')
const placeRoutes = require('./routes/places.routes')


const connect = require("./db");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: "*", // or set your frontend IP
}));

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
app.use("/location", locationRoutes);

app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use("/image", imageRoute);
app.use("/api/places", placeRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
