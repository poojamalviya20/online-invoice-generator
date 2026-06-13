import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isHiddenDiscount: true,
  isHiddenTax: true,
  isHiddenShipping: true,
};
const hiddenSlice = createSlice({
  name: "hidden",
  initialState,
  reducers: {
    handleDiscount: (state: any): any => {
      state.isHiddenDiscount = false;
    },
    hideDiscount(state: any) {
      state.isHiddenDiscount = true;
    },
    handleTax: (state: any): any => {
      state.isHiddenTax = false;
    },
    hideTax(state: any) {
      state.isHiddenTax = true;
    },
    handleShipping: (state: any): any => {
      state.isHiddenShipping = false;
    },
    hideShipping(state: any) {
      state.isHiddenShipping = true;
    },
  },
});
export const {
  handleDiscount,
  hideDiscount,
  handleTax,
  hideTax,
  handleShipping,
  hideShipping,
} = hiddenSlice.actions;
export default hiddenSlice.reducer;
