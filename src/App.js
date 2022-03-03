import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import { loginData } from './redux_properties/Login_Slice';
// import PrivateRoutes from './components/PrivateRoutes';

import './App.css';
import FirstPage from './components/FirstPage';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';
import HomeDetails from './components/HomeDetails';
import WeatherJunction from './components/WeatherJunction';

// export const routePaths = {
//   HOMEDETAILS: "/home",
//   LOGIN: "/login_page",
//   SIGNUP: "/signup_page",
// };


function App() {
  return (

    <Router>

      <div className="App">

        <Fragment>

          <Switch>
            <Route exact path="/" component={FirstPage} />
            <Route exact path="/signup_page" component={SignUpForm} />
            <Route exact path="/login_page" component={LoginForm} />
            <Route exact path="/home" component={HomeDetails} />
            <Route exact path="/weather_junction" component={WeatherJunction} />
          </Switch>

        </Fragment>

        {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p> Edit <code>src/App.js</code> and save to reload. </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer"> Learn React </a>
      </header> */}

      </div>

    </Router>
  );

  // const userDot = useSelector(loginData);

  // let restrictedRoutes = null;

  // if (!userDot) {
  //   restrictedRoutes = (
  //     <>
  //       <Route exact path={routePaths.SIGNUP} component={SignUpForm} />
  //       <Route exact path={routePaths.LOGIN} component={LoginForm} />
  //       <Route exact path="*" component={<Redirect to={routePaths.LOGIN} />} />
  //     </>
  //   );
  // } else {
  //   restrictedRoutes = (
  //     <>
  //       <Route exact path="*" component={<Redirect to={routePaths.DASHBOARD} />} />
  //       <Route exact path={routePaths.DASHBOARD} component={<PrivateRoutes> <HomeDetails /> </PrivateRoutes>}
  //       />
  //     </>
  //   );
  // }

  // return (

  //   <Router>

  //     <div className='App'>

  //       <BrowserRouter>

  //         <Switch>

  //           <Route exact path="/" component={FirstPage} />

  //           {restrictedRoutes}

  //         </Switch>

  //       </BrowserRouter>

  //     </div>

  //   </Router>

  // );


}

export default App;
