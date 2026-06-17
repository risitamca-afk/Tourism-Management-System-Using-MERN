// import React, { useEffect, useState } from "react";
// import { useAuthStore } from "../store/auth.store";
// import { motion } from "framer-motion";
// import { formatDate } from "../utils/date";
// import axios from "axios";

// const DashboardPage = () => {
//   const { user, logout } = useAuthStore();
//   const [hotelBookings, setHotelBookings] = useState([]);

//   const fetchHotelBookings = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:5000/api/hotelbooking/all-hotel-bookings"
//       );
//       const userBookings = res.data.filter((b) => b.username === user.name);
//       setHotelBookings(userBookings);
//     } catch (err) {
//       console.error("Failed to fetch hotel bookings:", err);
//     }
//   };

//   useEffect(() => {
//     fetchHotelBookings();
//   }, [user.name]);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       await axios.delete(
//         `http://localhost:5000/api/hotelbooking/deletehotel-booking/${bookingId}`
//       );
//       setHotelBookings((prev) => prev.filter((b) => b._id !== bookingId));
//     } catch (err) {
//       console.error("Failed to cancel booking:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-2xl w-full mx-auto mt-10 p-8 bg-gray-400 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center bg-[#0000ff] text-transparent bg-clip-text">
//           Dashboard
//         </h2>

//         {/* Profile Info */}
//         <div className="space-y-6">
//           <motion.div
//             className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h3 className="text-xl font-semibold text-blue-300 mb-3">
//               Profile Information
//             </h3>
//             <p className="text-gray-300">Name: {user.name}</p>
//             <p className="text-gray-300">Email: {user.email}</p>
//           </motion.div>

//           {/* Account Activity */}
//           <motion.div
//             className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <h3 className="text-xl font-semibold text-blue-300 mb-3">
//               Account Activity
//             </h3>
//             <p className="text-gray-300">
//               <span className="font-bold">Joined:</span>{" "}
//               {new Date(user.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//             <p className="text-gray-300">
//               <span className="font-bold">Last Login:</span>{" "}
//               {formatDate(user.lastLogin)}
//             </p>
//           </motion.div>

//           {/* Hotel Bookings */}
//           {hotelBookings.length > 0 && (
//             <motion.div
//               className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6 }}
//             >
//               <h3 className="text-xl font-semibold text-blue-300 mb-3">
//                 Hotel Bookings
//               </h3>
//               {hotelBookings.map((booking, index) => (
//                 <div key={index} className="my-3 text-gray-300">
//                   <p>
//                     <strong>Hotel:</strong> {booking.hotelName}
//                   </p>
//                   <p>
//                     <strong>Place:</strong> {booking.Place}
//                   </p>
//                   <p>
//                     <strong>Room Type:</strong> {booking.roomType}
//                   </p>
//                   <p>
//                     <strong>Room Count:</strong> {booking.roomCount}
//                   </p>
//                   <p>
//                     <strong>Check-in:</strong>{" "}
//                     {new Date(booking.checkInDate).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Check-out:</strong>{" "}
//                     {new Date(booking.checkOutDate).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Payment ID:</strong> {booking.paymentId}
//                   </p>
//                   <button
//                     onClick={() => handleCancelBooking(booking._id)}
//                     className="mt-3 inline-block px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-300"
//                   >
//                     Cancel Booking
//                   </button>
//                 </div>
//               ))}
//             </motion.div>
//           )}

//           {/* Logout Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8 }}
//             className="mt-4"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="w-full py-3 px-4 bg-[#0000ff] text-white font-bold rounded-lg shadow-lg hover:from-[#0000ff] hover:to-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//             >
//               Logout
//             </motion.button>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default DashboardPage;

// import React, { useEffect, useState } from "react";
// import { useAuthStore } from "../store/auth.store";
// import { motion } from "framer-motion";
// import { formatDate } from "../utils/date";
// import axios from "axios";

// const DashboardPage = () => {
//   const { user, logout } = useAuthStore();

//   const [hotelBookings, setHotelBookings] = useState([]);
//   const [flightBookings, setFlightBookings] = useState([]);
//   const [trainBookings, setTrainBookings] = useState([]);
//   const [busBookings, setBusBookings] = useState([]);
//   const [cabBookings, setCabBookings] = useState([]);
//   const [packageBookings, setPackageBookings] = useState([]);

