// import React from "react";
// import { offersDataset } from "../../dataset/Offers";
// import { useLocation } from "react-router-dom";
// // const offersData = offersDataset;

// const OffersNext = () => {
//   const location = useLocation();
//   const offer = location.state?.offer;
//   return (
//     <div>
//       <div className=" max-w-full flex flex-col p-10 items-center justify-center">
//         <div className="bg-purple-300 lg:w-[80vw] lg:h-[80vh] object-contain overflow-hidden rounded-2xl my-3">
//           <img className="w-full h-full" src={offer.imgSrc} alt={offer.title} />
//         </div>
//         <div className="w-[80vw] my-10  p-4">
//           {offer.details.map((item, i) => (
//             <div key={i} className="mb-4">
//               <h2 className="font-bold text-lg mb-2">{item.head}</h2>
//               <ul className="list-disc ml-6 text-sm font-thin">
//                 {item.passage.map((line, j) => (
//                   <li key={j}>{line}</li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//           <div className="mt-6 flex w-full items-center justify-center ">
//             <button className="bg-blue-700 px-4 py-2 rounded-md text-white hover:bg-white border border-blue-500 hover:text-blue-500 font-bold">
//               BOOK NOW
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OffersNext;

// OffersNext.jsx
// import React from "react";
// import { useLocation } from "react-router-dom";

// const OffersNext = () => {
//   const location = useLocation();
//   const offer = location.state?.offer;

//   if (!offer) return <div>No offer details available</div>;

//   return (
//     <div className="offer-card">
//       <h2>{offer.title}</h2>
//       <p>{offer.description}</p>

//       {offer.imgSrc ? (
//         <img
//           src={offer.imgSrc}
//           alt={offer.title || "Offer image"}
//           className="offer-image"
//         />
//       ) : (
//         <div className="image-placeholder">Image not available</div>
//       )}

//       {offer.details?.map((section, idx) => (
//         <div key={idx}>
//           <h4>{section.head}</h4>
//           <ul>
//             {section.passage.map((point, i) => (
//               <li key={i}>{point}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OffersNext;
import React from "react";
import { useLocation } from "react-router-dom";

const OffersNext = () => {
  const location = useLocation();
  const offer = location.state?.offer;

  if (!offer) return <div>No offer details available</div>;

  return (
    <div className="max-w-full flex flex-col p-10 items-center justify-center">
      {/* Offer Image Section */}
      <h2 className=" font-medium text-3xl ">{offer.title}</h2>
      <p>{offer.category}</p>
      <div className="bg-purple-300 lg:w-[80vw] lg:h-[80vh] object-contain overflow-hidden rounded-2xl my-3">
        {offer.imgSrc ? (
          <img
            className="w-full h-full"
            src={offer.imgSrc}
            alt={offer.title || "Offer image"}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            Image not available
          </div>
        )}
      </div>

      {/* Offer Details Section */}
      <div className="w-[80vw] my-10 p-4">
        {offer.details?.map((item, i) => (
          <div key={i} className="mb-4">
            <h2 className="font-bold text-lg mb-2">{item.head}</h2>
            <ul className="list-disc ml-6 text-sm font-thin">
              {item.passage?.map((line, j) => (
                <li key={j}>{line}</li>
              ))}
            </ul>
          </div>
        ))}

        {/* Book Now Button */}
        <div className="mt-6 flex w-full items-center justify-center gap-8">
          <button className="bg-blue-700 px-4 py-2 rounded-md text-white hover:bg-white border border-blue-500 hover:text-blue-500 font-bold">
            Reedem
          </button>
          <a href="/landing">
            <button className="bg-blue-700 px-4 py-2 rounded-md text-white hover:bg-white border border-blue-500 hover:text-blue-500 font-bold">
              Home
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default OffersNext;
