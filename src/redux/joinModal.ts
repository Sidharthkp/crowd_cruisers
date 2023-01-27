import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "showmodal",
  initialState: {
    show: false,
  },
  reducers: {
    setSwitchOn: (state) => {
      state.show = true;
    },
    setSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setSwitchOff, setSwitchOn } = modalSlice.actions;
export default modalSlice.reducer;