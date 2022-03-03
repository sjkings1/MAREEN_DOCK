import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import './LoginForm.css';
import LandingScreen from './LandingScreen';
import { login } from '../redux_properties/Login_Slice';
import { signUpData } from '../redux_properties/SignUp_Slice';

import { Paper, Grid, Avatar, TextField, Button, Typography, Link } from '@mui/material';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';

function LoginForm() {

    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(signUpData);

    const initialValues = {
        userid: "",
        password: ""
    }

    const validUserId = userData.userid;
    const validPassword = userData.password;

    console.log(validUserId, validPassword)

    const validation = yup.object().shape({
        userid: yup.string().email('Invalid Email Format*').matches(validUserId, "Invalid Email").required('Email is required*'),
        password: yup.string().matches(validPassword, "Invalid Password").required('Password is required*')
    });

    const onSubmit = (values, props) => {
        console.log(values);

        dispatch(
            login({
                userid: values.userid,
                password: values.password,
            })
        );

        if (localStorage.getItem("UserDetails")) {
            if (JSON.parse(localStorage.getItem("UserDetails")).filter(e => {
                return e.email == values.userid && values.password
            }).length) {
                let foundPerson = JSON.parse(localStorage.getItem("UserDetails")).filter(e => {
                    return e.email == values.userid && e.createpassword == values.password
                });
                history.push({
                    pathname: `/home`,
                    hash: "",
                    state: { state: { data: foundPerson[0] } },
                });
            }
        }

        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 2000)

        console.log(props);

    }

    return (

        <div className="loginpage">
            <LandingScreen />

            <Grid className="logingrid">

                <Paper elevation={10}>

                    <Grid align='center'>
                        <Avatar sx={{ width: 56, height: 56 }}></Avatar>
                        <h2>LOGIN</h2>
                    </Grid>

                    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}>
                        {(props) => (
                            <Form>

                                <Field as={TextField} id="outlined-required" label="UserID" name="userid" placeholder="user123@gmail.com" helperText={<ErrorMessage name="userid" />} fullWidth />

                                <Field as={TextField} id="outlined-required" label="Password" type="password" name="password" placeholder="Password Please" helperText={<ErrorMessage name="password" />} fullWidth />

                                <Button variant="contained" type="submit" disabled={props.isSubmitting} fullWidth> {props.isSubmitting ? "LOADING.........." : "LOGIN"} </Button>

                            </Form>
                        )}
                    </Formik>

                    {/* <Typography>  Create a New Account ? <Link to="/signup_page" component="button" variant="body2"> SIGN UP </Link> </Typography> */}

                </Paper>

            </Grid>

        </div>
    );
}

export default LoginForm;