import InputFields from "@/pages/components/InvoiceItems/InputFields";
import Titles from "@/pages/components/InvoiceItems/Titles";
import React from "react";

const InvoiceItems = () => {
  return (
    <>
      <div className="table-responsive">
        <table className="table table-borderless" cellPadding={0}>
          <Titles />
          <InputFields />
        </table>
      </div>
    </>
  );
};

export default InvoiceItems;
