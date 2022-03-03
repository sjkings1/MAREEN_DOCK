import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialStateHandler = {
    loading: false,
    hasErrors: false,
    forecastWeather: []
}

const forecastWeatherSlice = createSlice({
    name: "forecastWeather",
    initialState: initialStateHandler,
    reducers: {
        getForecastWeather: state => { state.loading = true },
        getForecastWeatherSuccess: (state, { payload }) => {
            state.forecastWeather = payload
            state.loading = false
            state.hasErrors = false
        },
        getForecastWeatherFailure: state => {
            state.loading = false
            state.hasErrors = true
        }
    }
});

export function fetchForecastWeather() {

    return (async dispatch => {
        dispatch(getForecastWeather())

        try {
            const currentSpaceData = await axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&appid=9df3f65223f5d0da919ec90525134833')

            debugger
            dispatch(getForecastWeatherSuccess(currentSpaceData.data))

        } catch (error) {

            dispatch(getForecastWeatherFailure())
        }
    })
}

export const { getForecastWeather, getForecastWeatherSuccess, getForecastWeatherFailure } = forecastWeatherSlice.actions

export const forecastWeatherSelector = state => state.forecastWeather

export default forecastWeatherSlice.reducer