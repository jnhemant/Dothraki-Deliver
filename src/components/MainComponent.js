import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import RequestForm from './RequestFormComponent';
import Login from './LoginComponent';
import PendingRequests from './PendingRequestsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postSignUp, postLogin, signOut, postRequestForm, fetchRequests, addRoute, resetRoute } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        requests: state.requests,
        targetRoute: state.targetRoute
    }
}

const mapDispatchToProps = dispatch => ({
    postLogin: (email, password) => dispatch(postLogin(email, password)),
    postSignUp: (email, phone, password, location, role) => dispatch(postSignUp(email, phone, password, location, role)),
    resetLoginForm: () => { dispatch(actions.reset('login'))},
    resetSignUpForm: () => { dispatch(actions.reset('signup'))},
    signOut: () => dispatch(signOut()),
    postRequestForm: (destination, latitude, longitude, phone) => dispatch(postRequestForm(destination, latitude, longitude, phone)),
    resetRequestForm: () => { dispatch(actions.reset('request'))},
    fetchRequests: () => dispatch(fetchRequests()),
    addRoute: (route) => dispatch(addRoute(route)),
    resetRoute: () => dispatch(resetRoute())
  });

class Main extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchRequests();
      }

    render(){
        const HomePage = () => {
            return(
            <RequestForm postRequestForm={this.props.postRequestForm} resetRequestForm={this.props.resetRequestForm} />
            )
        }
        const Requests = () => {
            return(
                <PendingRequests 
                isLoggedIn={this.props.isLoggedIn}
                requests={this.props.requests.requests}
                errMess={this.props.requests.errMess}
                addRoute={this.props.addRoute}
                />
            );
            // if (this.props.isLoggedIn.isLoggedIn) {
            //     console.log(this.props.isLoggedIn.isLoggedIn + "in main component");
            //     return(<div></div>);
    
            // }
            // else {
            //     console.log(this.props.isLoggedIn.isLoggedIn + "in main component");
            //     return(<div></div>);
            // }
        };  
        const LoginPage = () => {
            return(
                <Login isLoggedIn={this.props.isLoggedIn}
                resetLoginForm={this.props.resetLoginForm}
                postLogin={this.props.postLogin}
                targetRoute={this.props.targetRoute}
                resetRoute={this.props.resetRoute}
                />
            )
        };   
        return(
        <div>
                <Header isLoggedIn={this.props.isLoggedIn} resetLoginForm={this.props.resetLoginForm} resetSignUpForm={this.props.resetSignUpForm}
                    postSignUp={this.props.postSignUp} postLogin={this.props.postLogin} signOut={this.props.signOut} />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/pendingrequests" component={Requests} />
                    <Route path="/login" component={LoginPage}/>
                    {/* <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/> */}
                    <Redirect to="/home" />
                </Switch>
                <Footer />
        </div>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));