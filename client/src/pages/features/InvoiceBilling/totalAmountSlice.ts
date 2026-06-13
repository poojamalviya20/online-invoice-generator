import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalAmount: {
    totalLabel: "Total",
    total_amount: 0,
    amoutPaidLabel: "Amount Paid",
    paid_amount: 0,
    balanceDueLabel: "Balance Due",
    due_amount: 0,
  },
};
const totalAmountSlice = createSlice({
  name: "totalAmountSlice",
  initialState,
  reducers: {
    addItem: (state: any, action: any) => {
      const {
        totalLabel = "Total",
        total_amount = 0,
        amoutPaidLabel = "Amount Paid",
        paid_amount = 0,
        balanceDueLabel = "Balance Due",
        due_amount = 0,
      } = action.payload;
      state.totalAmount = {
        totalLabel,
        total_amount,
        amoutPaidLabel,
        paid_amount,
        balanceDueLabel,
        due_amount,
      };
    },
    updateItem(state: any, action) {
      const { name, value } = action.payload;
      state.totalAmount[name] = value;
    },
  },
});
export const { addItem, updateItem } = totalAmountSlice.actions;
export default totalAmountSlice.reducer;
