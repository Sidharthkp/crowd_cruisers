import { createSlice } from "@reduxjs/toolkit";

export const showEditUserSlice = createSlice({
  name: "showEditUser",
  initialState: {
    show: false,
    dataSave: ''
  },
  reducers: {
    setEditUserSwitchOn: (state, data) => {
      state.show = true;
      state.dataSave = data.payload
    },
    setEditUserSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setEditUserSwitchOn, setEditUserSwitchOff } = showEditUserSlice.actions;
export default showEditUserSlice.reducer;