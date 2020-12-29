import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postSignUp, postLogin, signOut } from '../redux/ActionCreators';
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
    signOut: () => dispatch(signOut())
  });

class Main extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div>
            <Header isLoggedIn={this.props.isLoggedIn} resetLoginForm={this.props.resetLoginForm} resetSignUpForm={this.props.resetSignUpForm}
             postSignUp={this.props.postSignUp} postLogin={this.props.postLogin} signOut={this.props.signOut} isLoggedIn={this.props.isLoggedIn}/>
            
            <Footer/>
        </div>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));