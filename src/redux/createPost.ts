import { createSlice } from "@reduxjs/toolkit";

export const createPostSlice = createSlice({
  name: "showCreatePost",
  initialState: {
    show: false,
    dataSave: ''
  },
  reducers: {
    setCreateSwitchOn: (state, data) => {
      state.show = true;
      state.dataSave = data.payload
    },
    setCreateSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setCreateSwitchOff, setCreateSwitchOn } = createPostSlice.actions;
export default createPostSlice.reducer;