import { createSlice } from "@reduxjs/toolkit";

export const membersJoinedSlice = createSlice({
  name: "usersJoined",
  
  initialState: {
    show: false,
    data: ''
  },
  
  reducers: {
    setJoinedSwitchOn: (state, data) => {
      state.show = true;
      state.data = data.payload
    },
    setSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setSwitchOff, setJoinedSwitchOn } = membersJoinedSlice.actions;

export default membersJoinedSlice.reducer;