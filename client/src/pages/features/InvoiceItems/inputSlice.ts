import { createSlice } from "@reduxjs/toolkit";

const inputFieldsSlice = createSlice({
  name: "inputFields",
  initialState: [
    {
      product_name: "",
      rate_amount: 0,
      quantity: 1,
      total_amount: "",
    },
  ],
  reducers: {
    addInputField: (state) => {
      state.push({
        product_name: "",
        rate_amount: 0,
        quantity: 1,
        total_amount: "",
      });
    },
    removeInputField: (state, action) => {
      state.splice(action.payload, 1);
    },
    updateInputField: (state, action) => {
      const { index, name, value } = action.payload;
      const field: any = state[index];
      field[name] = value;
      field.total_amount = Number(field.rate_amount) * Number(field.quantity);
    },
    updateInputFields: (state, action) => {
      return action.payload;
    },
  },
});

export const {
  addInputField,
  removeInputField,
  updateInputField,
  updateInputFields,
} = inputFieldsSlice.actions;
export default inputFieldsSlice.reducer;
