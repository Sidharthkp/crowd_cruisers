import { createSlice } from "@reduxjs/toolkit";

export const membersSlice = createSlice({
  name: "showmembers",
  
  initialState: {
    show: false,
    data: ''
  },
  
  reducers: {
    setSwitchOn: (state, data) => {
      state.show = true;
      state.data = data.payload
    },
    setSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setSwitchOff, setSwitchOn } = membersSlice.actions;

export default membersSlice.reducer;