//   useEffect(() => {
//     const fetchAllBookings = async () => {
//       try {
//         const [hotels, flights, trains, buses, cabs, package1] =
//           await Promise.all([
//             axios.get(
//               "http://localhost:5000/api/hotelbooking/all-hotel-bookings"
//             ),
//             axios.get(
//               "http://localhost:5000/api/packagebooking/all-package-bookings"
//             ),
//             axios.get("http://localhost:5000/api/flight-bookings"),
//             axios.get("http://localhost:5000/api/train-bookings"),
//             axios.get("http://localhost:5000/api/bus-bookings"),
//             axios.get("http://localhost:5000/api/cab-bookings"),
//           ]);

//         setHotelBookings(hotels.data.filter((b) => b.username === user.name));
//         setPackageBookings(package1.data.filter((b) => b.user === user.name));

//         setFlightBookings(flights.data.filter((b) => b.username === user.name));
//         setTrainBookings(trains.data.filter((b) => b.username === user.name));
//         setBusBookings(buses.data.filter((b) => b.username === user.name));
//         setCabBookings(cabs.data.filter((b) => b.username === user.name));
//       } catch (err) {
//         console.error("Failed to fetch bookings:", err);
//       }
//     };

//     fetchAllBookings();
//   }, [user.name]);

//   const handleCancelBooking = async (bookingId, bookingType = "hotel") => {
//     const endpoints = {
//       hotel: `http://localhost:5000/api/hotelbooking/deletehotel-booking/${bookingId}`,
//       package1: `http://localhost:5000/api/packagebooking/all-package-bookings/deletepackage-booking/${bookingId}`,
//       flight: `http://localhost:5000/api/flight-bookings/${bookingId}`,
//       train: `http://localhost:5000/api/train-bookings/${bookingId}`,
//       bus: `http://localhost:5000/api/bus-bookings/${bookingId}`,
//       cab: `http://localhost:5000/api/cab-bookings/${bookingId}`,
//     };

//     try {
//       await axios.delete(endpoints[bookingType]);
//       if (bookingType === "hotel") {
//         setHotelBookings((prev) => prev.filter((b) => b._id !== bookingId));
//       } else if (bookingType === "flight") {
//         setFlightBookings((prev) =>
//           prev.filter((b) => b.flightId !== bookingId)
//         );
//       } else if (bookingType === "train") {
//         setTrainBookings((prev) => prev.filter((b) => b.trainId !== bookingId));
//       } else if (bookingType === "bus") {
//         setBusBookings((prev) => prev.filter((b) => b.BusId !== bookingId));
//       } else if (bookingType === "cab") {
//         setCabBookings((prev) => prev.filter((b) => b.CabId !== bookingId));
//       } else if (bookingType === "package1") {
//         setPackageBookings((prev) => prev.filter((b) => b._id !== bookingId));
//       }
//     } catch (err) {
//       console.error("Failed to cancel booking:", err);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-3xl w-full mx-auto mt-10 p-8 bg-gray-400 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
//       >
//         <h2 className="text-3xl font-bold mb-6 text-center bg-[#0000ff] text-transparent bg-clip-text">
//           Dashboard
//         </h2>

//         <div className="space-y-6">
//           {/* Profile Info */}
//           <motion.div
//             className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           >
//             <h3 className="text-xl font-semibold text-blue-300 mb-3">
//               Profile Information
//             </h3>
//             <p className="text-gray-300">Name: {user.name}</p>
//             <p className="text-gray-300">Email: {user.email}</p>
//           </motion.div>

//           {/* Account Activity */}
//           <motion.div
//             className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4 }}
//           >
//             <h3 className="text-xl font-semibold text-blue-300 mb-3">
//               Account Activity
//             </h3>
//             <p className="text-gray-300">
//               <strong>Joined:</strong>{" "}
//               {new Date(user.createdAt).toLocaleDateString("en-US", {
//                 year: "numeric",
//                 month: "long",
//                 day: "numeric",
//               })}
//             </p>
//             <p className="text-gray-300">
//               <strong>Last Login:</strong> {formatDate(user.lastLogin)}
//             </p>
//           </motion.div>

