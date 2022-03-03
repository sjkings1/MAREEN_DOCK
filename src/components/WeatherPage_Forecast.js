import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForecastWeather, forecastWeatherSelector } from '../redux_properties/Forecast_Weather_Slice';
import { displayDayDate, KelvinToCelsius } from './DataConverter';
import "./WeatherPage_Forecast.css";

import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';


function WeatherPage_Forecast() {
    debugger
    const dispatch = useDispatch();
    const { forecastWeather, loading, hasErrors } = useSelector(forecastWeatherSelector);

    useEffect(() => {
        dispatch(fetchForecastWeather())
    }, [])

    const renderForecastWeather = () => {
        if (loading) return <p>Loading Forecast Weather...</p>
        if (hasErrors) return <p>Cannot display Forecast Weather...</p>
        debugger
        console.log(forecastWeather);
    }
    console.log(renderForecastWeather)

    let forecastData = renderForecastWeather();

    return (

        <div className='weatherPage_forecast'>

            <section>

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