import { configureStore } from "@reduxjs/toolkit";

import SignUp_Slice from "./SignUp_Slice";
import Login_Slice from "./Login_Slice";
import Current_Weather_Slice from "./Current_Weather_Slice";
import Forecast_Weather_Slice from "./Forecast_Weather_Slice";


export const store = configureStore({

    reducer: {
        signup: SignUp_Slice,
        login: Login_Slice,
        currentWeather: Current_Weather_Slice,
        forecastWeather: Forecast_Weather_Slice
    }

});

export default store;