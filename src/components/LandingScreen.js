import React, { useEffect, useState } from 'react';

import './LandingScreen.css';
import { useLocation, Link } from 'react-router-dom';


function LandingScreen(props) {

    const [activeTab, setActiveTab] = useState();
    const location = useLocation();

    useEffect(() => {

        if (location.pathname === '/login_page') {
            setActiveTab("LOGIN")
        } else if (location.pathname === '/signup_page') {
            setActiveTab("SIGNUP")
        }

    }, [location]);


    return (

        <div className='header'>
            <p className='logo'> MAREEN + DOCK </p>

            <div className='header-right'>

                <Link to='/login_page'>
                    <p className={`${activeTab === "LOGIN" ? "active" : ""}`} onClick={() => setActiveTab("LOGIN")}>
                        LogIn
                    </p>
                </Link>

                <Link to='/signup_page'>
                    <p className={`${activeTab === "SIGNUP" ? "active" : ""}`} onClick={() => setActiveTab("SIGNUP")}>
                        SignUp
                    </p>
                </Link>

            </div>
        </div>

    );
}

export default LandingScreen;