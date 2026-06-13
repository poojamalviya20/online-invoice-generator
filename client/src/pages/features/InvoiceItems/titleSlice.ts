import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  itemTitles: {
    item: "Item",
    quantity: "Quantity",
    rate: "Rate",
    amount: "Amount",
  },
  deleted_item: [],
  updated_item: [],
};
const titleSlice = createSlice({
  name: "itemTitles",
  initialState,
  reducers: {
    setItemTitles: (state: any, action) => {
      const { name, value } = action.payload;
      state.itemTitles[name] = value;
    },
    setItemArray: (state: any, action: any) => {
      state.deleted_item.push(...action.payload.flat());
    },
  },
});
export const { setItemTitles, setItemArray } = titleSlice.actions;
export default titleSlice.reducer;
