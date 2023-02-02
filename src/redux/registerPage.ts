import { createSlice } from "@reduxjs/toolkit";

export const registerUserSlice = createSlice({
  name: "showRegisterPage",
  initialState: {
    show: false,
    id: ''
  },
  reducers: {
    setRegisterSwitchOn: (state, id) => {
      state.show = true;
      state.id = id.payload
    },
    setRegisterSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setRegisterSwitchOn, setRegisterSwitchOff } = registerUserSlice.actions;
export default registerUserSlice.reducer;