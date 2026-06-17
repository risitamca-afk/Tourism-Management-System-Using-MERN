"use client";
import axios from "axios";
import Input2 from "../input2.jsx";
import { useAuthStore } from "../../store/auth.store.js";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  faWifi,
  faFireBurner,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "@mui/material";
import navlogo from "../../assets/hotel/logobookmyspot.png";
import {
  BedSingle,
  UtensilsCrossed,
  CalendarMinus2,
  CalendarCheck,
} from "lucide-react";

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

const iconMap = {
  broom: faBroom,
  spa: faSpa,
  pool: faPersonSwimming,
  gym: faDumbbell,
  restaurant: faUtensils,
  games: faTableTennis,
  bar: faMartiniGlassCitrus,
  lounge: faCouch,
  wifi: faWifi,
  fireplace: faFireBurner,
  beach: faUmbrellaBeach,
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const location = useLocation();
  const product = location.state?.product;
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [selectedRoom, setSelectedRoom] = useState(product.roomTypes[0]);
  const [quantity, setQuantity] = useState(1);
  const [roomTypes, setRoomTypes] = useState(product.roomTypes);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [mealPersonCount, setMealPersonCount] = useState(1);

  if (!product) return <p>No product data received.</p>;

  // thispart is for if room avialable it shows ok booked showes ok and in case of unavailable itsshowunavailable
  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity > selectedRoom.availableRooms) {
      alert("Not enough rooms available.");
      return;
    }

    const updated = product.roomTypes.map((room) =>
      room.type === selectedRoom.type
        ? { ...room, availableRooms: room.availableRooms - quantity }
        : room
    );
    setRoomTypes(updated);
    setSelectedRoom(updated.find((room) => room.type === selectedRoom.type));
  };
  //  meal amount
  const mealTotal =
    selectedMeals.reduce((sum, id) => {
      const meal = product.mealsOptions.find((m) => m.id === id);
      return sum + (meal?.price || 0);
    }, 0) * mealPersonCount;

  const calculateNights = (checkIn, checkOut) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diffTime = outDate - inDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights =
    checkInDate && checkOutDate
      ? calculateNights(checkInDate, checkOutDate)
      : 1;

  const totalPrice =
    nights * quantity * (selectedRoom.price + selectedRoom.tax) +
    nights * mealTotal;

  const handlePayment = () => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded. Please check your connection.");
      return;
    }

    const options = {
      key: "rzp_test_cItljZJycy70Ly", // Replace with your Razorpay Key ID
      amount: totalPrice * 100, // Convert to the smallest currency unit (paise for INR)
      currency: "INR",
      name: "BookYourSpot",
      description: `Booking at ${product.title}`,
      image: navlogo, // Optional, replace with your company logo URL
      handler: async (response) => {
        // Prepare the booking details to pass to the success page
        const bookingDetails = {
          userId: user._id,
          userName: user.name,
          email: user.email,
          hotelId: product._id,
          hotelName: product.title,
          Place: product.destination,
          roomType: selectedRoom.type,
          roomCount: quantity,
          selectedHotel: product,
          totalPrice,
          mealsSelected: selectedMeals,
          paymentId: response.razorpay_payment_id,
          checkInDate,
          checkOutDate,
          phno: user.phno || "",
        };

        // Directly navigate to the success page with the booking details
        navigate("/paymentsuccesshotelpage", {
          state: {
            ...bookingDetails, // Pass all booking details to the success page
            razorpayPaymentId: response.razorpay_payment_id, // Pass Razorpay payment ID if needed
          },
        });
      },
      prefill: {
        name: user?.name, // Replace with user's name
        email: user?.email, // Replace with user's email
        contact: user?.phno, // Replace with user's phone
      },
      notes: {
        address: "Hotel booking address note",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", function (response) {
      alert(`Payment failed! Error: ${response.error.description}`);
    });

    rzp.open();
  };

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* //! Breadcrumb(the top part for the links) */}
        {/* <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          > 
        {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
        {/* <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li> */}
        {/* </ol>
        </nav> */}
        {/*Breadcrumb  end */}

        {/* Image gallery  */}
        <div className="mx-auto max-w-[90%] px-1 sm:px-1 lg:px-8">
          <Slider {...settings}>
            {product.images.map((images, index) => (
              <div key={index} className="px-2">
                <img
                  src={images.src}
                  alt={images.alt}
                  className="rounded-lg w-full h-[300px] object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
        {/* Image gallery  end */}

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pb-10 lg:pt-10">
          <div className="lg:col-span-2 ">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
            <div>
              <h3 className="sr-only">Description</h3>
              <div className="flex flex-row">
                <p className="text-base text-gray-900 pr-[10px]">
                  {product.description}
                </p>
                <p className=" border-l-[2px] border-gray-500 pl-[10px] text-blue-700 font-light tracking-widest">
                  {product.destination}
                </p>
              </div>
            </div>
          </div>

          {/* Options  price and tax*/}
          <div className="mt-4 lg:row-span-3 lg:mt-0 lg:border-l lg:border-gray-200 lg:pl-8">
            <h2 className="sr-only">Product information</h2>
            <h2>Per Night</h2>
            <div className="flex flex-nowrap flex-row items-baseline">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 ">
                ₹{selectedRoom.price}
              </h2>
              <p className=" pl-3 text-base font-thin tracking-wider text-gray-600 ">
                + ₹ {selectedRoom.tax ?? 0} taxes & fees
              </p>
            </div>
            {/* specialfeatures part */}

            <div className="p-5 text-base font-thin tracking-wider text-[#1a7971]">
              {selectedRoom.specialFeatures.map((feature, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faCheck} /> &nbsp;{feature}
                </p>
              ))}
            </div>

            {/* Reviews and Ratings */}
            <div className="mt-3 flex flex-row">
              <Rating
                name="half-rating-read"
                defaultValue={product.ratingoutof5}
                precision={0.1}
                readOnly
              />
              <p className="pl-4">{product.ratingNumber} Ratings</p>
            </div>

            {/* form start  */}
            {/* Booking Form */}
            <form className="mt-10" onSubmit={handleSubmit}>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Room Types
                </h3>

                <fieldset className="mt-4">
                  <RadioGroup
                    value={selectedRoom}
                    onChange={setSelectedRoom}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                  >
                    {product.roomTypes.map((room) => {
                      const isDisabled = quantity > room.availableRooms;
                      return (
                        <Radio
                          key={room.type}
                          value={room}
                          disabled={isDisabled}
                          className={classNames(
                            isDisabled
                              ? "cursor-not-allowed bg-gray-50 text-gray-200"
                              : "cursor-pointer bg-white text-gray-900 shadow-sm",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500"
                          )}
                        >
                          {/* //! checkout this part for card of rooms */}
                          <span className="text-center">
                            {room.type}
                            <br />₹{room.price} + ₹{room.tax} tax
                            <br />({room.availableRooms} left)
                          </span>
                          {isDisabled ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 w-full h-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-600 "
                            />
                          )}
                        </Radio>
                      );
                    })}
                  </RadioGroup>
                </fieldset>
              </div>

              {/* Quantity  of rooms*/}
              <div className="mt-6 ">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Rooms
                </label>
                <Input2
                  icon={BedSingle}
                  type="text"
                  min={1}
                  max={selectedRoom.availableRooms}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* Check-in Date */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <Input2
                  icon={CalendarCheck}
                  type="date"
                  value={checkInDate}
                  onChange={(e) => setCheckInDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Check-out Date */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Check-out Date
                </label>
                <Input2
                  icon={CalendarMinus2}
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => setCheckOutDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* Input for Meal Person Count: */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Number of People Taking Meals
                </label>
                <Input2
                  icon={UtensilsCrossed}
                  type="number"
                  min={1}
                  value={mealPersonCount}
                  onChange={(e) => setMealPersonCount(Number(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              {/* Meal Options */}
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Add Meals (Max 2)
                </h3>
                <fieldset className="mt-4">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {product.mealsOptions.map((meal) => {
                      const isSelected = selectedMeals.includes(meal.id);
                      const isDisabled =
                        !isSelected && selectedMeals.length >= 2;

                      return (
                        <div
                          key={meal.id}
                          onClick={() => {
                            if (isSelected) {
                              setSelectedMeals(
                                selectedMeals.filter((m) => m !== meal.id)
                              );
                            } else if (!isDisabled) {
                              setSelectedMeals([...selectedMeals, meal.id]);
                            }
                          }}
                          className={classNames(
                            isDisabled && !isSelected
                              ? "cursor-not-allowed bg-gray-50 text-gray-200"
                              : "cursor-pointer bg-white text-gray-900 shadow-sm",
                            isSelected &&
                              "border-indigo-600 ring-2 ring-indigo-500",
                            "relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium hover:bg-gray-50"
                          )}
                        >
                          <span className="text-center">
                            {meal.label}
                            <br />₹{meal.price}
                          </span>
                          {isDisabled && !isSelected ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 w-full h-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent"
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </fieldset>
              </div>

              {/* Total Price */}
              <div className="mt-4 text-lg font-semibold text-gray-900">
                Total Price: ₹
                {nights * quantity * (selectedRoom.price + selectedRoom.tax) +
                  nights * mealTotal}
              </div>

              <button
                className="mt-10 w-full flex items-center justify-center rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handlePayment}
              >
                Book Room
              </button>
            </form>

            {/* form end */}
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pb-16 lg:pt-6">
            {/* Description and details */}

            <div className="mt-1">
              <h3 className="text-base font-medium text-gray-900">Amenities</h3>

              <div className="mt-4 flex flex-row pl-3 gap-5 flex-wrap ">
                {product.amenities.map((item) => (
                  <span className="text-blue-700 bg-blue-200 px-2 p-1 rounded-md text-xs">
                    <FontAwesomeIcon icon={iconMap[item.img]} />{" "}
                    &nbsp;&nbsp;&nbsp;
                    <span className="text-gray-600">{item.name}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-base font-medium text-gray-900">
                Description
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600 pl-3">
                  {product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
