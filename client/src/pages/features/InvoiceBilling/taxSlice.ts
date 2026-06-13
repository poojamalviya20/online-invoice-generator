import { PERCENTAGE } from "@/constant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tax: {
    taxLabel: "Tax",
    tax: 0,
  },
  toggle: false,
  tax_option: PERCENTAGE,
};
const taxSlice = createSlice({
  name: "tax",
  initialState,
  reducers: {
    addItem: (state: any, action: any) => {
      state.tax.push(action.payload);
    },
    updateItem(state: any, action) {
      const { name, value } = action.payload;
      state.tax[name] = value;
    },
    setToggle(state: any, action) {
      const { toggleValue } = action.payload;
      state.toggle = toggleValue;
    },
    setTaxOption(state: any, action) {
      state.tax_option = action.payload;
    },
  },
});
export const { addItem, updateItem, setToggle, setTaxOption } =
  taxSlice.actions;
export default taxSlice.reducer;
