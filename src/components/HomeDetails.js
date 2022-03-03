import React from 'react';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './HomeDetails.css';
import './LandingScreen.css';

import { Grid, Paper, Button } from '@mui/material';

function HomeDetails(props) {

    const paperStyle = { padding: 20, height: '60vh auto', width: 580, margin: "2% auto", backgroundColor: '#070048' }
    const wordStyleh1 = { padding: '0%', fontSize: '2rem', color: '#78b8ff' }
    const wordStyleh3 = { color: '#ffffff' }
    const [userData, setUserData] = useState({});
    const history = useHistory();

    useEffect(() => {
        if (history.location.state.state) {
            setUserData(history.location.state.state.data);
        }
    }, "");

    function logout() {
        history.push('/login_page')
    }

    function weather_junction() {
        history.push('/weather_junction')
    }

    return (

        <div className='homedetails'>

            <div className='header'> <p className='logo'> MAREEN + DOCK </p> </div>

            <div>

                <Paper elevation={20} style={paperStyle}>

                    <Grid align='center'>

                        <h1 style={wordStyleh1}> DASHBOARD DETAILS </h1>
                        {Object.keys(userData).length ? [userData].map((e) => (

                            <div>
                                <h3 style={wordStyleh3}> FULL NAME : {e.firstname + e.lastname} </h3>
                                <h3 style={wordStyleh3}> GENDER : {e.gender} </h3>
                                <h3 style={wordStyleh3}> AGE : {e.age} </h3>
                                <h3 style={wordStyleh3}> D.O.B : {e.dob} </h3>
                                <h3 style={wordStyleh3}> EMAIL : {e.email} </h3>
                                <h3 style={wordStyleh3}> PHONE NUMBER : {e.phonenumber} </h3>
                            </div>

                        )) : ""}

                        <Button variant="contained" color="error" type="submit" onClick={logout} fullWidth>  LOGOUT </Button>

                        <div className='weatherdirection'> <Button variant="contained" color="primary" type="submit" onClick={weather_junction} fullWidth>  WEATHER / DETAILS </Button> </div>

                    </Grid>

                </Paper>



            </div>

        </div>

    );

}

export default HomeDetails;