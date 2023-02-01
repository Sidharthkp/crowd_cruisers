import { createSlice } from "@reduxjs/toolkit";

export const clickedGroup = createSlice({
  name: "openGroup",
  
  initialState: {
    show: false,
  },
  
  reducers: {
    openGroupSwitch: (state) => {
      state.show = true;
    },
    closeGroupSwitch: (state) => {
      state.show = false;
    },
  },
});

export const { closeGroupSwitch, openGroupSwitch } = clickedGroup.actions;

export default clickedGroup.reducer;