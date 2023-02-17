import { createSlice } from "@reduxjs/toolkit";

export const booleanSlice = createSlice({
    name: "changeBoolean",

    initialState: {
        boolean: false,
    },

    reducers: {
        booleanSwitch: (state) => {
            if (state.boolean == false) {
                state.boolean = true
            } else {
                state.boolean = false
            }
        }
    },
});

export const { booleanSwitch } = booleanSlice.actions;

export default booleanSlice.reducer;