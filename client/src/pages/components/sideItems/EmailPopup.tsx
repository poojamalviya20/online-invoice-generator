import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import InputField from "../InputField/InputField";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { sendEmailInvoice } from "@/pages/features/apiData/sendEmailSlice";
import swal from "sweetalert";
import { FadeLoader } from "react-spinners";

function EmailPopup({ onClose }: any) {
  const route = useRouter();
  const dispatch = useDispatch();
  // Invoice Id from url params
  let invoice_number = route.query.invoiceId;
  const [email, setEmail] = useState("");
  const [invoiceNumber, setInvoiceNumber]: any = useState(invoice_number);
  // handle form submission here

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(sendEmailInvoice({ email: email, invoice_number: invoiceNumber }));

    onClose();
  };
  const handleClose = () => {
    onClose();
  };
  return (
    <div className="email-popup-overlay">
      <div className="email-popup">
        <div className="cancel-btn-div">
          <FontAwesomeIcon
            icon={faXmark}
            onClick={handleClose}
          ></FontAwesomeIcon>
        </div>
        <form onSubmit={handleSubmit} className="email-popup-form mt-3">
          <label htmlFor="email">Enter Email Address:</label>
          <InputField
            type="email"
            name="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            isRequired={true}
            className="form-control"
          />

          <button type="submit" className="btn btn-success">
            Send Invoice
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailPopup;
