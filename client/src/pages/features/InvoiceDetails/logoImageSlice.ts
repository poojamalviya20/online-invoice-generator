import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logo: "",
};

const logoImageSlice = createSlice({
  name: "logoimage",
  initialState,
  reducers: {
    addImage: (state: any, action: any) => {
      state.logo = action.payload;
    },
    removeImage: (state: any) => {
      state.logo = "";
    },
  },
});
export const { addImage, removeImage } = logoImageSlice.actions;
export default logoImageSlice.reducer;
