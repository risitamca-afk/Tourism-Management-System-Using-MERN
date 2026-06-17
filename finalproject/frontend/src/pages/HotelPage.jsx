// // import "./landing.css";
// import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Hotel from "../components/hotel/Hotel";

import React from "react";
import HotelProductDetails from "../components/HotelProductDetails/HotelProductDetails";
import ProductCard from "../components/ProductCard/ProductCard";
import Product from "../components/ProductCard/Product";
import PackageCard from "../components/Package/PackageCard";
import Package from "../components/Package/Package";
import PackageNext from "../components/Package/PackageNext";

const HotelPage = () => {
  return (
    <div>
      <Navbar />
      {/* <ProductCard /> */}
      <Product />
      {/* <Hotel/> */}
      {/* <HotelProductDetails /> */}
      {/* <Package /> */}
      {/* <PackageNext /> */}
    </div>
  );
};

export default HotelPage;
