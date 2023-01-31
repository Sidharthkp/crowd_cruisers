import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "createmodal",
  
  initialState: {
    show: false,
  },
  
  reducers: {
    setCreateSwitchOn: (state) => {
      state.show = true;
    },
    setCreateSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setCreateSwitchOff, setCreateSwitchOn } = modalSlice.actions;

export default modalSlice.reducer;