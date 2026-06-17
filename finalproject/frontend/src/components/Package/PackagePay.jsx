// PackagePay.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import QRCode from "qrcode";
import axios from "axios";
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

import { useAuthStore } from "../../store/auth.store";
import { useRef, useEffect } from "react";

const PackagePay = () => {
  const { user } = useAuthStore();
  const location = useLocation();
  const {
    bookingData,
    peopleDetails,
    paymentId,
    product,
    flightType,
    selectedHotel,
  } = location.state || {};
  const bookingSavedRef = useRef(false);
  const generatePDFTicket = async () => {
    const doc = new jsPDF();
    const qrText = `Payment ID: ${paymentId}\nPackage ID: ${bookingData.PackageId}\nUser: ${bookingData.username}`;

    const qrImage = await QRCode.toDataURL(qrText);

    doc.setFontSize(18);
    doc.text("Travel Ticket", 80, 20);

    doc.setFontSize(12);
    doc.text(`User: ${bookingData.username}`, 20, 40);
    doc.text(`Package ID: ${bookingData.PackageId}`, 20, 50);
    doc.text(`Total Amount: ₹${bookingData.totalAmount}`, 20, 60);
    doc.text(`Payment ID: ${paymentId}`, 20, 70);

    doc.text("People Details:", 20, 85);
    peopleDetails.forEach((person, i) => {
      const y = 95 + i * 30;
      doc.text(`Name: ${person.name}`, 25, y);
      doc.text(`Phone: ${person.phone}`, 25, y + 8);
      doc.text(`Email: ${person.email}`, 25, y + 16);
    });

    doc.addImage(qrImage, "PNG", 150, 40, 40, 40);

    doc.save(`ticket-${bookingData.PackageId}.pdf`);
  };

  if (!bookingData || !peopleDetails) {
    return <div className="p-4">Missing payment data. Please go back.</div>;
  }

  useEffect(() => {
    const savePackageBooking = async () => {
      if (bookingSavedRef.current) return; // Prevent duplicate saves

      try {
        const bookingPayload = {
          user: user?.name || "guest",
          packageId: product._id,
          type: flightType,
          flightInfo:
            flightType === "withFlight"
              ? {
                  flightNo:
                    product.flightoption[0].withFlightDetails[0].flight[0]
                      .goingFlightid,
                  flightName:
                    product.flightoption[0].withFlightDetails[0].flight[0]
                      .goingFlightname,
                  from: product.flightoption[0].withFlightDetails[0].flight[0]
                    .goingFlightfrom,
                  to: product.flightoption[0].withFlightDetails[0].flight[0]
                    .goingFlightto,
                }
              : undefined,
          passengers: peopleDetails,
          totalPassengers: peopleDetails.length,
          totalAmount: bookingData.totalAmount,
          paymentId,
        };

        await axios.post(
          "http://localhost:5000/api/packagebooking/addpackagebooking",
          bookingPayload  
        );
        bookingSavedRef.current = true;
        console.log("Package booking saved successfully!");
      } catch (error) {
        console.error("Error saving package booking:", error);
      }
    };

    savePackageBooking();
  }, [flightType, product, bookingData, peopleDetails, paymentId]);
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4 text-green-400">
        Ticket confirmed
      </h2>
      <div className="dataFromPrevious">
        <div className="day1">
          <div className="flightdiv">
            {flightType === "withFlight" ? (
              <div className=" text-black p-4 rounded shadow ">
                <h5 className="text-base font-bold mb-3 flex gap-3 border-b-[1px] border-black w-max pb-2">
                  <Plane /> Flight :
                  <span>
                    {
                      product.flightoption[0].withFlightDetails[0].flight[0]
                        .goingFlightfrom
                    }
                  </span>
                  to
                  <span>
                    {
                      product.flightoption[0].withFlightDetails[0].flight[0]
                        .goingFlightto
                    }
                  </span>
                </h5>
                {product.flightoption?.find((opt) => opt.type === "withFlight")
                  ?.withFlightDetails?.[0]?.flight?.[0] && (
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
                  You chose the Without Flight option. You’ll need to reach{" "}
                  {product.destination} on your own.
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
                <p className="mt-2 text-[#0000ff]">{selectedHotel.type}</p>
                <p className=" text-base text-black">Special Features</p>
                <div className="pl-10 text-xs font-thin tracking-wider text-[#1a7971]">
                  {selectedHotel.specialFeatures.map((feature, index) => (
                    <p key={index}>
                      <FontAwesomeIcon icon={faCheck} /> &nbsp;
                      {feature}
                    </p>
                  ))}
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
                  Enjoy a comfortable ride from Dabolim Airport to your hotel in
                  North Goa. Relax and take in the views as you arrive at your
                  destination in a private vehicle Note: The pick-up time is
                  based on your flight’s arrival and will be communicated by the
                  local vendor. The vehicle will not make any stops from the
                  airport to the hotel
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
        <div className=" day2 p-2">
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
            {product.activityOptions && product.activityOptions.length > 0 && (
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
        <div className=" day 3 p-2">
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
                <p className="mt-2 text-[#0000ff]">{selectedHotel.type}</p>
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
                  Enjoy a comfortable ride from hotel to your desired Airport.
                  Relax and take in the views as you arrive at your destination
                  in a private vehicle
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
                      product.flightoption[0].withFlightDetails[0].flight[0]
                        .comingFlightfrom
                    }
                  </span>
                  to
                  <span>
                    {
                      product.flightoption[0].withFlightDetails[0].flight[0]
                        .comingFlightto
                    }
                  </span>
                </h5>
                {product.flightoption?.find((opt) => opt.type === "withFlight")
                  ?.withFlightDetails?.[0]?.flight?.[0] && (
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
                <p>You chose the Without Flight option.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-6 bg-gray-100 p-4 rounded">
        <p>
          <strong>User:</strong> {bookingData.username}
        </p>
        <p>
          <strong>Package ID:</strong> {bookingData.PackageId}
        </p>
        <p>
          <strong>Total Amount:</strong> ₹{bookingData.totalAmount}
        </p>
        <p>
          <strong>PaymentId:</strong> {paymentId}
        </p>
        <p>Please Store The Payment Id For Furture References </p>
      </div>

      <h3 className="font-semibold text-lg mb-2">People Details:</h3>
      {peopleDetails.map((person, index) => (
        <div key={index} className="mb-4 p-4 border rounded bg-gray-50">
          <p>
            <strong>Name:</strong> {person.name}
          </p>
          <p>
            <strong>Phone:</strong> {person.phone}
          </p>
          <p>
            <strong>Email:</strong> {person.email}
          </p>
          <p>
            <strong>Age:</strong> {person.age}
          </p>
          <p>
            <strong>DOB:</strong> {person.dob}
          </p>
          <p>
            <strong>Gender:</strong> {person.gender}
          </p>
        </div>
      ))}

      {/* Replace this with actual payment form or gateway integration */}
      <div className="w-full flex items-center justify-center">
        <button
          className="bg-[#0000ff] text-white px-4 py-2 rounded hover:bg-white hover:text-[#0000ff] border hover:border-[#0000ff]"
          onClick={generatePDFTicket}
        >
          Download Ticket
        </button>
      </div>
    </div>
  );
};

export default PackagePay;
