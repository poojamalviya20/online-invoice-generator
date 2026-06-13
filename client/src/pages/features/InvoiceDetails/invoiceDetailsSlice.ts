import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const initialState = {
  invoiceDetails: {
    invoice_from: "",
    billing_to_name: "Bill To",
    billing_address: "",
    shipping_to_name: "Ship To",
    shipping_address: "",
    invoiceTitle: "Invoice",
    invoice_number: "",
    dateLabel: "Date",
    date: moment(new Date()).format("YYYY-MM-DD"),
    termsLabel: "Payment Terms",
    payment_terms: "",
    dueDateLabel: "Due Date",
    due_date: moment(new Date()).format("YYYY-MM-DD"),
    ponumberLabel: "PO Number",
    po_number: "",
  },
};
const invoiceDetailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addItem(state: any, action: any) {
      state.invoiceDetails.push(action.payload);
    },
    updateItem(state: any, action) {
      const { name, value } = action.payload;
      state.invoiceDetails = {
        ...state.invoiceDetails,
        [name]: value,
      };
    },
  },
});
export const { addItem, updateItem } = invoiceDetailsSlice.actions;
export default invoiceDetailsSlice.reducer;
