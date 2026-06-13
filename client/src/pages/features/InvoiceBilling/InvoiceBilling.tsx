import FooterLeft from "@/pages/components/InvoiceBilling/FooterLeft";
import FooterRight from "@/pages/components/InvoiceBilling/FooterRight";
import React from "react";

const InvoiceBilling = () => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <FooterLeft />
      </div>
      <div className="col-lg-6">
        <FooterRight />
      </div>
    </div>
  );
};

export default InvoiceBilling;
