import { createSlice } from "@reduxjs/toolkit";

export const createPostSlice = createSlice({
  name: "showCreatePost",
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

export const { setCreateSwitchOff, setCreateSwitchOn } = createPostSlice.actions;
export default createPostSlice.reducer;