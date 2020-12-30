import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import RequestForm from './RequestFormComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postSignUp, postLogin, signOut, postRequestForm } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => ({
    postLogin: (email, password) => dispatch(postLogin(email, password)),
    postSignUp: (email, phone, password, location, role) => dispatch(postSignUp(email, phone, password, location, role)),
    resetLoginForm: () => { dispatch(actions.reset('login'))},
    resetSignUpForm: () => { dispatch(actions.reset('signup'))},
    signOut: () => dispatch(signOut()),
    postRequestForm: (destination, latitude, longitude, phone) => dispatch(postRequestForm(destination, latitude, longitude, phone)),
    resetRequestForm: () => { dispatch(actions.reset('request'))}
  });

class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        var request;
        if (this.props.isLoggedIn.isLoggedIn) {
            console.log(this.props.isLoggedIn.isLoggedIn + "in main component");
            request = <RequestForm postRequestForm={this.props.postRequestForm} resetRequestForm={this.props.resetRequestForm} />

        }
        else {
            console.log(this.props.isLoggedIn.isLoggedIn + "in main component");

            request = <div></div>

        }
        return(
        <div>
            <Header isLoggedIn={this.props.isLoggedIn} resetLoginForm={this.props.resetLoginForm} resetSignUpForm={this.props.resetSignUpForm}
             postSignUp={this.props.postSignUp} postLogin={this.props.postLogin} signOut={this.props.signOut} isLoggedIn={this.props.isLoggedIn}/>
            {request}
            <Footer/>
        </div>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));