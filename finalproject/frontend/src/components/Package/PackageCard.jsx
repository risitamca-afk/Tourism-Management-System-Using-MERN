import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom"; // 🟢 Add this

import { useAuthStore } from "../../store/auth.store";

const PackageCard = ({ product }) => {
  const navigate = useNavigate(); // 🟢 Init router

  const withoutFlight = product.flightoption?.find(
    (f) => f.type === "withoutFlight"
  )?.withoutFlightDetails;

  const withFlight = product.flightoption?.find((f) => f.type === "withFlight")
    ?.withFlightDetails?.[0];

  const selectedDetails = withoutFlight || withFlight;

  const { user, logout, isAuthenticated } = useAuthStore();
  // const navigate = useNavigate();

  // Handle button click function for btn click
  const handleButtonClickSignin = () => {
    if (isAuthenticated) {
      navigate("/Hotelnext", {
        state: { product },
      });
    } else {
      navigate("/login");
    }
  };

  // 🟢 Add handler
  const handleFlightChoice = (option) => {
    // this line responsible for sending data in the other page state
    if (isAuthenticated) {
      navigate(`/packagenextpage/?flight=${option}`, { state: { product } });
    } else {
      navigate("/login");
    }
  };

  // // 🟢 Add handler
  // const handleFlightChoice = (option) => {
  //   // this line responsible for sending data in the other page state
  //   navigate(`/packagenextpage/?flight=${option}`, { state: { product } });
  // };

  return (
    <div className="flex flex-wrap h-[350px] w-[75vw] border border-[#e0e0e0] shadow-md shadow-black/10 rounded-[20px] p-5 my-[30px] mx-auto">
      <div className="flex lg:basis-[35%] justify-center items-center">
        <div className="h-[250px] w-[95%] flex rounded-[20px] overflow-hidden">
          <img
            className="min-w-full min-h-full rounded-[20px] object-cover"
            src={product.images[0].src}
            alt={product.title}
          />
        </div>
      </div>

      <div className="basis-[65%] flex flex-wrap p-[10px]">
        <div className="basis-[60%] p-5">
          <h1 className="text-[20px] font-bold my-[5px]">{product.title}</h1>
          <div className="flex gap-3 items-center">
            <p className="text-sm text-[#0000ff]">{product.destination}</p>
            <p className="text-sm text-[#0000ff]">{product.duration}</p>
          </div>

          <div className="special-features-hotel text-[14px] py-1 text-[#1a7971] m-[10px]">
            {product.specialFeatures.map((feature, index) => (
              <p key={index}>
                <FontAwesomeIcon icon={faCheck} /> &nbsp;{feature}
              </p>
            ))}
          </div>
        </div>

        <div className="basis-[40%] flex flex-col justify-between">
          <div className="rating-hotel flex justify-end flex-nowrap text-[20px] font-bold gap-3">
            <h3 className="p-[4px] text-[#0000ff]">{product.quality}</h3>
            <h2 className="px-[10px] py-[3px] text-white bg-[#0000ff] rounded-[10px]">
              {product.rating}
            </h2>
          </div>

          <div className="flex flex-col items-end">
            {selectedDetails ? (
              <div className="flex flex-col items-end">
                <div className="flex flex-col items-end ">
                  <h5 className="text-[#1a7971] text-xs justify-end">
                    {selectedDetails.offer}
                  </h5>
                  <h2 className="text-sm font-light text-[#777] line-through decoration-red-500 decoration-[2px]">
                    ₹{selectedDetails.crossoutPrice}/-
                  </h2>
                </div>
                <div className="flex items-baseline space-x-1">
                  <h2 className="text-[24px] font-bold leading-none lg:pt-3">
                    ₹{selectedDetails.price.toLocaleString()}
                  </h2>
                  <p className="text-sm text-gray-500">/Person</p>
                </div>

                <p className="taxhotel text-[#777] text-sm">
                  + ₹{selectedDetails.tax} taxes & fees
                </p>
              </div>
            ) : (
              <p className="text-red-600 text-sm">Pricing info unavailable</p>
            )}
          </div>

          <div className="flex gap-5">
            {/* With Flight Button */}
            <div className="relative group flex flex-col items-center w-[130px]">
              <button
                onClick={() => handleFlightChoice("withFlight")} // 🟢 Add click
                className="px-[10px] py-[10px] w-full bg-[#0000ff] text-white rounded-[4px] hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600 cursor-pointer"
              >
                With Flight
              </button>
              {withFlight && (
                <div className="absolute bottom-[105%] mb-2 z-10 w-[200px] bg-white border border-gray-300 shadow-lg rounded-md p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <p className="text-[#1a7971] font-medium">
                    {withFlight.offer}
                  </p>
                  <p className="text-sm font-light text-[#777] line-through decoration-red-500 decoration-[2px]">
                    ₹{withFlight.crossoutPrice}
                  </p>
                  <p className="font-bold">₹{withFlight.price} / per person</p>
                </div>
              )}
            </div>

            {/* Without Flight Button */}
            <div className="relative group flex flex-col items-center w-[130px]">
              <button
                onClick={() => handleFlightChoice("withoutFlight")} // 🟢 Add click
                className="px-[10px] py-[10px] w-full bg-[#0000ff] text-white rounded-[4px] hover:bg-white hover:text-blue-600 hover:border hover:border-blue-600 cursor-pointer"
              >
                Without Flight
              </button>
              {withoutFlight && (
                <div className="absolute bottom-[105%] mb-2 z-10 w-[200px] bg-white border border-gray-300 shadow-lg rounded-md p-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
                  <p className="text-[#1a7971] font-medium">
                    {withoutFlight.offer}
                  </p>
                  <p className="text-sm font-light text-[#777] line-through decoration-red-500 decoration-[2px]">
                    ₹{withoutFlight.crossoutPrice}
                  </p>
                  <p className="font-bold">
                    ₹{withoutFlight.price} / per person
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
