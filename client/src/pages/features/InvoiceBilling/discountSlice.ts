import { PERCENTAGE } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  discount: {
    discountLabel: "Discount",
    discount: 0,
  },
  toggle: false,
  discount_option: PERCENTAGE,
};
const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    addItem: (state: any, action: any) => {
      state.discount.push(action.payload);
    },
    updateItem(state: any, action) {
      const { name, value } = action.payload;
      state.discount[name] = value;
    },
    setToggle(state: any, action) {
      const { toggleValue } = action.payload;
      state.toggle = toggleValue;
    },
    setDiscountOption(state: any, action) {
      state.discount_option = action.payload;
    },
  },
});
export const { addItem, updateItem, setToggle, setDiscountOption } =
  discountSlice.actions;
export default discountSlice.reducer;
