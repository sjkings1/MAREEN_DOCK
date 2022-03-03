// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { routePaths } from '../App';
// import { loginData } from '../redux_properties/Login_Slice';

// const PrivateRoutes = (props) => {

//   const user = useSelector(loginData);

//   if (!user) {
//     return <Redirect to={routePaths.LOGIN} />;
//   }
//   return props.children;
// }

// export default PrivateRoutes;