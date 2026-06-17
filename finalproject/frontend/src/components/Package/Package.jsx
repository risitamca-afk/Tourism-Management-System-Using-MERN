// import React, { useState, useEffect } from "react";
// import PackageCard from "./PackageCard";
// import axios from "axios";

// const Package = () => {
//   const [packages, setPackages] = useState([]);
//   const [selectedPriceRange, setSelectedPriceRange] = useState("");
//   const [selectedQuality, setSelectedQuality] = useState("");

//   useEffect(() => {
//     const fetchPackages = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/package/");
//         setPackages(response.data);
//       } catch (error) {
//         console.error("Failed to fetch packages:", error);
//       }
//     };

//     fetchPackages();
//   }, []);

//   const getEffectivePrice = (item) => {
//     const withoutFlight = item.flightoption?.find(
//       (f) => f.type === "withoutFlight"
//     )?.withoutFlightDetails;

//     const withFlight = item.flightoption?.find((f) => f.type === "withFlight")
//       ?.withFlightDetails?.[0];

//     const selected = withoutFlight || withFlight;
//     return selected?.price !== undefined ? selected.price : null;
//   };

//   const filterPackages = () => {
//     return packages.filter((item) => {
//       const price = getEffectivePrice(item);

//       const matchesPrice =
//         selectedPriceRange === "" ||
//         (selectedPriceRange === "0-10000" && price <= 10000) ||
//         (selectedPriceRange === "10001-20000" &&
//           price > 10000 &&
//           price <= 20000);

//       const matchesQuality =
//         selectedQuality === "" || item.quality === selectedQuality;

//       return matchesPrice && matchesQuality;
//     });
//   };

//   return (
//     <div className="flex p-6 gap-6">
//       {/* Filter Sidebar */}
//       <div className="lg:w-1/5 border-r pr-4">
//         <h2 className="text-xl font-semibold mb-4">Filters</h2>

//         <div className="mb-6">
//           <h3 className="font-medium">Price</h3>
//           <div className="mt-2 space-y-1">
//             <label>
//               <input
//                 type="radio"
//                 name="price"
//                 value="0-10000"
//                 checked={selectedPriceRange === "0-10000"}
//                 onChange={(e) => setSelectedPriceRange(e.target.value)}
//               />
//               &nbsp; ₹0 – ₹10,000
//             </label>
//             <br />
//             <label>
//               <input
//                 type="radio"
//                 name="price"
//                 value="10001-20000"
//                 checked={selectedPriceRange === "10001-20000"}
//                 onChange={(e) => setSelectedPriceRange(e.target.value)}
//               />
//               &nbsp; ₹10,001 – ₹20,000
//             </label>
//             <br />
//             <label>
//               <input
//                 type="radio"
//                 name="price"
//                 value=""
//                 checked={selectedPriceRange === ""}
//                 onChange={() => setSelectedPriceRange("")}
//               />
//               &nbsp; All
//             </label>
//           </div>
//         </div>

//         <div className="mb-6">
//           <h3 className="font-medium">Quality</h3>
//           <div className="mt-2 space-y-1">
//             <label>
//               <input
//                 type="radio"
//                 name="quality"
//                 value="normal"
//                 checked={selectedQuality === "normal"}
//                 onChange={(e) => setSelectedQuality(e.target.value)}
//               />
//               &nbsp; Normal
//             </label>
//             <br />
//             <label>
//               <input
//                 type="radio"
//                 name="quality"
//                 value="good"
//                 checked={selectedQuality === "good"}
//                 onChange={(e) => setSelectedQuality(e.target.value)}
//               />
//               &nbsp; Good
//             </label>
//             <br />
//             <label>
//               <input
//                 type="radio"
//                 name="quality"
//                 value="awesome"
//                 checked={selectedQuality === "awesome"}
//                 onChange={(e) => setSelectedQuality(e.target.value)}
//               />
//               &nbsp; Awesome
//             </label>
//             <br />
//             <label>
//               <input
//                 type="radio"
//                 name="quality"
//                 value=""
//                 checked={selectedQuality === ""}
//                 onChange={() => setSelectedQuality("")}
//               />
//               &nbsp; All
//             </label>
//           </div>
//         </div>
//       </div>

