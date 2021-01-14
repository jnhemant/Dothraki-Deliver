import React, { useState, useEffect } from 'react';
import { Button, Label, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Control, Errors, Form } from 'react-redux-form';

const validEmail = (val) => !required(val) || /^[A-Z0-9._%+-]+@[A-z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const required = (val) => val && val.length;
const validPhone = (val) => !required(val) || ((val) && (val.length === 10));
const validPassword = (val) => !required(val) || (val && val.length > 7);
const isNumber = (val) => !isNaN(Number(val));

const Signup = (props) => {
    const [role, setRole] = useState("consumer");

    // Uncomment if you wanna redirect the logged in user to current page
    // if(props.isLoggedIn.isLoggedIn){
    //     var currentRoute = props.targetRoute.targetRoute;
    //     console.log("targetRoute is :" + currentRoute);
    //     props.resetRoute();
    //     props.fetchRequests();
    //     return(<Redirect to={currentRoute} />)       
    // }
    
    
    const handleSignUp = async (values) => {
        await props.postSignUp(values.email, values.phone, values.password, values.location, role);
        // alert("Email: " + values.email
        //     + " Phone: " + values.phone+ " Role: " + this.state.role);
        props.resetSignUpForm();
    }
    return (
        <div className="container row row-content">
             <div className="col-12 col-md-7 offset-md-2 pending_request">
        <Form model="signup" onSubmit={(values) => handleSignUp(values)}>
            <Row className="form-group">
                <Label htmlFor="name" md={4}>Full Name</Label>
                <Col md={8}>
                    <Control.text model=".name" type="text" id="name" name="name" placeholder="Full Name"
                        className="form-control" validators={{ required }} />
                    <Errors
                        className="text-danger"
                        model=".name"
                        show="touched"
                        messages={{
                            required: 'Required'
                        }} /></Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="email" md={4}>E-mail</Label>
                <Col md={8}>
                    <Control.text model=".email" type="email" id="email" name="email" placeholder="Email Id"
                        className="form-control" validators={{ required, validEmail }} />
                    <Errors
                        className="text-danger"
                        model=".email"
                        show="touched"
                        messages={{
                            required: 'Required ',
                            validEmail: 'Must be a valid email'
                        }}
                    /></Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="phone" md={4}>Phone</Label>
                <Col md={8}>
                    <Control.text model=".phone" type="tel" id="phone" name="phone" placeholder="Phone Number"
                        className="form-control" validators={{ required, validPhone, isNumber }} />
                    <Errors
                        className="text-danger"
                        model=".phone"
                        show="touched"
                        messages={{
                            required: 'Required ',
                            validPhone: 'Must be a valid phone',
                            isNumber: 'Must be a number'
                        }}
                    /></Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="password" md={4}>Password</Label>
                <Col md={8}>
                    <Control.text model=".password" type="password" id="password" name="password" placeholder="Password"
                        className="form-control" validators={{ required, validPassword }} />
                    <Errors
                        className="text-danger"
                        model=".password"
                        show="touched"
                        messages={{
                            required: 'Required ',
                            validPassword: 'Password must have more than 7 characters'
                        }}
                    /></Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="location" md={4}>Current Location</Label>
                <Col md={8}>
                    <Control.text model=".location" type="text" id="location" name="location" placeholder="Current Location"
                        className="form-control" validators={{ required }} />
                    <Errors
                        className="text-danger"
                        model=".location"
                        show="touched"
                        messages={{
                            required: 'Required'
                        }} /></Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="role" md={4}>Role</Label>
                <Col md={4}>
                    <Control.select model=".role" value={role} name="role" className="form-control" onChange={(event) => { setRole(event.target.value) }}>
                        <option value="consumer">Consumer</option>
                        <option value="agent">Agent</option>
                    </Control.select></Col>
            </Row>
            <Row className="form-group">
                <Col md={{ size: 8, offset: 4 }}>
                    <Button type="submit" color="primary">
                        Sign Up
                    </Button>
                </Col>
            </Row>
        </Form>
        </div>
        </div>
    )
}

export default Signup;