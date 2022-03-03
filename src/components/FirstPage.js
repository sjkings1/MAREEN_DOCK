import React from 'react';

import LandingScreen from './LandingScreen';
import { Grid, Paper } from '@mui/material';


function FirstPage(props) {

    const paperStyle = { padding: 20, height: '30vh', width: 580, margin: "10% auto", backgroundColor:'#00ff9d' }
    const wordStyle = { padding: '0%', fontSize: '5rem', color: '#1900ff'}

    return (
        <div className='firstpage'>

            <LandingScreen />

            <Paper elevation={20} style={paperStyle}>
                <Grid align='center'>
                    <h1 style={wordStyle}> WELCOME </h1>
                </Grid>
            </Paper>

        </div>
    );
}

export default FirstPage;