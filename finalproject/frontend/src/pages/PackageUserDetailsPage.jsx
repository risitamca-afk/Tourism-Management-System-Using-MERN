import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PackageUserDetails from "../components/Package/PackageUserDetails";

const PackageUserDetailsPage = () => {
  return (
    <div>
      <Navbar />
      <div className="my-5"></div>
      <PackageUserDetails />
    </div>
  );
};

export default PackageUserDetailsPage;
