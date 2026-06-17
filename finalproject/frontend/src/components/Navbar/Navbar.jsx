import React from "react";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import navlogo from "../../assets/hotel/logobookmyspot.png";
import { useAuthStore } from "../../store/auth.store";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  // Handle button click function for btn click
  const handleButtonClickSignin = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
  const handleButtonClickSignup = () => {
    if (isAuthenticated) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  };

  return (
    <header className="relative z-[5] bg-white">
      <p className="flex h-10 items-center justify-center bg-[#0000ff] px-4 mb-1 text-sm text-center font-medium text-white sm:px-6 lg:px-8">
        Get Up To 60% Money Back Guarantee On Your 1st Booking
      </p>

      <nav
        aria-label="Top"
        className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 flex justify-between border-b-2 pb-1"
      >
        {/* image divand lavicon div */}
        <div className="navbar flex items-center">
          <img src={navlogo} alt="navbarlogo" className="nav_logo h-14 mr-6" />
          <div className="">
            <ul className="flex gap-5 text-sm font-medium text-gray-800 pl-3">
              <li>
                <Link to={"/landing"}>Home</Link>
              </li>
              <li>
                <Link to={"/hotelpage"}>Hotel & HomeStay</Link>
              </li>
              <li>
                <Link to={"/transportpage"}>Transport</Link>
              </li>
              <li>
                <Link to={"/PackagePage"}>Holiday Package</Link>
              </li>
              {/* <li>
                <Link to={"/restaurantpage"}>Restaurant</Link>
              </li> */}
            </ul>
          </div>
        </div>

        {/* singin and signup div  */}
        <div className="flex items-center px-10  text-sm font-medium text-gray-800 ">
          {/* signin */}
          <div className="cursor-pointer" onClick={handleButtonClickSignin}>
            {isAuthenticated ? (
              <div className="flex flex-nowrap gap-4 w-max bg-white text-[#0000ff] border-2 border-[#0000ff]  drop-shadow-md text-sm font-medium items-center px-3 py-2 tracking-[1px] rounded-3xl">
                <FontAwesomeIcon icon={faUser} />
                <p>{user.name}</p>
              </div> // Display the user's name if authenticated
            ) : (
              <p className="pr-5  ">Sign in</p> // Display login text if not authenticated
            )}
          </div>

          {/* create account */}

          <div className="cursor-pointer" onClick={handleButtonClickSignup}>
            {isAuthenticated ? (
              ""
            ) : (
              <p className="pl-5 border-l-2">Create Account</p> // Display login text if not authenticated
            )}
          </div>
        </div>
        {/* <div
          className="loginsignup_btn bg-green-300"
          onClick={handleButtonClickSignin}
        >
          <h5>
            {isAuthenticated ? (
              <div className="profiledefaulticon">
              <FontAwesomeIcon icon={faUser} />
              <p>{user.name}</p> 
            </div>// Display the user's name if authenticated
            ) : (
              "Login & Create Account" // Display login text if not authenticated
            )}
          </h5>
        </div> */}
      </nav>
    </header>
  );
};

export default Navbar;
