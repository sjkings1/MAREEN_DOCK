import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forecastWeatherSelector } from '../redux_properties/Forecast_Weather_Slice';
import { displayDayDate, displayWeekDay, KelvinToCelsius } from './DataConverter';
import "./WeatherPage_Forecast.css";
import { getForecastWeather, getForecastWeatherSuccess, getForecastWeatherFailure } from '../redux_properties/Forecast_Weather_Slice';
import axios from "axios";
import { useState } from 'react';

import { Card, CardContent, CardMedia, Typography, CardActionArea, Divider, Paper, Grid, Avatar, TextField, Button } from '@mui/material';
import { Field, Form, Formik, ErrorMessage } from 'formik';



function WeatherPage_Forecast() {
    debugger
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);
    const dispatch = useDispatch();
    const { forecastWeather, loadingF, hasErrorsF } = useSelector(forecastWeatherSelector);

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(function (position) {
            setLat(position.coords.latitude);
            setLon(position.coords.longitude);
        });

        
        dispatch(fetchForecastWeather(lat,))

    }, [])





    function fetchForecastWeather() {

        return (async dispatch => {
            dispatch(getForecastWeather())
    
            try {
                const currentSpaceData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=9df3f65223f5d0da919ec90525134833`)
    
                debugger
                dispatch(getForecastWeatherSuccess(currentSpaceData.data))
    
            } catch (error) {
    
                dispatch(getForecastWeatherFailure())
            }
        })
    }

    const renderForecastWeather = () => {
        if (loadingF) return <p>Loading Forecast Weather...</p>
        if (hasErrorsF) return <p>Cannot display Forecast Weather...</p>
        debugger
        console.log(forecastWeather);
    }
    console.log(renderForecastWeather)

    let forecastData = renderForecastWeather();

    return (

        <div className='weatherPage_forecast'>

            <section>

            <Grid className="">
                <Paper elevation={10}>
                    <Formik>
                        {() => (
                            <Form>
                                <Field as={TextField} id="outlined-required" value={lat} onChange={e => setLat(e.target.value)} label="Latitude" type="number" name="latitude" placeholder="latitude" fullWidth />
                                <Field as={TextField} id="outlined-required" value={lon} onChange={e => setLon(e.target.value)} label="Longitude" type="number" name="longitude" placeholder="longitude" fullWidth />
                                <Button variant="contained" onClick={() => dispatch(fetchForecastWeather(lat, lon))} fullWidth> GET WEATHER </Button>
                            </Form>
                        )}
                    </Formik>
                </Paper>
            </Grid>


                <h1> FORECAST WEATHER PAGE </h1>
                <div className='forecast_data'> {forecastData}  </div>

                <Card elevation={20}>

                    <CardActionArea>

                        <CardContent>

                            <Typography gutterBottom variant="h4" component="div"> <h1 className='country_name'> {forecastWeather.timezone} </h1> </Typography>

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

    );
}

export default WeatherPage_Forecast;