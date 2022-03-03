import React from 'react';
import WeatherPage_Current from './WeatherPage_Current';
import WeatherPage_Forecast from './WeatherPage_Forecast';

function WeatherJunction(props) {
    return (
        <div className='rrr'>

            <WeatherPage_Current />
            <WeatherPage_Forecast />

        </div>
    );
}

export default WeatherJunction;