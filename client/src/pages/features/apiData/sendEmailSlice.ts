import { FadeLoader } from "react-spinners";
import { API_TAIL, REDUCERS } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";

const BASE_URL: any = process.env.NEXT_PUBLIC_INVOICE_API_URL;
const reducers = REDUCERS;
const api_tails = API_TAIL;

export const sendEmailInvoice: any = createAsyncThunk(
  reducers.SEND_EMAIL_INVOICE_RECUCER,
  async ({ email, invoice_number }: any) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${api_tails.SAVE_API}${api_tails.EMAIL_INVOICE}`,
        { email, invoice_number }
      );

      swal({
        title: response.data.message,
        text: "",
        icon: "success",
      });

      return response;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendEmailInvoice.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(sendEmailInvoice.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(sendEmailInvoice.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = sendEmailSlice.actions;
export default sendEmailSlice.reducer;
