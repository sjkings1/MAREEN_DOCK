import React from 'react';
// import WeatherPage_Current from './WeatherPage_Current';
// import WeatherPage_Forecast from './WeatherPage_Forecast';
import axios from "axios";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { currentWeatherSelector } from '../redux_properties/Current_Weather_Slice';
import { getCurrentWeather, getCurrentWeatherFailure, getCurrentWeatherSuccess } from '../redux_properties/Current_Weather_Slice';

import { forecastWeatherSelector } from '../redux_properties/Forecast_Weather_Slice';
import { getForecastWeather, getForecastWeatherSuccess, getForecastWeatherFailure } from '../redux_properties/Forecast_Weather_Slice';


import './WeatherPage_Current.css';
import "./WeatherPage_Forecast.css";
import "./WeatherJunction.css"
import { displayWeekDay, displayDayDate, displayTime, KelvinToCelsius } from './DataConverter';

import { Card, CardContent, CardMedia, Typography, CardActionArea, Divider, Paper, Grid, Avatar, TextField, Button } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ShowChartIcon from '@mui/icons-material/ShowChart';


import { Field, Form, Formik, ErrorMessage } from 'formik';

import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


function WeatherJunction(props) {

    debugger
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);
    const dispatch = useDispatch();

    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latlng);
    }

    // WEATHERPAGE_CURRENT
    const { currentWeather, loadingC, hasErrorsC } = useSelector(currentWeatherSelector);
    // WEATHERPAGE_FORECAST
    const { forecastWeather, loadingF, hasErrorsF } = useSelector(forecastWeatherSelector);


    useEffect(() => {

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.watchPosition(showPosition);
            } else {
                // x.innerHTML = "Geolocation is not supported by this browser.";
            }
        }
        function showPosition() {

            dispatch(fetchCurrentWeather(lat, lon))
            dispatch(fetchForecastWeather(lat, lon))

            // dispatch(fetchCurrentWeather(position.coords.latitude, position.coords.longitude))
            // dispatch(fetchForecastWeather(position.coords.latitude, position.coords.longitude))
        }
        getLocation();

    }, [])

    function fetchCurrentWeather(lat, lon) {

        return (async dispatch => {
            dispatch(getCurrentWeather())
            try {
                const currentSkyData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=4cd569ffb3ecc3bffe9c0587ff02109f`)
                debugger
                dispatch(getCurrentWeatherSuccess(currentSkyData.data))
            } catch (error) {
                dispatch(getCurrentWeatherFailure())
            }
        })
    }
debugger
    function fetchForecastWeather(lat, lon) {

        return (async dispatch => {
            dispatch(getForecastWeather())
            try {
                const currentSpaceData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=4cd569ffb3ecc3bffe9c0587ff02109f`)
                debugger
                dispatch(getForecastWeatherSuccess(currentSpaceData.data))
            } catch (error) {
                dispatch(getForecastWeatherFailure())
            }
        })
    }

    const renderCurrentWeather = () => {
        if (loadingC) return <p>Loading Current Weather...</p>
        if (hasErrorsC) return <p>Cannot display Current Weather...</p>
        debugger
        console.log(currentWeather);
    }
    console.log(renderCurrentWeather)

    const renderForecastWeather = () => {
        if (loadingF) return <p>Loading Forecast Weather...</p>
        if (hasErrorsF) return <p>Cannot display Forecast Weather...</p>
        debugger
        console.log(forecastWeather);
    }
    console.log(renderForecastWeather)

    let currentData = renderCurrentWeather();

    let forecastData = renderForecastWeather();

    return (
        <div className='weatherJunction'>

            <div className='getWeatherClick'>
                <Grid className="">
                    <Paper elevation={10}>
                        <Formik>
                            {() => (
                                <Form>
                                    <Field as={TextField} id="outlined-required" value={lat} onChange={data => setLat(data.target.value)} label="Latitude" type="number" name="latitude" placeholder="latitude" fullWidth />
                                    <Field as={TextField} id="outlined-required" value={lon} onChange={data => setLon(data.target.value)} label="Longitude" type="number" name="longitude" placeholder="longitude" fullWidth />
                                    <Button variant="contained" onClick={
                                        () => {
                                            dispatch(fetchCurrentWeather(lat, lon));
                                            dispatch(fetchForecastWeather(lat, lon));
                                        }
                                    } fullWidth> GET WEATHER </Button>
                                </Form>
                            )}
                        </Formik>
                    </Paper>
                </Grid>

                <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>

                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>

                        <p> LATITUDE: {coordinates.lat} </p>
                        <p> LONGITUDE: {coordinates.lng} </p>
                        <p> ADDRESS: {address} </p>


                        <input {...getInputProps({ placeholder: "address type it" })} />

                        <div>

                            {/* {loading ? <div>...loading</div> : null} */}

                            {suggestions.map(e => {

                                const style = {
                                    backgroundColor: e.active ? "#0CACFF" : "#C5C5C5"
                                };


                                return (
                                    <div {...getSuggestionItemProps(e, { style })}>
                                        {e.description}
                                    </div>
                                );
                            })}

                        </div>

                    </div>
                )}

            </PlacesAutocomplete>


            </div>

            <div className='weatherPage_current'>

                <section>

                    <h1> CURRENT WEATHER PAGE </h1>
                    <div className='content'> {currentData}  </div>

                    <Card sx={{ maxWidth: 500 }}>

                        <CardActionArea>

                            <CardContent>

                                <Typography gutterBottom variant="h4" component="div"> <h1 className='country_name'>{currentWeather.name}, {currentWeather?.sys?.country}</h1> </Typography>

                                <CardMedia component="img" height="50" image={`http://openweathermap.org/img/wn/${currentWeather.weather && currentWeather.weather.length ? currentWeather.weather[0].icon : null}@2x.png`} />

                                {/* <Typography variant="body2" color="textPrimary">
                    {currentWeather.weather && currentWeather.weather.length > 0 ? currentWeather.weather.map(e => { return (<h2 className='description'> {e.description} </h2>) }) : null}
                </Typography> */}

                                {/* <h3>{currentWeather?.weather[0]}</h3> */}

                                <Typography variant="body2" color="textPrimary"> <h2> {currentWeather.weather && currentWeather.weather.length ? currentWeather.weather[0].description : null} </h2> </Typography>

                                <Typography gutterBottom variant="h5" component="div"> <h5 className='date'>{displayWeekDay(currentWeather?.dt)} </h5> </Typography>

                                <Typography gutterBottom variant="h5" component="div"> <h5 className='main_degree'>{KelvinToCelsius(Math.ceil(Number(currentWeather?.main?.temp)))}{""} ° </h5> </Typography>

                                <Divider />

                                <div className='row1'>

                                    <Typography gutterBottom variant="h5" component="div"> <AirIcon /> <h5 className='speed'>{currentWeather?.wind?.speed} km/j</h5> </Typography>

                                    <Divider orientation="vertical" flexItem />

                                    <Typography gutterBottom variant="h5" component="div"> <ThermostatAutoIcon /> <h5 className='feels_like'>{KelvinToCelsius(currentWeather?.main?.feels_like)} ° </h5> </Typography>

                                </div>

                                <div className='row2'>

                                    <Typography gutterBottom variant="h5" component="div"> <WbSunnyIcon /> <h5 className='sunrise'>{displayTime(currentWeather?.sys?.sunrise)} hrs</h5> </Typography>

                                    <Typography gutterBottom variant="h5" component="div"> <ShowChartIcon /> <h5 className='pressure'>{currentWeather?.main?.pressure} mbar </h5> </Typography>

                                </div>

                            </CardContent>

                        </CardActionArea>

                    </Card>

                </section>

            </div>


            <div className='weatherPage_forecast'>

                <section>

                    <h1> FORECAST WEATHER PAGE </h1>
                    <div className='forecast_data'> {forecastData}  </div>

                    <Card elevation={20}>

                        <CardActionArea>

                            <CardContent>

                                <Typography gutterBottom variant="h4" component="div"> <h1 className='country_name'> {currentWeather?.sys?.country} / {currentWeather.name}  </h1> </Typography>

                                <Grid align='left'> <h3 className='next_7_days'> Next 7 Days </h3> </Grid>

                                <Typography variant="body2" color="textPrimary">

                                    {forecastWeather.daily && forecastWeather.daily.length > 0 ? forecastWeather.daily.map(e => {
                                        return (

                                            <div className='components'>

                                                <div className='compA'>

                                                    <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} />
                                                    <h2 className='dayDate'> {displayDayDate(e.dt)} </h2>

                                                </div>

                                                <div classDate='compB'>

                                                    <h3 className='tempMax'> {KelvinToCelsius(e?.temp?.max)} </h3>

                                                    <h4 className='tempMin'> / {KelvinToCelsius(e?.temp?.min)} ° </h4>

                                                </div>

                                            </div>
                                        )
                                    }) : null}

                                </Typography>

                            </CardContent>

                        </CardActionArea>

                    </Card>

                </section>

            </div>


        </div>
    );
}

export default WeatherJunction;