import React from 'react';
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
import { displayWeekDay, displayDayDate, timestampToWeekDaysConversion, displayTime, timestampToHourConversion, KelvinToCelsius, KelvinToFahrenheit } from './DataConverter';

import { Card, CardContent, CardMedia, Typography, CardActionArea, Divider, Paper, Grid, Avatar, TextField, Button } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ShowChartIcon from '@mui/icons-material/ShowChart';


import { Field, Form, Formik, ErrorMessage } from 'formik';

import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import UnstyledTabsCustomized from './HF_Tabs_Component';
import SimpleMap from './GoogleMap';
import LoadingButtonsTransition from './ToggleCelFaren';
import MapsGoogleNew from './MapsGoogleNew';


function WeatherJunction(props) {

    debugger
    const [lat, setLat] = useState([]);
    const [lon, setLon] = useState([]);
    const dispatch = useDispatch();

    // GOOGLE PLACE API INTEGRATION
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [coordinatesForMap, setCoordinatesForMap] = useState({ lat: 25.276987, lng: 55.296249 });
    const [toggleCelsiusFahrenheit, setToggleCelsiusFahrenheit] = useState(false);

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0]);
        let lat = latlng.lat;
        let lon = latlng.lng;
        setAddress(value);
        dispatch(fetchCurrentWeather(lat, lon));
        dispatch(fetchForecastWeather(lat, lon));
        setCoordinatesForMap(latlng)
        setCoordinates(latlng);
    }

    // REFRESH BUTTON
    const refreshPage = () => {
        window.location.reload();
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
        function showPosition(position) {

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
                const currentSkyData = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=9df3f65223f5d0da919ec90525134833`)
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
                const currentSpaceData = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=9df3f65223f5d0da919ec90525134833`)
                debugger
                // currentSpaceData.data.hourly.forEach((e) => {
                //     e.time = displayTime(e.dt);
                //     e.icon = e.weather[0].icon;
                //     e.degree = KelvinToCelsius(e.temp);
                //     e.day = displayWeekDay(e.dt);
                // })

                let twentyfourHoursData = currentSpaceData.data.hourly.slice(0, 24)

                currentSpaceData.data.hourly = twentyfourHoursData;

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

    const renderForecastWeather = () => {
        if (loadingF) return <p>Loading Forecast Weather...</p>
        if (hasErrorsF) return <p>Cannot display Forecast Weather...</p>
        debugger
        console.log(forecastWeather);
    }

    const renderForecast_HourlyWeather = () => {
        if (loadingF) return <p>Loading 24 Hours Forecast Weather...</p>
        if (hasErrorsF) return <p>Cannot display 24 Hours Forecast Weather...</p>
    }

    let currentData = renderCurrentWeather();

    let forecastData = renderForecastWeather();

    let forecast_HourlyData = renderForecast_HourlyWeather();

    const renderingUIForecastWeather = () => {

        return (

            <div className='weatherPage_forecast'>

                <section>

                    <h1> FORECAST WEATHER PAGE </h1>
                    <div className='forecast_data'> {forecastData}  </div>

                    <Card elevation={20}>

                        <CardActionArea>

                            <CardContent>

                                <Typography gutterBottom variant="h4" component="div"> <h1 className='country_name'>
                                    {currentWeather?.sys?.country} / {currentWeather.name}
                                    {/* {forecastWeather.timezone} */}
                                </h1> </Typography>

                                <Grid align='left'> <h3 className='next_7_days'> Next 7 Days </h3> </Grid>

                                <Typography variant="body2" color="textPrimary">

                                    {forecastWeather.daily && forecastWeather.daily.length > 0 ? forecastWeather.daily.map(e => {
                                        return (

                                            <div className='components'>

                                                <div className='compA'>

                                                    <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} />
                                                    <h2 className='dayDate'> {displayDayDate(e.dt)} </h2>

                                                </div>

                                                <div className='compB'>

                                                    <h3 className='tempMin'> {toggleCelsiusFahrenheit ? KelvinToFahrenheit(e?.temp?.min) : KelvinToCelsius(e?.temp?.min)}{toggleCelsiusFahrenheit ? "°F" : "°C"} </h3>
                                                    

                                                    <h4 className='tempMax'> {"/"}{toggleCelsiusFahrenheit ? KelvinToFahrenheit(e?.temp?.max) : KelvinToCelsius(e?.temp?.max)}{toggleCelsiusFahrenheit ? "°F" : "°C"} </h4>

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

    const renderingUIForecast_HourlyWeather = () => {

        return (

            <div className='weatherPage_forecast_hourly'>

                <section>

                    <h1> 24 HOURS FORECAST WEATHER </h1>
                    <div className='forecast_data'> {forecast_HourlyData}  </div>

                    <Card elevation={20}>

                        <CardActionArea>

                            <CardContent>

                                <Typography variant="body2" color="textPrimary">

                                    {forecastWeather.hourly && forecastWeather.hourly.length > 0 ? forecastWeather.hourly.map((e, index) => {
                                        return (

                                            <div className='components'>

                                                <h2 className='time'> {index == 0 ? "Now - " : null} {displayTime(e.dt)}  </h2>

                                                <div className='icon_degree'>
                                                    <img src={`http://openweathermap.org/img/wn/${e.weather[0].icon}@2x.png`} />
                                                    <h2 className='degree'> {toggleCelsiusFahrenheit ? KelvinToFahrenheit(e.temp) : KelvinToCelsius(e.temp)}{toggleCelsiusFahrenheit ? "°F" : "°C"} </h2>
                                                </div>

                                                <h2 className='day'> {displayWeekDay(e.dt)} </h2>

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

    return (

        <div className='weatherJunction'>

            <div className='getWeatherClick'>
                <Grid className="">
                    <Paper elevation={20}>
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
                                    <Button variant="contained" onClick={refreshPage} fullWidth> REFRESH </Button>
                                    <LoadingButtonsTransition toggleProp={setToggleCelsiusFahrenheit} currentStatusOfToggle={toggleCelsiusFahrenheit} />
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
                            {/* <p> ADDRESS: {address} </p> */}


                            {/* <input {...getInputProps({ placeholder: "address type it" })} /> */}
                            <div className='googlePlace'> <TextField className='item' id="filled-basic" label="SEARCH" variant="filled" {...getInputProps({ placeholder: "Type the Address you Want ?" })} fullWidth /> </div>

                            <div>

                                {loading ? <div>...loading</div> : null}

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

            <div className='uniteWeatherMap'>

                <div className='weatherPage_current'>

                    <section>

                        <h1> CURRENT WEATHER PAGE </h1>
                        <div className='content'> {currentData}  </div>

                        <Card elevation={20}>

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

                                    <Typography gutterBottom variant="h5" component="div"> <h5 className='main_degree'>{toggleCelsiusFahrenheit ? KelvinToFahrenheit(currentWeather?.main?.temp) : KelvinToCelsius(currentWeather?.main?.temp)}{toggleCelsiusFahrenheit ? "°F" : "°C"} </h5> </Typography>

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

                <div className='googleMapReact'>

                    <Card>

                        <CardActionArea>

                            <CardContent>

                                <SimpleMap key={JSON.stringify(coordinatesForMap)} center={coordinatesForMap} zoom={11} />

                            </CardContent>

                        </CardActionArea>

                    </Card>

                </div >

            </div >

            <UnstyledTabsCustomized hidingForecastHourlyWeatherComponent={renderingUIForecast_HourlyWeather()} hidingForecastWeatherComponent={renderingUIForecastWeather()} />

            {/* <MapsGoogleNew /> */}

        </div >

    );
}

export default WeatherJunction;