//       {/* Packages Display */}
//       <div className="lg:w-4/5 grid grid-cols-1 gap-4">
//         {filterPackages().map((item) => (
//           <PackageCard key={item._id} product={item} />
//         ))}
//         {filterPackages().length === 0 && <p>No packages found.</p>}
//       </div>
//     </div>
//   );
// };

// export default Package;

import React, { useState, useEffect } from "react";
import PackageCard from "./PackageCard";
import axios from "axios";

const Package = () => {
  const [packages, setPackages] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState("");
  const [selectedQuality, setSelectedQuality] = useState("");
  const [searchDestination, setSearchDestination] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/package/");
        setPackages(response.data);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const getEffectivePrice = (item) => {
    const withoutFlight = item.flightoption?.find(
      (f) => f.type === "withoutFlight"
    )?.withoutFlightDetails;

    const withFlight = item.flightoption?.find((f) => f.type === "withFlight")
      ?.withFlightDetails?.[0];

    const selected = withoutFlight || withFlight;
    return selected?.price !== undefined ? selected.price : null;
  };

  const filterPackages = () => {
    return packages.filter((item) => {
      const price = getEffectivePrice(item);
      const matchesPrice =
        selectedPriceRange === "" ||
        (selectedPriceRange === "0-10000" && price <= 10000) ||
        (selectedPriceRange === "10001-20000" &&
          price > 10000 &&
          price <= 20000);

      const matchesQuality =
        selectedQuality === "" || item.quality === selectedQuality;

      const matchesDestination =
        searchDestination.trim() === "" ||
        item.destination
          ?.toLowerCase()
          .includes(searchDestination.trim().toLowerCase());

      return matchesPrice && matchesQuality && matchesDestination;
    });
  };

  const resetFilters = () => {
    setSelectedPriceRange("");
    setSelectedQuality("");
    setSearchDestination("");
  };

  return (
    <div className="flex p-6 gap-6">
      {/* Filter Sidebar */}
      <div className="lg:w-1/5 border-r pr-4">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>

        {/* Destination Search */}
        <div className="mb-6">
          <h3 className="font-medium">Destination</h3>
          <input
            type="text"
            placeholder="Search by destination"
            value={searchDestination}
            onChange={(e) => setSearchDestination(e.target.value)}
            className="mt-2 w-full border px-2 py-1 rounded"
          />
        </div>

        {/* Price Filter */}
        <div className="mb-6">
          <h3 className="font-medium">Price</h3>
          <div className="mt-2 space-y-1">
            <label>
              <input
                type="radio"
                name="price"
                value="0-10000"
                checked={selectedPriceRange === "0-10000"}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              />
              &nbsp; ₹0 – ₹10,000
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="price"
                value="10001-20000"
                checked={selectedPriceRange === "10001-20000"}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              />
              &nbsp; ₹10,001 – ₹20,000
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="price"
                value=""
                checked={selectedPriceRange === ""}
                onChange={() => setSelectedPriceRange("")}
              />
              &nbsp; All
            </label>
          </div>
        </div>

        {/* Quality Filter */}
        <div className="mb-6">
          <h3 className="font-medium">Quality</h3>
          <div className="mt-2 space-y-1">
            <label>
              <input
                type="radio"
                name="quality"
                value="normal"
                checked={selectedQuality === "normal"}
                onChange={(e) => setSelectedQuality(e.target.value)}
              />
              &nbsp; Normal
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="quality"
                value="good"
                checked={selectedQuality === "good"}
                onChange={(e) => setSelectedQuality(e.target.value)}
              />
              &nbsp; Good
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="quality"
                value="awesome"
                checked={selectedQuality === "awesome"}
                onChange={(e) => setSelectedQuality(e.target.value)}
              />
              &nbsp; Awesome
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="quality"
                value=""
                checked={selectedQuality === ""}
                onChange={() => setSelectedQuality("")}
              />
              &nbsp; All
            </label>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="mt-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
        >
          Reset Filters
        </button>
      </div>

      {/* Packages Display */}
      <div className="lg:w-4/5 grid grid-cols-1 gap-4">
        {filterPackages().map((item) => (
          <PackageCard key={item._id} product={item} />
        ))}
        {filterPackages().length === 0 && <p>No packages found.</p>}
      </div>
    </div>
  );
};

export default Package;
