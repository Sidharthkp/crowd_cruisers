import { createSlice } from "@reduxjs/toolkit";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    authenticated: false,
  },
  reducers: {
    setAuthentication: (state) => {
      state.authenticated = true;
    },
    setNotAuthenticated: (state) => {
      state.authenticated = false;
    },
  },
});

export const { setAuthentication, setNotAuthenticated } = authenticationSlice.actions;
export default authenticationSlice.reducer;