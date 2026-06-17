// import React, { useState } from "react";
// import "./Offers.css"; // Import the styles
// import { offersDataset } from "../../dataset/Offers";
// import { useNavigate } from "react-router-dom";

// const OffersWithTabs = () => {
//   const [activeTab, setActiveTab] = useState("All Offers");
//   const navigate = useNavigate();
//   const tabs = [
//     "All Offers",
//     "Bank Offers",
//     "Flights",
//     "Hotels",
//     "Holidays",
//     "Trains",
//     "Cabs",
//     "Bus",
//   ];

//   // Sample data for the offers card
//   const offersData = offersDataset;

//   // Filter offers based on the active tab
//   const filteredOffers = offersData.filter(
//     (offer) => activeTab === "All Offers" || offer.tags.includes(activeTab)
//   );

//   return (
//     <div className="offers-main-container">
//       <div className="offersheading">
//         <h1>BEST OFFERS WAITING FOR YOU !!! GRAB IT FAST</h1>
//       </div>
//       {/* Tabs */}
//       <div className="tab-container">
//         {tabs.map((tab, index) => (
//           <div
//             key={index}
//             className={`tab-item ${activeTab === tab ? "active" : ""}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </div>
//         ))}
//         <div
//           className="active-underline"
//           style={{ left: `${tabs.indexOf(activeTab) * (100 / tabs.length)}%` }}
//         />
//       </div>

//       {/* Offers Cards */}
//       <div className="offers-list">
//         {filteredOffers.map((offer, index) => (
//           <div key={index} className="offers-card">
//             <div className="offers-card-image">
//               <img src={offer.imgSrc} alt={offer.title} />
//             </div>
//             <div className="offers-card-content">
//               <div className="offers-card-header">
//                 <span className="offers-card-category">{offer.category}</span>
//                 <span className="offers-card-terms">T&C's APPLY</span>
//               </div>
//               <h2 className="offers-card-title">{offer.title}</h2>
//               <p className="offers-card-description">{offer.description}</p>
//               <div className="offers-card-action">
//                 <a href="/offernextpage">
//                   <button
//                     className="offers-book-now"
//                     onClick={() =>
//                       navigate("/offernextpage", { state: { offer } })
//                     }
//                   >
//                     BOOK NOW
//                   </button>
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <style jsx="true">{`
//         .active-underline {
//           position: absolute;
//           bottom: 0;
//           height: 2px;
//           background-color: #007bff;
//           width: calc(100% / ${tabs.length}); /* Responsive underline width */
//           transition: left 0.3s ease;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default OffersWithTabs;
import React, { useState } from "react";
import "./Offers.css"; // Import the styles
import { offersDataset } from "../../dataset/Offers";
import { useNavigate } from "react-router-dom";

const OffersWithTabs = () => {
  const [activeTab, setActiveTab] = useState("All Offers");
  const navigate = useNavigate();

  const tabs = [
    "All Offers",
    "Bank Offers",
    "Flights",
    "Hotels",
    "Holidays",
    "Trains",
    "Cabs",
    "Bus",
  ];

  // Fallback image if imgSrc is missing or invalid
  const fallbackImage = "https://via.placeholder.com/300x200?text=No+Image";

  // Filter offers based on the active tab
  const filteredOffers = offersDataset.filter(
    (offer) => activeTab === "All Offers" || offer.tags.includes(activeTab)
  );

  return (
    <div className="offers-main-container">
      <div className="offersheading">
        <h1>BEST OFFERS WAITING FOR YOU !!! GRAB IT FAST</h1>
      </div>

      {/* Tabs */}
      <div className="tab-container">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab-item ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </div>
        ))}
        <div
          className="active-underline"
          style={{ left: `${tabs.indexOf(activeTab) * (100 / tabs.length)}%` }}
        />
      </div>

      {/* Offers Cards */}
      <div className="offers-list">
        {filteredOffers.map((offer, index) =>
          offer ? (
            <div key={index} className="offers-card">
              <div className="offers-card-image">
                <img
                  src={offer.imgSrc || fallbackImage}
                  alt={offer.title || "Offer"}
                  onError={(e) => (e.target.src = fallbackImage)}
                />
              </div>
              <div className="offers-card-content">
                <div className="offers-card-header">
                  <span className="offers-card-category">{offer.category}</span>
                  <span className="offers-card-terms">T&C's APPLY</span>
                </div>
                <h2 className="offers-card-title">{offer.title}</h2>
                <p className="offers-card-description">{offer.description}</p>
                <div className="offers-card-action">
                  <button
                    className="offers-book-now"
                    onClick={() =>
                      navigate("/offernextpage", { state: { offer } })
                    }
                  >
                    BOOK NOW
                  </button>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>

      {/* Dynamic underline for tab */}
      <style jsx="true">{`
        .active-underline {
          position: absolute;
          bottom: 0;
          height: 2px;
          background-color: #007bff;
          width: calc(100% / ${tabs.length});
          transition: left 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default OffersWithTabs;
