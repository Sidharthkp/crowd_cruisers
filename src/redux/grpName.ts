import { createSlice } from "@reduxjs/toolkit";

export const showEditGrpNameSlice = createSlice({
    name: "showEditGrpName",
    initialState: {
        show: false,
        dataSave: ''
    },
    reducers: {
        setEditGrpNameSwitchOn: (state, data) => {
            state.show = true;
            state.dataSave = data.payload
        },
        setEditGrpNameSwitchOff: (state) => {
            state.show = false;
        },
    },
});

export const {setEditGrpNameSwitchOn, setEditGrpNameSwitchOff } = showEditGrpNameSlice.actions;
export default showEditGrpNameSlice.reducer;