import { createSlice } from '@reduxjs/toolkit';

const signUpInitialValueState = {
    userSignup: JSON.parse(localStorage.getItem("UserDetails"))
}

const signUpSlice = createSlice({
    name: "signup",
    initialState: signUpInitialValueState,
    reducers: {
        signup(state, action) {
            state.userSignup = action.payload;
            if (localStorage.UserDetails) {

                if (JSON.parse(localStorage.UserDetails).length) {
                    let existingDetails = JSON.parse(localStorage.getItem("UserDetails"));
                    let joinOnePlus = [...existingDetails, state.userSignup];
                    localStorage.setItem("UserDetails", JSON.stringify(joinOnePlus))
                }

            } else {
                localStorage.setItem("UserDetails", JSON.stringify([state.userSignup]));
            }
        }
    }
});

export const { signup } = signUpSlice.actions;

export const signUpData = (state) => state.signup.userSignup;

export default signUpSlice.reducer;

