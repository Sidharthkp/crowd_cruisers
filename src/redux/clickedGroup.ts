import { createSlice } from "@reduxjs/toolkit";

export const clickedGroup = createSlice({
  name: "openGroup",
  
  initialState: {
    show: false,
    dataSave: ''
  },
  
  reducers: {
    openGroupSwitch: (state, data) => {
      state.show = true;
      state.dataSave = data.payload;
      
    },
    closeGroupSwitch: (state) => {
      state.show = false;
    }
  },
});

export const { closeGroupSwitch, openGroupSwitch } = clickedGroup.actions;

export default clickedGroup.reducer;