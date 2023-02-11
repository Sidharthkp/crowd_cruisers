import { createSlice } from "@reduxjs/toolkit";

export const showEditGrpDpSlice = createSlice({
  name: "showEditGrpDp",
  initialState: {
    show: false,
    dataSave: ''
  },
  reducers: {
    setEditGrpDpSwitchOn: (state, data) => {
      state.show = true;
      state.dataSave = data.payload
    },
    setEditGrpDpSwitchOff: (state) => {
      state.show = false;
    },
  },
});

export const { setEditGrpDpSwitchOn, setEditGrpDpSwitchOff } = showEditGrpDpSlice.actions;
export default showEditGrpDpSlice.reducer;