import { createSlice } from "@reduxjs/toolkit";

const loginInitialValueState = {
    userLogin: JSON.parse(localStorage.getItem("UserDetails"))
}

const loginSlice = createSlice({
    name: "login",
    initialState: loginInitialValueState,
    reducers: {
        login(state, action) {
            state.userLogin = action.payload;
            JSON.parse(localStorage.getItem("UserDetails"))
            // localStorage.getItem("UserDetails", JSON.parse(state.userLogin));
            // localStorage.setItem("UserDetails", JSON.stringify(state.userLogin));
            
        }
    }
});

export const { login } = loginSlice.actions;

export const loginData = (state) => state.login.userLogin;

export default loginSlice.reducer;