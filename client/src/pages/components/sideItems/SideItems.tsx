import {
  faArrowDown,
  faEnvelopeOpenText,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import EmailPopup from "./EmailPopup";
import { useDispatch, useSelector } from "react-redux";
import { selectOption } from "@/pages/features/CurrencyCode/currencyCodeSlice";
import { saveInvoice } from "@/pages/features/apiData/apiSlice";
import { getInvoicePDF } from "@/pages/features/apiData/getInvoicePDFSlice";
import axios from "axios";
import { useRouter } from "next/router";
import swal from "sweetalert";
import CurrencyCode from "./CurrencyCode";
const SideItems = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [showBtn, setShowBtn] = useState(true);

  const inputFields = useSelector((state: any) => state.input);

  const handlePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const shipping_address = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.shipping_address
  );
  const logo = useSelector((state: any) => state.logoImage.logo);
  // Code to convert base64 image to blob format that can be send to api
  let base64Response;
  const [image, setImage]: any = useState();
  let logoPic: any;
  async function blobFormate() {
    if (logo) {
      base64Response = await fetch(logo);
      logoPic = await base64Response.blob();
      setImage(logoPic);
    }
  }
  useEffect(() => {
    blobFormate();
  }, [logo]);

  const invoice_from = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.invoice_from
  );
  const date = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.date
  );

  const due_date = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.due_date
  );

  const payment_terms = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.payment_terms
  );
  const po_number = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.po_number
  );
  const billing_to_name = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.billing_to_name
  );
  const billing_address = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.billing_address
  );
  const shipping_to_name = useSelector(
    (state: any) => state.invoiceDetails.invoiceDetails.shipping_to_name
  );

  const notes = useSelector(
    (state: any) => state.invoiceBilling.invoiceBilling.notes
  );
  const terms = useSelector(
    (state: any) => state.invoiceBilling.invoiceBilling.terms
  );
  const subtotal = useSelector(
    (state: any) => state.subTotal.subTotal.subtotal
  );
  const currency_code = useSelector(
    (state: any) => state.currencyCode.currency_code
  );
  const discount = useSelector(
    (state: any) => state.discount.discount.discount
  );

  const tax = useSelector((state: any) => state.tax.tax.tax);

  const shipping_charge = useSelector(
    (state: any) => state.shipping.shipping.shipping_charge
  );
  const total_amount = useSelector(
    (state: any) => state.totalAmount.totalAmount.total_amount
  );
  const paid_amount = useSelector(
    (state: any) => state.totalAmount.totalAmount.paid_amount
  );

  const due_amount = useSelector(
    (state: any) => state.totalAmount.totalAmount.due_amount
  );

  const discount_option = useSelector(
    (state: any) => state.discount.discount_option
  );
  const tax_option = useSelector((state: any) => state.tax.tax_option);

  // let items: any;
  const route = useRouter();
  let invoice_number: any = route.query.invoiceId;
  const apidata = useSelector((state: any) => state.getapi.data);

  let itemsData = useSelector((state: any) => state.input);

  const newArr = itemsData.filter((data: any) => {
    if (!data.id) {
      return data;
    }
  });

  const newArr1 = itemsData.filter((data: any) => {
    if (data.id) {
      return data;
    }
  });

  const deleted_item = JSON.stringify(
    useSelector((state: any) => state.itemTitles.deleted_item)
  );

  // inputFields,length<1,all the input fields have some values ,invoiceUserName and billing_address name -conditions
  const isAllPropertiesEmpty = inputFields.every(
    (obj: any) =>
      !obj.product_name &&
      !obj.rate_amount &&
      !obj.quantity &&
      !obj.total_amount
  );
  useEffect(() => {
    if (
      invoice_number &&
      billing_address &&
      // billing_to_name &&
      subtotal &&
      currency_code &&
      total_amount &&
      due_amount &&
      !isAllPropertiesEmpty
    ) {
      setIsDisabled(false);
    } else if (
      apidata &&
      apidata?.invoice_number &&
      apidata?.billing_address &&
      // apidata?.billing_to_name &&
      apidata?.subtotal &&
      apidata?.currency_code &&
      apidata?.total_amount &&
      apidata?.due_amount
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [
    invoice_number,
    billing_address,
    // billing_to_name,
    subtotal,
    currency_code,
    total_amount,
    due_amount,
    isAllPropertiesEmpty,
  ]);
  const handleSaveData = (e: any) => {
    e.preventDefault();
    setShowBtn(true);
    // Submit data using Formdata
    const formData = new FormData();
    formData.append("shipping_address", shipping_address);
    formData.append("invoice_from", invoice_from);
    formData.append("password", "1234test");
    formData.append("logo", image);
    formData.append("date", date);
    formData.append("due_date", due_date);
    formData.append("payment_terms", payment_terms);
    formData.append("po_number", po_number);
    formData.append("billing_to_name", billing_to_name);
    formData.append("billing_address", billing_address);
    formData.append("shipping_to_name", shipping_to_name);
    formData.append("notes", notes);
    formData.append("terms", terms);
    formData.append("subtotal", subtotal);
    formData.append("currency_code", currency_code);
    formData.append("discount", discount);
    formData.append("tax", tax);
    formData.append("shipping_charge", shipping_charge);
    formData.append("total_amount", total_amount);
    formData.append("paid_amount", paid_amount);
    formData.append("due_amount", due_amount);
    formData.append("discount_option", discount_option);
    formData.append("tax_option", tax_option);
    formData.append("items", JSON.stringify(newArr));
    formData.append("invoice_number", invoice_number);
    formData.append("deleted_item", deleted_item);
    formData.append("updated_item", JSON.stringify(newArr1));
    dispatch(saveInvoice(formData));
  };

  // handle download invoice as pdf action
  const pendingState = useSelector((state: any) => state.getpdf.pending);
  const handleDownloadInvoice = async () => {
    console.log(pendingState);
    if (!pendingState) {
      swal({
        title: "PDF downloaded successfully",
        text: "",
        icon: "success",
      });
    }
    try {
      const resultAction = await dispatch(
        getInvoicePDF({ invoice_number: invoice_number })
      );
      const pdfUrl = resultAction.payload.pdffile;

      const response = await axios.get(pdfUrl, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "invoice.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {}
  };
  const buttonDisable = () => {
    setShowBtn(false);
  };
  return (
    <>
      <div className="send-invoice-div">
        <button
          onClick={(e) => {
            handleSaveData(e);
            buttonDisable();
          }}
          className="btn btn-success send-invoice-button"
          disabled={isDisabled}
        >
          Save Invoice
        </button>
      </div>

      <div className="download-invoice-div ">
        <button
          className="btn btn-primary"
          data-bs-toggle="tooltip"
          data-bs-placement="left"
          title="Email Invoice"
          onClick={handlePopup}
          disabled={showBtn}
        >
          <FontAwesomeIcon icon={faEnvelopeOpenText}></FontAwesomeIcon>
        </button>
        {/* Show email popup code */}
        {showPopup && <EmailPopup onClose={handleClose} />}
        <button
          className="btn btn-primary m-2"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Download Invoice"
          disabled={showBtn}
          onClick={handleDownloadInvoice}
        >
          <FontAwesomeIcon icon={faArrowDown}></FontAwesomeIcon>
        </button>
      </div>
      <div className="currency-div">
        <CurrencyCode />
      </div>
    </>
  );
};
export default SideItems;
