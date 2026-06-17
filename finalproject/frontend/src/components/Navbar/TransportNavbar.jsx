import React from "react";
import { Plane, TramFront, Bus, CarFront } from "lucide-react";
import { Link } from "react-router-dom";

const TransportNavbar = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-center pt-2">
      <ul className="flex gap-10 text-sm font-medium text-gray-800">
        <li>
          <Link
            to="/transportpage"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition"
          >
            <p>Flights</p>
            <Plane />
          </Link>
        </li>
        <li>
          <Link
            to="/trainsearchpage"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition"
          >
            <p>Trains</p>
            <TramFront />
          </Link>
        </li>
        <li>
          <Link
            to="/bussearchpage"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition"
          >
            <p>Buses</p>
            <Bus />
          </Link>
        </li>
        <li>
          <Link
            to="/cabsearchpage"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-white hover:text-blue-600 border border-blue-600 transition"
          >
            <p>Cabs</p>
            <CarFront />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default TransportNavbar;
