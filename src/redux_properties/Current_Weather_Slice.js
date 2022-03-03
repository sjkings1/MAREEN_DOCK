import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const initialStateHandler ={
    loading: false,
    hasErrors: false,
    currentWeather: []
}

const currentWeatherSlice = createSlice({
    name: "currentWeather",
    initialState: initialStateHandler,
    reducers: {
        getCurrentWeather: state => { state.loading = true },
        getCurrentWeatherSuccess: (state, { payload }) => { 
            state.currentWeather = payload
            state.loading = false
            state.hasErrors = false  
        },
        getCurrentWeatherFailure: state => {
            state.loading = false
            state.hasErrors = true
        }
    }
});

export function fetchCurrentWeather() {

    return ( async dispatch => {
      dispatch(getCurrentWeather())
  
      try {
        const currentSkyData = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=9df3f65223f5d0da919ec90525134833')
        // const currentWeatherData = currentSkyData
  debugger
        dispatch(getCurrentWeatherSuccess(currentSkyData.data))
      } catch (error) {
        dispatch(getCurrentWeatherFailure())
      }
    } )
  }

export const { getCurrentWeather, getCurrentWeatherSuccess, getCurrentWeatherFailure } = currentWeatherSlice.actions

export const currentWeatherSelector = state => state.currentWeather

export default currentWeatherSlice.reducer

// useEffect(() => {

//     axios.get("https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=9e705c4fbbddc26ba52837eabed2f0a4")
//       .then((response) => {
//         const weatherReport = response.data;
//         dispatch(
//           fetchWeather({
//             weatherReport,
//           })
//         );
//       })
//       .catch((err) => {
//         console.log(err.message);
//       });

//   }, [dispatch]);


















// export const fetchWeatherAction = createAsyncThunk(
//     'weather/fetch',
//     async (payload, { rejectWithValue, getState, dispatch }) => {

//         try {
//             const receive = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&q=${payload}&appid=57a71a1bf49617abd8d87730d65a3997`)
//         }
//         catch (error) {

             

//         }

//     }
// );