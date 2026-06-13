import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  subTotal: {
    subTotalLabel: "Subtotal",
    subtotal: 0,
  },
};
const subTotalSlice = createSlice({
  name: "subTotal",
  initialState,
  reducers: {
    addItem: (state: any, action: any) => {
      const { subTotalLabel = "Subtotal", subtotal = 0 } = action.payload;
      state.subTotal = { subTotalLabel, subtotal };
    },
    updateItem: (state: any, action) => {
      const { name, value } = action.payload;
      state.subTotal[name] = value;
    },
  },
});
export const { addItem, updateItem } = subTotalSlice.actions;
export default subTotalSlice.reducer;
