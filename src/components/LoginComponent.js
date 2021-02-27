import React from 'react';
import { Button, Label, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Control, Errors, Form } from 'react-redux-form';

const validEmail = (val) => !required(val) || /^[A-Z0-9._%+-]+@[A-z0-9.-]+\.[A-Z]{2,4}$/i.test(val);
const required = (val) => val && val.length;



const AuthAlert = (props) => {
    // console.log(props.protectedRoute.protectedRoute);
    if ((props.currentRoute === "/login" || props.currentRoute === "/home") && !props.protectedRoute.protectedRoute) {
        return (<div></div>);
    }

    console.log("current route is: " + props.currentRoute);
    return (
        <div>
            <span style={{ color: "red" }}><p>*You must log in first</p></span>
        </div>
    )
}

const Login = (props) => {

    const handleLogin = async (values) => {
        // this.toggleModal();

        // event.preventDefault();
        await props.postLogin(values.email, values.password);
        // alert("email: " + values.email
        //     + " Password: " + values.password +
        //     " Remember: " + values.remember);
        if (!values.remember) {
            props.resetLoginForm();
        }
    }


    if (props.isLoggedIn.isLoggedIn) {
        var currentRoute = props.targetRoute.targetRoute;
        console.log("targetRoute is :" + currentRoute);
        props.resetTargetRoute();
        props.fetchRequests();
        return (<Redirect to={currentRoute} />)
    }




    return (
        <div style={{backgroundColor: '#242b2c'}}>
        <div className="container row row-content">
            <div className="col-12 col-md-7 offset-md-2 pending_request">
                <div className="loginForm">
                <AuthAlert currentRoute={props.targetRoute.targetRoute} protectedRoute={props.protectedRoute} />
                <Form id="login-form" model="login" onSubmit={(values) => handleLogin(values)}>
                    <Row className="form-group">
                        <Label htmlFor="email" md={4}>E-mail</Label>
                        <Col md={8}>
                            <Control.text model=".email" type="email" id="email" name="email" placeholder="Email Id" className="form-control"
                                validators={{ required, validEmail }}
                            ></Control.text>
                            <Errors
                                className="text-danger"
                                model=".email"
                                show="touched"
                                messages={{
                                    required: 'Required',
                                    validEmail: 'Must be a valid email'
                                }}
                            /></Col>
                    </Row>
                    <Row className="form-group">
                        <Label htmlFor="password" md={4}>Password</Label>
                        <Col md={8}>
                            <Control.text model=".password" type="password" id="password" name="password"
                                placeholder="Password" className="form-control" validators={{ required }}
                            ></Control.text>
                            <Errors
                                className="text-danger"
                                model=".password"
                                show="touched"
                                messages={{
                                    required: 'Required'
                                }}
                            />
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={10}>
                            <div className="form-check">
                                <Label check>
                                    <Control.checkbox model=".remember" name="remember" className="form-check-input" />
                                    Remember me
                        </Label>
                            </div>
                        </Col>
                    </Row>
                    <Row className="form-group">
                        <Col md={{ size: 7, offset: 5 }}>
                            <Button type="submit">
                                Login
                    </Button>
                        </Col>
                    </Row>
                </Form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Login;