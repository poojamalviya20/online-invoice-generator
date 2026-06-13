import React, { useEffect, useState } from "react";
import InvoiceItems from "../features/InvoiceItems/InvoiceItems";
import InvoiceDetail from "../features/InvoiceDetails/InvoiceDetail";
import InvoiceBilling from "../features/InvoiceBilling/InvoiceBilling";
import SideItems from "./sideItems/SideItems";
import Script from "next/script";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getInvoice } from "../features/apiData/getInvoiceSlice";
import GoogleAds from "./googleAds/GoogleAds";

const Main = () => {
  // Code for query params in url
  const router = useRouter();
  useEffect(() => {
    var invoiceId: any = router.asPath.split("=")[1];
    if (invoiceId) {
      // If the invoiceId is already present, do nothing.
    } else {
      // Otherwise, generate a random number and add it to the URL as the invoiceId.
      invoiceId = Math.floor(Math.random() * 1000000000);
    }
    router.replace({
      pathname: router.pathname,
      query: { invoiceId: invoiceId },
    });
  }, []);

  let invoice_number = router.query.invoiceId;

  const dispatch = useDispatch();
  useEffect(() => {
    if (invoice_number) {
      dispatch(getInvoice({ invoice_number: invoice_number }));
    }
  }, [invoice_number]);
  const loading = useSelector((state: any) => state.getapi.pending);

  return (
    <>
      <Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9672457203954390" />
      {/* New Added */}
      <div className="d-flex justify-content-center flex-wrap main-div gap-5">
        <div className="card invoice-card">
          <div className="card-body">
            <InvoiceDetail />
            <InvoiceItems />
            <InvoiceBilling />
          </div>
        </div>
        <div className="side-items">
          <SideItems />
        </div>
      </div>
      <div className="ad-horizontal">
        <GoogleAds adId="1" />
        <GoogleAds adId="2" />
      </div>
    </>
  );
};

export default Main;
