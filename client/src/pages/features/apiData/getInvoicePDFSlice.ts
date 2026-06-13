import { API_TAIL, REDUCERS } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL: any = process.env.NEXT_PUBLIC_INVOICE_API_URL;
const reducers = REDUCERS;
const api_tails = API_TAIL;
export const getInvoicePDF: any = createAsyncThunk(
  reducers.GET_PDF_API_REDUCER,
  async ({ invoice_number }: any) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${api_tails.SAVE_API}${api_tails.GET_PDF}`,
        {
          invoice_number,
        }
      );

      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);
const getInvoiceAPISlice = createSlice({
  name: "getpdf",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvoicePDF.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getInvoicePDF.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getInvoicePDF.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = getInvoiceAPISlice.actions;
export default getInvoiceAPISlice.reducer;
