"use client";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBroom,
  faSpa,
  faPersonSwimming,
  faDumbbell,
  faUtensils,
  faTableTennis,
  faMartiniGlassCitrus,
  faCouch,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import { Settings } from "lucide-react";
import {
  Lock,
  Mail,
  User,
  Loader,
  Plane,
  CarTaxiFront,
  FerrisWheel,
  UtensilsCrossed,
  Phone,
  BedSingle,
  PersonStanding,
  Hotel,
} from "lucide-react";

import Input from "../../components/input2";
const reviews = { href: "#", average: 4, totalCount: 117 };

import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
// this is for the  slider Settings
const settings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1024, // Tablet and smaller
      settings: {
        slidesToShow: 2,
        dots: true,
        arrows: false,
      },
    },
    {
      breakpoint: 640, // Mobile
      settings: {
        slidesToShow: 1,
        dots: true,
        arrows: false,
        autoplay: false,
      },
    },
  ],
};

//this is for price of a flight based on selection
function getFlightPricing(product, flightType) {
  if (!product?.flightoption || !flightType) return null;

  const option = product.flightoption.find((opt) => opt.type === flightType);
  if (!option) return null;

  if (flightType === "withFlight" && option.withFlightDetails?.length > 0) {
    const details = option.withFlightDetails[0];
    return {
      price: details.price,
      tax: details.tax,
      offer: details.offer,
      crossoutPrice: details.crossoutPrice,
    };
  }

  if (flightType === "withoutFlight" && option.withoutFlightDetails) {
    const details = option.withoutFlightDetails;
    return {
      price: details.price,
      tax: details.tax,
      offer: details.offer,
      crossoutPrice: details.crossoutPrice,
    };
  }

  return null;
}

