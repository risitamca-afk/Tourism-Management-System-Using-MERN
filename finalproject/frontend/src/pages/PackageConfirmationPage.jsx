import React from "react";
import Navbar from "../components/Navbar/Navbar";
import PackageConfirmation from "../components/Package/packageConfirmation";

const PackageConfirmationPage = () => {
  return (
    <div>
      <Navbar />
      <div className="my-5"></div>
      <PackageConfirmation />
    </div>
  );
};

export default PackageConfirmationPage;
