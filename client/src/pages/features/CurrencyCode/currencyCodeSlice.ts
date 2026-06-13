import { createSlice } from "@reduxjs/toolkit";
import codes from "../../../../public/codes.json";
const initialState = {
  options: codes.options,
  currency_code: null,
};
const currencyCodeSlice = createSlice({
  name: "currencyCode",
  initialState,
  reducers: {
    selectOption: (state: any, action: any) => {
      state.currency_code = action.payload;
    },
  },
});
export const { selectOption } = currencyCodeSlice.actions;
export default currencyCodeSlice.reducer;
