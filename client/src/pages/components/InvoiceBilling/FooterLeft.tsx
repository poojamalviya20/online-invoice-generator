import { updateItem } from "@/pages/features/InvoiceBilling/invoiceBillingSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../InputField/InputField";
import TextArea from "../InputField/TextArea";

const FooterLeft = () => {
  const dispatch = useDispatch();
  const elements = useSelector(
    (state: any) => state.invoiceBilling.invoiceBilling
  );
  const apidata = useSelector((state: any) => state.getapi.data);
  useEffect(() => {
    if (apidata?.notes !== undefined) {
      dispatch(updateItem({ name: "notes", value: apidata?.notes }));
    }
    if (apidata?.terms !== undefined) {
      dispatch(updateItem({ name: "terms", value: apidata?.terms }));
    }
  }, [apidata]);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(updateItem({ name, value }));
  };
  return (
    <>
      <InputField
        type="text"
        name="notesLabel"
        className="form-control mb-2 form-titles"
        value={elements.notesLabel}
        onChange={handleChange}
      />

      <TextArea
        name="notes"
        className="form-control mb-2 rounded-1"
        value={elements.notes}
        onChange={handleChange}
        placeholder="Notes - any relevant information not already covered (Optional)"
      />

      <InputField
        type="text"
        name="termsLabel"
        className="form-control mb-2 form-titles"
        value={elements.termsLabel}
        onChange={handleChange}
      />

      <TextArea
        name="terms"
        className="form-control mb-2 rounded-1"
        value={elements.terms}
        onChange={handleChange}
        placeholder="Terms and conditions - late fees, payment methods, delivery schedule (Optional)"
      />
    </>
  );
};

export default FooterLeft;
