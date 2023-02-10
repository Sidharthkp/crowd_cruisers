import { createSlice } from "@reduxjs/toolkit";

export const showEditDpSlice = createSlice({
  name: "showEditDp",
  initialState: {
    show: false,
    dataSave: ''
  },
  reducers: {
    setEditDpSwitchOn: (state, data) => {
      state.show = true;
      state.dataSave = data.payload
    },
    setEditDpSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setEditDpSwitchOn, setEditDpSwitchOff } = showEditDpSlice.actions;
export default showEditDpSlice.reducer;