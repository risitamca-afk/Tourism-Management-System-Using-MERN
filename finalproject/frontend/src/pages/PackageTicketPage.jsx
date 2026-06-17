import React from "react";
import PackageTicket from "../components/Package/PackageTicket";
import Navbar from "../components/Navbar/Navbar";

const PackageTicketPage = () => {
  return (
    <div>
      <Navbar />
      <div className="my-5"></div>
      <PackageTicket />
    </div>
  );
};

export default PackageTicketPage;
