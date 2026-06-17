import express from "express";
const port = process.env.PORT || 5000;
import { connectDB } from "./db/connectDB.js";
import Routrs from "./routes/auth.route.js";
import HotelRouter from "./routes/hotel.route.js";
import packageRouter from "./routes/package.route.js";
import packageBookingRouter from "./routes/packagebooking.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import restaurants from "./routes/restaurants.js";

//import for transport
import flightRoutes from "./routes/flightRoutes.js";
import flightSeatRoutes from "./routes/flightSeatRoutes.js";
import flightBookingRoutes from "./routes/flightBookingRoutes.js";
import trainRoutes from "./routes/trainRoutes.js";
import trainBookingRoutes from "./routes/trainBookingRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import busSeatRoutes from "./routes/busSeatRoutes.js";
import busBookingRoutes from "./routes/busBookingRoutes.js";
import cabRoutes from "./routes/cabRoutes.js";
import cabBookingRoutes from "./routes/cabBookingRoutes.js";
import hotelBookingRoutes from "./routes/hotel.booking.route.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json()); //  allow us to parse incoming request : req.body
// Use cookie-parser middleware
app.use(cookieParser()); // to perse data from one side to other
app.use("/api/auth", Routrs);
//package
app.use("/api/package", packageRouter);
app.use("/api/packagebooking", packageBookingRouter);
// hotelbooking routes
app.use("/api/hotelbooking", hotelBookingRoutes);
app.use("/api/hotel", HotelRouter);
// Mount Routes
app.use("/api", flightRoutes);
app.use("/api", flightSeatRoutes);
app.use("/api", flightBookingRoutes);
app.use("/api", trainRoutes);
app.use("/api", trainBookingRoutes);
app.use("/api", busRoutes);
app.use("/api/bus-seats", busSeatRoutes);
app.use("/api", busBookingRoutes);
app.use("/api", cabRoutes);
app.use("/api/cab-bookings", cabBookingRoutes);
app.use("/api/restaurants", restaurants);

app.listen(port, () => {
  connectDB();
  console.log("Server running on port", port);
});
