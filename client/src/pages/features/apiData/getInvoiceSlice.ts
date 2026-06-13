import { API_TAIL, REDUCERS } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL: any = process.env.NEXT_PUBLIC_INVOICE_API_URL;
const reducers = REDUCERS;
const api_tails = API_TAIL;
export const getInvoice: any = createAsyncThunk(
  reducers.GET_INVOICE_API_REDUCER,
  async ({ invoice_number }: any) => {
    try {
      const response = await axios.get(
        `${BASE_URL}${api_tails.SAVE_API}/:${invoice_number}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const getInvoiceSlice = createSlice({
  name: "getapi",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInvoice.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(getInvoice.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(getInvoice.pending, (state) => {
        state.pending = true;
      });
  },
});
export const {} = getInvoiceSlice.actions;
export default getInvoiceSlice.reducer;
