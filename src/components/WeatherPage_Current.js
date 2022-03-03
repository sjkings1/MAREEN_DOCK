import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentWeather, currentWeatherSelector } from '../redux_properties/Current_Weather_Slice';
import { displayWeekDay, displayDayDate, displayTime, KelvinToCelsius } from './DataConverter';
import './WeatherPage_Current.css';



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Divider from '@mui/material/Divider';
import AirIcon from '@mui/icons-material/Air';
import ThermostatAutoIcon from '@mui/icons-material/ThermostatAuto';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ShowChartIcon from '@mui/icons-material/ShowChart';

function WeatherPage_Current() {
    debugger
    const dispatch = useDispatch();
    const { currentWeather, loading, hasErrors } = useSelector(currentWeatherSelector);

    useEffect(() => {
        dispatch(fetchCurrentWeather())
    }, [dispatch])

    const renderCurrentWeather = () => {
        if (loading) return <p>Loading Current Weather...</p>
        if (hasErrors) return <p>Cannot display Current Weather...</p>
        debugger
        console.log(currentWeather);

        // return (<div className='tile'>
        //     <h2>{currentWeather.sys.country}</h2>
        // </div>);
    }
    console.log(renderCurrentWeather)

    let content = renderCurrentWeather();

    return (

        <div className='weatherPage_current'>

            <section>

                <h1> CURRENT WEATHER PAGE </h1>
                <div className='content'> {content}  </div>

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

    );

}

export default WeatherPage_Current;

// currentWeather.weather[0]

// recipes.map(recipe =>
//     <div key={recipe.idMeal} className='tile'>
//       <h2>{recipe.strMeal}</h2>
//       <img src={recipe.strMealThumb} alt=''/>
//     </div>
//   )