//           {/* Booking Sections */}
//           {[
//             {
//               data: hotelBookings,
//               title: "🏨 Hotel Bookings",
//               type: "hotel",
//               render: (b) => (
//                 <>
//                   <p>
//                     <strong>Hotel:</strong> {b.hotelName}
//                   </p>
//                   <p>
//                     <strong>Place:</strong> {b.Place}
//                   </p>
//                   <p>
//                     <strong>Room Type:</strong> {b.roomType}
//                   </p>
//                   <p>
//                     <strong>Room Count:</strong> {b.roomCount}
//                   </p>
//                   <p>
//                     <strong>Check-in:</strong>{" "}
//                     {new Date(b.checkInDate).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Check-out:</strong>{" "}
//                     {new Date(b.checkOutDate).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Payment ID:</strong> {b.paymentId}
//                   </p>
//                 </>
//               ),
//             },
//             {
//               data: packageBookings,
//               title: "🚖 Package Bookings",
//               type: "package1",
//               render: (b) => (
//                 <>
//                   <p>
//                     <strong>User:</strong> {b.user}
//                   </p>
//                   <p>
//                     <strong>Package ID:</strong> {b.packageId}
//                   </p>
//                   <p>
//                     <strong>Type:</strong> {b.type}
//                   </p>

//                   {b.type === "withFlight" && b.flightInfo && (
//                     <>
//                       <p>
//                         <strong>Flight No:</strong> {b.flightInfo.flightNo}
//                       </p>
//                       <p>
//                         <strong>Flight Name:</strong> {b.flightInfo.flightName}
//                       </p>
//                       <p>
//                         <strong>From:</strong> {b.flightInfo.from}
//                       </p>
//                       <p>
//                         <strong>To:</strong> {b.flightInfo.to}
//                       </p>
//                     </>
//                   )}

//                   <p>
//                     <strong>Total Passengers:</strong> {b.totalPassengers}
//                   </p>
//                   <p>
//                     <strong>Total Amount:</strong> ₹{b.totalAmount}
//                   </p>
//                   <p>
//                     <strong>Payment ID:</strong> {b.paymentId}
//                   </p>

//                   <div style={{ marginTop: "10px" }}>
//                     <strong>Passengers:</strong>
//                     <ul>
//                       {b.passengers?.map((p, idx) => (
//                         <li key={idx}>
//                           {p.name} ({p.gender}, Age: {p.age}, Phone: {p.phone},
//                           DOB: {new Date(p.dob).toLocaleDateString()})
//                         </li>
//                       ))}
//                     </ul>
//                   </div>

