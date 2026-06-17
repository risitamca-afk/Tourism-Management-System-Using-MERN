import React from "react";
import PackagePay from "../components/Package/PackagePay";
import Navbar from "../components/Navbar/Navbar";

const PackagePayPage = () => {
  return (
    <div>
      <Navbar />
      <div className="my-5"></div>
      <PackagePay />
    </div>
  );
};

export default PackagePayPage;
