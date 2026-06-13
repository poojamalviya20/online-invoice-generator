import { API_TAIL, REDUCERS } from "@/constant";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import swal from "sweetalert";

const BASE_URL: any = process.env.NEXT_PUBLIC_INVOICE_API_URL;
const reducers = REDUCERS;
const api_tails = API_TAIL;

export const saveInvoice: any = createAsyncThunk(
  reducers.API_SLICE_REDUCER,
  async (formData: any) => {
    try {
      const response = await axios.post(
        `${BASE_URL}${api_tails.SAVE_API}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status) {
        swal({
          title: response.data,
          text: "",
          icon: "success",
          className: "alert-small",
        });
      }
      return response.data;
    } catch (error: any) {
      swal({
        title: error.response.data.message[0],
        text: "",
        className: "alert-small",
        icon: "error",
      });
      throw new Error(error.message);
    }
  }
);
const apiSlice = createSlice({
  name: "api",
  initialState: {
    pending: false,
    error: null,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveInvoice.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(saveInvoice.rejected, (state, action) => {
        state.pending = false;
        state.data = null;
        state.error = action.payload;
      })
      .addCase(saveInvoice.pending, (state) => {
        state.pending = true;
      });
  },
});

export const {} = apiSlice.actions;
export default apiSlice.reducer;