//                   <p>
//                     <strong>Booked At:</strong>{" "}
//                     {new Date(b.createdAt).toLocaleString()}
//                   </p>
//                 </>
//               ),
//             },
//             {
//               data: flightBookings,
//               title: "✈️ Flight Bookings",
//               type: "flight",
//               render: (b) => (
//                 <>
//                   <p>
//                     <strong>Flight:</strong> {b.airline} ({b.flightNumber})
//                   </p>
//                   <p>
//                     <strong>From:</strong> {b.from} <strong>To:</strong> {b.to}
//                   </p>
//                   <p>
//                     <strong>Date:</strong>{" "}
//                     {new Date(b.date).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Departure:</strong> {b.departureTime}
//                   </p>
//                   <p>
//                     <strong>Arrival:</strong> {b.arrivalTime}
//                   </p>
//                   <p>
//                     <strong>Payment ID:</strong> {b.paymentId}
//                   </p>
//                 </>
//               ),
//             },
//             {
//               data: trainBookings,
//               title: "🚆 Train Bookings",
//               type: "train",
//               render: (b) => (
//                 <>
//                   <p>
//                     <strong>Train:</strong> {b.trainName} ({b.trainNumber})
//                   </p>
//                   <p>
//                     <strong>From:</strong> {b.from} <strong>To:</strong> {b.to}
//                   </p>
//                   <p>
//                     <strong>Date:</strong>{" "}
//                     {new Date(b.date).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Departure:</strong> {b.departureTime}
//                   </p>
//                   <p>
//                     <strong>Arrival:</strong> {b.arrivalTime}
//                   </p>
//                   <p>
//                     <strong>Payment ID:</strong> {b.paymentId}
//                   </p>
//                 </>
//               ),
//             },
//             {
//               data: busBookings,
//               title: "🚌 Bus Bookings",
//               type: "bus",
//               render: (b) => (
//                 <>
//                   <p>
//                     <strong>Bus:</strong> {b.busName} ({b.busNumber})
//                   </p>
//                   <p>
//                     <strong>From:</strong> {b.from} <strong>To:</strong> {b.to}
//                   </p>
//                   <p>
//                     <strong>Date:</strong>{" "}
//                     {new Date(b.date).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Departure:</strong> {b.departureTime}
//                   </p>
//                   <p>
//                     <strong>Arrival:</strong> {b.arrivalTime}
//                   </p>
//                   <p>
//                     <strong>Payment ID:</strong> {b.paymentId}
//                   </p>
//                 </>
//               ),
//             },
//             {
//               data: cabBookings,
//               title: "🚖 Cab Bookings",
//               type: "cab",
//               render: (b) => (
//                 <>
//                   <p>
//                     <strong>Cab:</strong> {b.cabName} ({b.cabNumber})
//                   </p>
//                   <p>
//                     <strong>From:</strong> {b.from} <strong>To:</strong> {b.to}
//                   </p>
//                   <p>
//                     <strong>Date:</strong>{" "}
//                     {new Date(b.date).toLocaleDateString("en-GB")}
//                   </p>
//                   <p>
//                     <strong>Car Type:</strong> {b.carType}
//                   </p>
//                   <p>
//                     <strong>Payment ID:</strong> {b.paymentId}
//                   </p>
//                 </>
//               ),
//             },
//           ].map(
//             ({ data, title, type, render }, i) =>
//               data.length > 0 && (
//                 <motion.div
//                   key={type}
//                   className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: 0.5 + i * 0.1 }}
//                 >
//                   <h3 className="text-xl font-semibold text-blue-300 mb-3">
//                     {title}
//                   </h3>
//                   {data.map((booking, index) => (
//                     <div key={index} className="my-3 text-gray-300">
//                       {render(booking)}
//                       <button
//                         onClick={() =>
//                           handleCancelBooking(
//                             booking._id ||
//                               booking.flightId ||
//                               booking.trainId ||
//                               booking.BusId ||
//                               booking.CabId,
//                             type
//                           )
//                         }
//                         className="mt-3 inline-block px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-300"
//                       >
//                         Cancel Booking
//                       </button>
//                     </div>
//                   ))}
//                 </motion.div>
//               )
//           )}

//           {/* Logout Button */}
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1 }}
//             className="mt-4"
//           >
//             <motion.button
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="w-full py-3 px-4 bg-[#0000ff] text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//             >
//               Logout
//             </motion.button>
//           </motion.div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default DashboardPage;

