import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

export const initialStateHandler = {
    loadingF: false,
    hasErrorsF: false,
    forecastWeather: []
}

const forecastWeatherSlice = createSlice({
    name: "forecastWeather",
    initialState: initialStateHandler,
    reducers: {
        getForecastWeather: state => { state.loadingF = true },
        getForecastWeatherSuccess: (state, { payload }) => {
            state.forecastWeather = payload
            state.loadingF = false
            state.hasErrorsF = false
        },
        getForecastWeatherFailure: state => {
            state.loadingF = false
            state.hasErrorsF = true
        }
    }
});

// export function fetchForecastWeather() {

//     return (async dispatch => {
//         dispatch(getForecastWeather())

//         try {
//             const currentSpaceData = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=9df3f65223f5d0da919ec90525134833')

//             debugger
//             dispatch(getForecastWeatherSuccess(currentSpaceData.data))

//         } catch (error) {

//             dispatch(getForecastWeatherFailure())
//         }
//     })
// }

export const { getForecastWeather, getForecastWeatherSuccess, getForecastWeatherFailure } = forecastWeatherSlice.actions

export const forecastWeatherSelector = state => state.forecastWeather

export default forecastWeatherSlice.reducer