const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

const GetDistance = require("./routes/GetDistanceRoutes");
const PriceListRoutes = require("./routes/PriceListRoutes");
const bookingRoute = require("./routes/bookingRoute");
const bookingRoutes = require("./routes/booking.Routes");
const locationRoutes = require("./routes/LocationRoute");
const adminRoutes = require("./routes/admin.routes");
const vehicleRoutes = require("./routes/vehicle.route");
const imageRoute = require("./routes/image.routes");
const placeRoutes = require("./routes/places.routes");

const connect = require("./db");

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(morgan("dev"));

// DB connection
connect();

// Routes
app.use("/distance", GetDistance);
app.use("/pricelist", PriceListRoutes);
app.use("/conform", bookingRoute);
app.use("/location", locationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/image", imageRoute);
app.use("/api/places", placeRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API!" });
});

app.get("/hello", (req, res) => {
  res.json({ message: "Hello from Lambda + Express!" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// ✅ Use @vendia/serverless-express
const serverlessExpress = require("@vendia/serverless-express");
exports.handler = serverlessExpress({ app });