import React, { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { motion } from "framer-motion";
import { formatDate } from "../utils/date";
import axios from "axios";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const [hotelBookings, setHotelBookings] = useState([]);
  const [packageBookings, setPackageBookings] = useState([]);
  const [flightBookings, setFlightBookings] = useState([]);

  const fetchHotelBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/hotelbooking/all-hotel-bookings"
      );
      const userBookings = res.data.filter((b) => b.username === user.name);
      setHotelBookings(userBookings);
    } catch (err) {
      console.error("Failed to fetch hotel bookings:", err);
    }
  };

  const fetchPackageBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/packagebooking/all-package-bookings"
      );
      const userBookings = res.data.filter((b) => b.user === user.name);
      setPackageBookings(userBookings);
    } catch (err) {
      console.error("Failed to fetch package bookings:", err);
    }
  };

  const fetchFlightBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/flight-bookings");
      const userBookings = res.data.filter((b) => b.username === user.name);
      setFlightBookings(userBookings);
    } catch (err) {
      console.error("Failed to fetch flight bookings:", err);
    }
  };

  useEffect(() => {
    fetchHotelBookings();
    fetchPackageBookings();
    fetchFlightBookings();
  }, [user.name]);

  const handleCancelHotelBooking = async (bookingId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/hotelbooking/deletehotel-booking/${bookingId}`
      );
      setHotelBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to cancel hotel booking:", err);
    }
  };

  const handleCancelPackageBooking = async (bookingId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/packagebooking/deletepackage-booking/${bookingId}`
      );
      setPackageBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to cancel package booking:", err);
    }
  };

  const handleCancelFlightBooking = async (bookingId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/flight-bookings/${bookingId}`
      );
      setFlightBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to cancel flight booking:", err);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full mx-auto mt-10 p-8 bg-gray-400 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-[#0000ff] text-transparent bg-clip-text">
          Dashboard
        </h2>

        <div className="space-y-6">
          {/* Profile Info */}
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300">Name: {user.name}</p>
            <p className="text-gray-300">Email: {user.email}</p>
          </motion.div>

          {/* Account Activity */}
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-blue-300 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined:</span>{" "}
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login:</span>{" "}
              {formatDate(user.lastLogin)}
            </p>
          </motion.div>

          {/* Hotel Bookings */}
          {hotelBookings.length > 0 && (
            <motion.div
              className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                Hotel Bookings
              </h3>
              {hotelBookings.map((booking, index) => (
                <div key={index} className="my-3 text-gray-300">
                  <p>
                    <strong>Hotel:</strong> {booking.hotelName}
                  </p>
                  <p>
                    <strong>Place:</strong> {booking.Place}
                  </p>
                  <p>
                    <strong>Room Type:</strong> {booking.roomType}
                  </p>
                  <p>
                    <strong>Room Count:</strong> {booking.roomCount}
                  </p>
                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(booking.checkInDate).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(booking.checkOutDate).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <strong>Payment ID:</strong> {booking.paymentId}
                  </p>
                  <button
                    onClick={() => handleCancelHotelBooking(booking._id)}
                    className="mt-3 inline-block px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-300"
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {/* Package Bookings */}
          {packageBookings.length > 0 && (
            <motion.div
              className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                Package Bookings
              </h3>
              {packageBookings.map((booking, index) => (
                <div key={index} className="my-3 text-gray-300">
                  <p>
                    <strong>Package ID:</strong> {booking.packageId}
                  </p>
                  <p>
                    <strong>Type:</strong> {booking.type}
                  </p>
                  <p>
                    <strong>Total Passengers:</strong> {booking.totalPassengers}
                  </p>
                  <p>
                    <strong>Total Amount:</strong> ${booking.totalAmount}
                  </p>
                  <p>
                    <strong>Payment ID:</strong> {booking.paymentId}
                  </p>
                  <button
                    onClick={() => handleCancelPackageBooking(booking._id)}
                    className="mt-3 inline-block px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-300"
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {/* Flight Bookings */}
          {flightBookings.length > 0 && (
            <motion.div
              className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-3">
                Flight Bookings
              </h3>
              {flightBookings.map((booking, index) => (
                <div key={index} className="my-3 text-gray-300">
                  <p>
                    <strong>Flight No:</strong> {booking.flightNumber}
                  </p>
                  <p>
                    <strong>Airline:</strong> {booking.airline}
                  </p>
                  <p>
                    <strong>From:</strong> {booking.from}
                  </p>
                  <p>
                    <strong>To:</strong> {booking.to}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(booking.date).toLocaleDateString("en-GB")}
                  </p>
                  <p>
                    <strong>Departure:</strong> {booking.departureTime}
                  </p>
                  <p>
                    <strong>Arrival:</strong> {booking.arrivalTime}
                  </p>
                  <p>
                    <strong>Seats:</strong> {booking.bookedSeats?.join(", ")}
                  </p>
                  <p>
                    <strong>Payment ID:</strong> {booking.paymentId}
                  </p>
                  <button
                    onClick={() => handleCancelFlightBooking(booking._id)}
                    className="mt-3 inline-block px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-300"
                  >
                    Cancel Booking
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-[#0000ff] text-white font-bold rounded-lg shadow-lg hover:from-[#0000ff] hover:to-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
