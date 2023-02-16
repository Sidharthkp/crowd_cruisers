import { createSlice } from "@reduxjs/toolkit";

export const unRegisterUserSlice = createSlice({
  name: "showUnRegisterPage",
  initialState: {
    show: false,
    id: ''
  },
  reducers: {
    setUnRegisterSwitchOn: (state, id) => {
      state.show = true;
      state.id = id.payload
    },
    setUnRegisterSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setUnRegisterSwitchOn, setUnRegisterSwitchOff } = unRegisterUserSlice.actions;
export default unRegisterUserSlice.reducer;