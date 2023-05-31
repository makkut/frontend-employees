import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setIsLoggedIn: (state) => {
            state.isLoggedIn = !state.isLoggedIn;
        },
    },
});

export const { setIsLoggedIn } = authSlice.actions;

export default authSlice.reducer;