export default function PackageDetails() {
  //   const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  //   const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [people, setPeople] = useState(1); // Track number of people
  const [Phoneno, setPhoneno] = useState(""); // Track phone number
  const [hotelRooms, setHotelRooms] = useState(1); // Number of hotel rooms
  const navigate = useNavigate();
  const days = [1, 2, 3];
  const [day, setDay] = useState(1); // Default to Day 1
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const flightType = queryParams.get("flight");
  // this line take the product from the backend
  const product = location.state?.product;
  const pricing = getFlightPricing(product, flightType);

  const getTotalPrice = () => {
    if (!pricing || !selectedHotel) return null;

    const flightPrice = pricing.price || 0;
    const flightTax = pricing.tax || 0;
    const hotelPrice = selectedHotel.price || 0;
    const hotelTax = selectedHotel.tax || 0;

    // Multiply the price by the number of people and rooms
    const totalFlightPrice = flightPrice * people;
    const totalHotelPrice = hotelPrice * hotelRooms;
    const totalHotelTax = hotelTax * hotelRooms;

    return totalFlightPrice + flightTax + totalHotelPrice + totalHotelTax;
  };

  const [selectedHotel, setSelectedHotel] = useState(
    product?.hotelTypes.find((hotel) => hotel.price === 0) || null
  );

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const totalPrice = getTotalPrice();

    // Navigate to the next page, passing the data through state
    navigate("/packageuserdetailspage", {
      state: {
        people,
        Phoneno,
        totalPrice,
        hotelRooms,
        packageId: product._id,
        product,
        flightType,
        selectedHotel,
      },
    });
  };

  return (
    <div className="bg-white">
      <div className="pt-6 ">
        {/* Image gallery */}
        <div className="mx-auto max-w-[90%] px-1 sm:px-1 lg:px-8">
          <Slider {...settings}>
            {product.images.map((image, index) => (
              <div key={index} className="px-2">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="rounded-lg w-full h-[300px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product info  this is the left side */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16 ">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8 ">
            <h1 className="text-2xl  font-bold tracking-wide text-gray-900 sm:text-3xl ">
              {product.title}
            </h1>
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="flex flex-row p-l">
                <p className="text-base text-gray-900 pr-[10px]">
                  {product.description}
                </p>
                <p className=" border-l-[2px] border-gray-500 pl-[10px] text-blue-700 font-light tracking-widest">
                  {product.destination}
                </p>
              </div>
            </div>
          </div>

          {/* Options this is the right side part  */}
          <div className="mt-4 lg:row-span-3 lg:mt-0 bg-white">
            {/* prices based on withflight and without flight  */}
            <h2 className="sr-only">Product information</h2>
            <div className="mt-2 lg:row-span-3 p-4  w-full max-w-md">
              <h3 className=" text-base font-light tracking-widest text-gray-600">
                /Per Person
              </h3>

              {pricing ? (
                <>
                  <div className="flex items-baseline space-x-2">
                    <h2 className="text-3xl font-bold text-gray-900">
                      ₹{pricing.price}
                    </h2>

                    {pricing.crossoutPrice && (
                      <span className="line-through text-gray-500 decoration-red-500 decoration-[2px]">
                        ₹{pricing.crossoutPrice}
                      </span>
                    )}
                    {pricing.offer && (
                      <p className="text-green-600 font-semibold mt-1">
                        {pricing.offer}
                      </p>
                    )}
                  </div>

                  <p className="text-gray-700 mt-1 pl-3">
                    + ₹{pricing.tax} taxes & fees
                  </p>
                </>
              ) : (
                <p className="text-sm text-red-600">
                  Pricing not available for this option.
                </p>
              )}
            </div>

            {/* specialfeatures part */}

            <div className="pl-10 text-sm font-thin tracking-wider text-[#1a7971]">
              {product.specialFeatures.map((feature, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faCheck} /> &nbsp;{feature}
                </p>
              ))}
            </div>
            {/* Reviews and Ratings */}
            <div className="mt-3 flex flex-row pl-5 ">
              <Rating
                name="half-rating-read"
                defaultValue={product.ratingoutof5}
                precision={0.1}
                readOnly
              />
              <p className="pl-4">{product.ratingNumber} Ratings</p>
            </div>

            <form className="mt-10">
              <div>
                {/* Buttons for selecting hotel */}
                <div className="flex gap-4 mb-4 lg:px-5 sm:px-10 justify-between">
                  {product.hotelTypes.map((hotel) => {
                    const isSelected = selectedHotel?._id === hotel._id;

                    return (
                      <button
                        key={hotel._id["$oid"]}
                        type="button"
                        className={classNames(
                          "px-4 py-2 rounded",
                          isSelected
                            ? "bg-[#0000ff] text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        )}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelectedHotel(hotel);
                        }}
                      >
                        {hotel.type} - ₹{hotel.price}
                      </button>
                    );
                  })}
                </div>
                <label htmlFor="" className="mx-5">
                  {" "}
                  No Of People
                </label>
                <Input
                  icon={PersonStanding}
                  type="text"
                  placeholder="Enter the number of people"
                  value={people}
                  onChange={(e) => setPeople(e.target.value)}
                />

                {/* Number of hotel rooms input */}
                <label htmlFor="" className="mx-5">
                  {" "}
                  No Of Rooms
                </label>
                <Input
                  icon={BedSingle}
                  type="text"
                  placeholder="Enter the number of hotel rooms"
                  value={hotelRooms}
                  onChange={(e) => setHotelRooms(e.target.value)}
                />
                <label htmlFor="" className="mx-5">
                  Phone Number
                </label>
                <Input
                  icon={Phone}
                  type="text"
                  placeholder="Phone number"
                  value={Phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                />

                {/* Total price breakdown */}
                {getTotalPrice() !== null && (
                  <div className="mt-6 space-y-1 text-sm text-gray-800 font-medium mx-5">
                    <p>
                      Flight Price: ₹{pricing.price} x {people} = ₹
                      {pricing.price * people}
                    </p>
                    <p>
                      Flight Tax: ₹{pricing.tax} x {people} = ₹
                      {pricing.tax * people}
                    </p>
                    <p>
                      Hotel Price: ₹{selectedHotel.price} x {hotelRooms} = ₹
                      {selectedHotel.price * hotelRooms}
                    </p>
                    <p>
                      Hotel Tax: ₹{selectedHotel.tax} x {hotelRooms} = ₹
                      {selectedHotel.tax * hotelRooms}
                    </p>
                    <hr className="my-1 border-gray-300" />
                    <p className="text-lg font-bold">
                      Total Price:{" "}
                      <span className="text-[#0000ff]">₹{getTotalPrice()}</span>
                    </p>
                  </div>
                )}
              </div>
              <div className="mx-10 ">
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className=" mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#0000ff] px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to bag
                </button>
              </div>
            </form>
          </div>
          {/* !this is the green div */}
          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6 ">
            {/* button part for days  */}
            <div>
              {/* Buttons */}
              <div className="flex gap-4 mb-4 max-w-lg justify-between items-center mx-auto  px-10 py-3 border-2 border-[#0000ff] rounded-2xl ">
                {days.map((d) => (
                  <button
                    key={d}
                    className={classNames(
                      "px-4 py-2 rounded",
                      day === d
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-200 text-gray-800 hover:bg-slate-300"
                    )}
                    onClick={() => setDay(d)}
                  >
                    Day {d}
                  </button>
                ))}
              </div>

              {/* Content */}
              {day === 1 && (
                <div className="mt-4 maindiv">
                  <div className="flightdiv">
                    {flightType === "withFlight" ? (
                      <div className=" text-black p-4 rounded shadow ">
                        <h5 className="text-base font-bold mb-3 flex gap-3 border-b-[1px] border-black w-max pb-2">
                          <Plane /> Flight :
                          <span>
                            {
                              product.flightoption[0].withFlightDetails[0]
                                .flight[0].goingFlightfrom
                            }
                          </span>
                          to
                          <span>
                            {
                              product.flightoption[0].withFlightDetails[0]
                                .flight[0].goingFlightto
                            }
                          </span>
                        </h5>
                        {product.flightoption?.find(
                          (opt) => opt.type === "withFlight"
                        )?.withFlightDetails?.[0]?.flight?.[0] && (
                          <div className="space-y-2 flex justify-between">
                            {/* Left side - 70% */}
                            <div className="flex items-center space-x-4  basis-[70%] p-2">
                              {/* this part is for image and id  */}
                              <div className="flex flex-col justify-center items-center mx-5">
                                <img
                                  src={
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlightimage
                                  }
                                  alt="Flight"
                                  className="w-10 h-10 object-contain"
                                />
                                <p className="text-xs">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlightid
                                  }
                                </p>
                              </div>

                              <div className="p-2 rounded">
                                <p className="font-semibold">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlightname
                                  }
                                </p>
                                <p className="text-sm text-gray-700">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlightfrom
                                  }{" "}
                                  →{" "}
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlightto
                                  }
                                </p>
                                <p className="text-sm text-gray-700">
                                  Departure:{" "}
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlighttime
                                  }
                                </p>
                              </div>
                            </div>
                            {/* Right side - 30% */}
                            <div className="flex flex-col text-sm basis-[30%] p-2">
                              <p className="my-2">
                                Check-in:{" "}
                                <span className="text-[#0000ff]">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlightcheckin
                                  }
                                </span>
                              </p>
                              <p className="my-1">
                                Cabin Baggage:{" "}
                                <span className="text-[#0000ff]">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].goingFlightcabin
                                  }
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className=" text-black p-4 rounded shadow">
                        <p>
                          You chose the Without Flight option. You’ll need to
                          reach {product.destination} on your own.
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="hoteldiv">
                    {/* Show selected hotel details */}
                    {selectedHotel && (
                      <div className=" text-black p-4 rounded shadow mt-4 mb-4">
                        <h5 className="text-lg font-bold flex border-b-[1px] border-black w-max pb-2">
                          {" "}
                          <Hotel /> Hotel Details
                        </h5>
                        <img
                          src={selectedHotel.img}
                          alt="Hotel"
                          className="w-full h-48 object-cover rounded-md mt-2"
                        />
                        <p className="mt-2 text-[#0000ff]">
                          {selectedHotel.type}
                        </p>
                        <p className=" text-base text-black">
                          Special Features
                        </p>
                        <div className="pl-10 text-xs font-thin tracking-wider text-[#1a7971]">
                          {selectedHotel.specialFeatures.map(
                            (feature, index) => (
                              <p key={index}>
                                <FontAwesomeIcon icon={faCheck} /> &nbsp;
                                {feature}
                              </p>
                            )
                          )}
                        </div>
                        <div className="flex items-end justify-end">
                          <p className="font-medium text-2xl ">
                            ₹{selectedHotel.price}
                          </p>
                          <p className="ml-2 text-sm">
                            + ₹{selectedHotel.tax} tax and fees
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="cabdiv text-black p-4 rounded shadow">
                    <h5 className=" flex text-base font-bold   gap-3 border-b-[1px] border-black w-max pb-2">
                      <CarTaxiFront />
                      TRANSFER :Airport to {product.destination}
                    </h5>
                    <div>
                      <div className="imgdiv mx-5 my-2">
                        <img
                          src={product.cabDetails[0].img}
                          alt="cab"
                          className="w-full h-48 object-cover rounded-md mt-2"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-wide">
                          Private Transfer{" "}
                        </h3>
                        <p className="text-xs font-thin pl-5 pb-5 ">
                          Enjoy a comfortable ride from Dabolim Airport to your
                          hotel in North Goa. Relax and take in the views as you
                          arrive at your destination in a private vehicle Note:
                          The pick-up time is based on your flight’s arrival and
                          will be communicated by the local vendor. The vehicle
                          will not make any stops from the airport to the hotel
                        </p>
                        <h5 className="font-thin text-xs">
                          <span className="font-bold text-sm  tracking-widest pr-3">
                            Cab No:
                          </span>

                          {product.cabDetails[0].cabNo}
                        </h5>
                        <h5 className="font-thin text-xs">
                          <span className="font-bold  text-sm  tracking-widest pr-3 ">
                            Phone Number:
                          </span>
                          {product.cabDetails[0].driverNo}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {day === 2 && (
                <div className=" p-2">
                  <div className="meal rounded shadow ">
                    {" "}
                    <h5 className="flex text-base font-bold mb-3 items-center gap-3 pb-2 px-3">
                      {" "}
                      <span className=" flex text-base font-bold   gap-3 border-b-[1px] border-black w-max">
                        <UtensilsCrossed /> Meal:{" "}
                      </span>
                      <p className="text-sm font-light">
                        Brakefast in {product.destination}
                      </p>
                    </h5>
                  </div>

                  <div className="activity bg  px-3 pt-3 rounded shadow">
                    <h5 className="text-base font-bold mb-3 flex gap-3 border-b-[1px] border-black w-max pb-2 items-center">
                      <FerrisWheel /> Activity:{" "}
                      <p className="text-sm font-bold">
                        In {product.activityOptions[0].location}{" "}
                      </p>
                    </h5>

                    {/* Activity Details */}
                    {product.activityOptions &&
                      product.activityOptions.length > 0 && (
                        <div className="activity-details p-3  rounded-lg">
                          <img
                            src={product.activityOptions[0].img}
                            alt={product.activityOptions[0].activitytype}
                            className="w-full h-48 object-cover rounded-md mb-2"
                          />
                          <h6 className="text-lg font-semibold mb-1 tracking-wide">
                            {product.activityOptions[0].activitytype}
                          </h6>
                          <p className="text-sm mb-1">
                            <strong>Location:</strong>{" "}
                            {product.activityOptions[0].location}
                          </p>
                          <p className="text-sm mb-2">
                            <strong>Duration:</strong>{" "}
                            {product.activityOptions[0].duration}
                          </p>
                          <div className="pl-5 text-sm font-thin tracking-wider text-[#1a7971]">
                            {product.activityOptions[0].moredetails.map(
                              (feature, index) => (
                                <p key={index}>
                                  <FontAwesomeIcon icon={faCheck} /> &nbsp;
                                  {feature}
                                </p>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>

                  <div className="meal pt-2 my-3 rounded shadow">
                    {" "}
                    <h5 className="flex text-base font-bold mb-3 items-center gap-3 pb-2 px-3">
                      <span className=" flex text-base font-bold gap-3 border-b-[1px] border-black w-max">
                        <UtensilsCrossed /> Dinner:{" "}
                      </span>
                      <p className="text-sm font-light">
                        {" "}
                        You Can Choose Any 3 Foods From Hotel Menu{" "}
                      </p>
                    </h5>
                  </div>
                </div>
              )}
              {day === 3 && (
                <div className="p-2">
                  <div className="meal rounded shadow ">
                    {" "}
                    <h5 className="flex text-base font-bold mb-3 items-center gap-3 pb-2 px-3">
                      {" "}
                      <span className=" flex text-base font-bold   gap-3 border-b-[1px] border-black w-max">
                        <UtensilsCrossed /> Meal:{" "}
                      </span>
                      <p className="text-sm font-light">
                        Brakefast in {product.destination}
                      </p>
                    </h5>
                  </div>

                  <div className="hoteldiv">
                    {/* Show selected hotel details */}
                    {selectedHotel && (
                      <div className=" text-black p-4 rounded shadow mt-4 mb-4">
                        <h5 className="text-lg font-bold flex border-b-[1px] border-black w-max pb-2">
                          {" "}
                          <Hotel /> Hotel Details
                        </h5>
                        <img
                          src={selectedHotel.img}
                          alt="Hotel"
                          className="w-full h-48 object-cover rounded-md mt-2"
                        />
                        <p className="mt-2 text-[#0000ff]">
                          {selectedHotel.type}
                        </p>
                        <p className=" text-base text-black">
                          Hotel Checkout at <strong>11.00 a.m</strong>
                        </p>
                        <p className=" text-sm text-[#0000ff]">
                          ★ ★ ★ You Can Stay In The Loby Until Cab Arrive
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="cabdiv text-black p-4 rounded shadow">
                    <h5 className=" flex text-base font-bold   gap-3 border-b-[1px] border-black w-max pb-2">
                      <CarTaxiFront />
                      TRANSFER :{product.destination}to Airport
                    </h5>
                    <div>
                      <div className="imgdiv mx-5 my-2">
                        <img
                          src={product.cabDetails[0].img}
                          alt="cab"
                          className="w-full h-48 object-cover rounded-md mt-2"
                        />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold tracking-wide">
                          Private Transfer{" "}
                        </h3>
                        <p className="text-xs font-thin pl-5 pb-5 ">
                          Enjoy a comfortable ride from hotel to your desired
                          Airport. Relax and take in the views as you arrive at
                          your destination in a private vehicle
                        </p>
                        <h5 className="font-thin text-xs">
                          <span className="font-bold text-sm  tracking-widest pr-3">
                            Cab No:
                          </span>

                          {product.cabDetails[0].cabNo}
                        </h5>
                        <h5 className="font-thin text-xs">
                          <span className="font-bold  text-sm  tracking-widest pr-3 ">
                            Phone Number:
                          </span>
                          {product.cabDetails[0].driverNo}
                        </h5>
                      </div>
                    </div>
                  </div>
                  <div className="flightdiv">
                    {flightType === "withFlight" ? (
                      <div className=" text-black p-4 rounded shadow ">
                        <h5 className="text-base font-bold mb-3 flex gap-3 border-b-[1px] border-black w-max pb-2">
                          <Plane /> Flight :
                          <span>
                            {
                              product.flightoption[0].withFlightDetails[0]
                                .flight[0].comingFlightfrom
                            }
                          </span>
                          to
                          <span>
                            {
                              product.flightoption[0].withFlightDetails[0]
                                .flight[0].comingFlightto
                            }
                          </span>
                        </h5>
                        {product.flightoption?.find(
                          (opt) => opt.type === "withFlight"
                        )?.withFlightDetails?.[0]?.flight?.[0] && (
                          <div className="space-y-2 flex justify-between">
                            {/* Left side - 70% */}
                            <div className="flex items-center space-x-4  basis-[70%] p-2">
                              {/* this part is for image and id  */}
                              <div className="flex flex-col justify-center items-center mx-5">
                                <img
                                  src={
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlightimage
                                  }
                                  alt="Flight"
                                  className="w-10 h-10 object-contain"
                                />
                                <p className="text-xs">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlightid
                                  }
                                </p>
                              </div>

                              <div className="p-2 rounded">
                                <p className="font-semibold">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlightname
                                  }
                                </p>
                                <p className="text-sm text-gray-700">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlightfrom
                                  }{" "}
                                  →{" "}
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlightto
                                  }
                                </p>
                                <p className="text-sm text-gray-700">
                                  Departure:{" "}
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlighttime
                                  }
                                </p>
                              </div>
                            </div>
                            {/* Right side - 30% */}
                            <div className="flex flex-col text-sm basis-[30%] p-2">
                              <p className="my-2">
                                Check-in:{" "}
                                <span className="text-[#0000ff]">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlightcheckin
                                  }
                                </span>
                              </p>
                              <p className="my-1">
                                Cabin Baggage:{" "}
                                <span className="text-[#0000ff]">
                                  {
                                    product.flightoption[0].withFlightDetails[0]
                                      .flight[0].comingFlightcabin
                                  }
                                </span>
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className=" text-black p-4 rounded shadow">
                        <p>
                          You chose the Without Flight option.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
