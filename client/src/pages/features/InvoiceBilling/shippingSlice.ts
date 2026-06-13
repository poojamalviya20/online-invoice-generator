import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shipping: {
    shippingLabel: "Shipping",
    shipping_charge: 0,
  },
};
const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    addItem: (state: any, action: any) => {
      state.shipping.push(action.payload);
    },
    updateItem(state: any, action) {
      const { name, value } = action.payload;
      state.shipping[name] = value;
    },
  },
});
export const { addItem, updateItem } = shippingSlice.actions;
export default shippingSlice.reducer;
