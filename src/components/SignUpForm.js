import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './SignUpForm.css';
import LandingScreen from './LandingScreen';
import { signup } from '../redux_properties/SignUp_Slice';

import { Avatar, Grid, Paper, TextField, Button, FormControl, Input, InputLabel, Select, MenuItem, FormHelperText } from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';

function SignUpForm() {

    const history = useHistory();
    const dispatch = useDispatch();

    const initialValuesHandler = {
        firstname: "",
        lastname: "",
        gender: "",
        dob: "",
        phonenumber: "",
        email: "",
        createpassword: "",
        confirmpassword: ""
    }

    const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

    const validationHandler = yup.object().shape({
        firstname: yup.string().max(20, 'Must be 20 characters or less*').required('Firstname is Required*'),
        lastname: yup.string().max(20, 'Must be 20 characters or less*').required('Lastname is Required*'),
        gender: yup.string().oneOf(['male', 'female']).required('Gender is Required*'),
        dob: yup.string().required('Date of Birth Required*'),
        phonenumber: yup.string().min(10, 'Phonenumber must included 10 numbers*').max(10, 'Phonenumber is not valid*').matches(phoneRegExp, 'Phonenumber is not valid*').required('Phonenumber is Required*'),
        email: yup.string().email('Email is invalid*').required('Email is required*'),
        createpassword: yup.string().min(6, 'Password must be at least 6 charaters*').required('Password is required*'),
        confirmpassword: yup.string().oneOf([yup.ref('createpassword')], 'Password not matching*').required('Confirm password is required*')
    });

    //AGE CONVERTING CODE
    const ageCalculator = (dob) => {
        var dob = dob.replace("-", "");
        var year = Number(dob.substr(0, 4));
        var month = Number(dob.substr(4, 2)) - 1;
        var day = Number(dob.substr(6, 2));
        var today = new Date();
        var age = today.getFullYear() - year;
        if (today.getMonth() < month || (today.getMonth() == month && today.getDate() < day)) {
            age--;
        }
        return age
    }

    //PHONE FORMATTING CODE
    const phoneFormat = (phonenumber) => {
        var phoneno = phonenumber;
        phoneno = phoneno.replace(/\D+/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
        return phoneno;
    }

    const onSubmitHandler = (values, props) => {
        console.log(values);
        values["age"] = ageCalculator(values["dob"]);
        values["phonenumber"] = phoneFormat(values["phonenumber"]);

        dispatch(
            signup({
                firstname: values.firstname,
                lastname: values.lastname,
                gender: values.gender,
                dob: values.dob,
                age: values.age,
                phonenumber: values.phonenumber,
                email: values.email,
                createpassword: values.createpassword,
                confirmpassword: values.confirmpassword
            })
        );

        history.push("/login_page");

        setTimeout(() => {
            props.resetForm();
            props.setSubmitting(false);
        }, 2000)

    }

    return (

        <div className="signuppage">
            <LandingScreen />

            <Grid className="signupgrid">

                <Paper elevation={10}>

                    <Grid align='center'>
                        <Avatar sx={{ width: 56, height: 56 }}></Avatar>
                        <h2>SIGNUP</h2>
                    </Grid>

                    <Formik initialValues={initialValuesHandler} onSubmit={onSubmitHandler} validationSchema={validationHandler}>

                        {(props) => (
                            <Form>

                                <Field as={TextField} id="standard" variant="standard" label="FirstName" type="text" name="firstname" placeholder="Enter the Firstname" helperText={<ErrorMessage name="firstname" />} fullWidth />

                                <Field as={TextField} id="standard" variant="standard" label="LastName" type="text" name="lastname" placeholder="Enter the Lastname" helperText={<ErrorMessage name="lastname" />} fullWidth />

                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="demo-simple-select-standard-label"> Gender </InputLabel>
                                    <Field as={Select} labelId="demo-simple-select-standard-label" id="demo-simple-select-standard" name="gender" placeholder="Select Gender" helperText={<ErrorMessage name="gender" />} >
                                        <MenuItem value="male"> Male </MenuItem>
                                        <MenuItem value="female"> Female </MenuItem>
                                    </Field>
                                </FormControl>
                                <FormHelperText> <ErrorMessage name="gender" /> </FormHelperText>

                                <InputLabel id="standard"> D.O.B </InputLabel>
                                <Field as={TextField} id="standard" variant="standard" type="date" name="dob" helperText={<ErrorMessage name="dob" />} fullWidth />

                                <Field as={TextField} id="standard" variant="standard" label="Phone Number" type="tel" name="phonenumber" placeholder="Enter the Phone No" helperText={<ErrorMessage name="phonenumber" />} fullWidth />

                                <Field as={TextField} id="standard" variant="standard" label="Email" type="email" name="email" placeholder="Email required" helperText={<ErrorMessage name="email" />} fullWidth />

                                <Field as={TextField} id="standard" variant="standard" label="Create Password" type="password" name="createpassword" placeholder="Create Your Password" helperText={<ErrorMessage name="createpassword" />} fullWidth />

                                <Field as={TextField} id="standard" variant="standard" label="Confirm Password" type="password" name="confirmpassword" placeholder="Confirm Your Password" helperText={<ErrorMessage name="confirmpassword" />} fullWidth />

                                <div className="signButt">
                                    <Button variant="contained" color="primary" type="submit" disabled={props.isSubmitting} fullWidth> {props.isSubmitting ? "CREATING.........." : "REGISTER"} </Button>
                                    <Button variant="contained" color="success" type="reset"> RESET </Button>
                                </div>

                            </Form>
                        )}

                    </Formik>

                </Paper>

            </Grid>

        </div>
    );
}

export default SignUpForm;






