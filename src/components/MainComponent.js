import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import RequestForm from './RequestFormComponent';
import Login from './LoginComponent';
import Signup from './SignupComponent';
import PendingRequests from './PendingRequestsComponent';
import RatingStar from './RatingStarComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postSignUp, postLogin, signOut, postRequestForm, fetchRequests,
     addRoute, resetRoute, fetchUnratedRequests, postRating } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { createBrowserHistory } from 'history';


var history = createBrowserHistory();

// Get the current location.
var location = history.location;

// Listen for changes to the current location.
let unlisten = history.listen(({ location, action }) => {
    console.log(action, location.pathname, location.state);
  });

//   history.push('/pendingrequests');

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        requests: state.requests,
        targetRoute: state.targetRoute,
        unratedRequests: state.unratedRequests
    }
}

const mapDispatchToProps = dispatch => ({
    postLogin: (email, password) => dispatch(postLogin(email, password)),
    postSignUp: (email, phone, password, location, role) => dispatch(postSignUp(email, phone, password, location, role)),
    resetLoginForm: () => { dispatch(actions.reset('login'))},
    resetSignUpForm: () => { dispatch(actions.reset('signup'))},
    signOut: () => dispatch(signOut()),
    postRequestForm: (destination, latitude, longitude, phone, history) => dispatch(postRequestForm(destination, latitude, longitude, phone, history)),
    resetRequestForm: () => { dispatch(actions.reset('request'))},
    fetchRequests: () => dispatch(fetchRequests()),
    addRoute: (route) => dispatch(addRoute(route)),
    resetRoute: () => dispatch(resetRoute()),
    fetchUnratedRequests: (history) => dispatch(fetchUnratedRequests(history)),
    postRating: (requestId, rating, feedback, history) => dispatch(postRating(requestId, rating, feedback, history))
  });

class Main extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.fetchRequests();
        this.props.fetchUnratedRequests(history);
    }

    // componentDidUpdate() {
    //     this.props.fetchUnratedRequests(history);
    // }

    render(){
        const HomePage = () => {
            return(
            <RequestForm isLoggedIn={this.props.isLoggedIn}
            postRequestForm={this.props.postRequestForm} 
            resetRequestForm={this.props.resetRequestForm}             
            history={this.props.history}
            />
            )
        }
        const Requests = () => {
            return(
                <PendingRequests 
                isLoggedIn={this.props.isLoggedIn}
                requests={this.props.requests.requests}
                errMess={this.props.requests.errMess}
                addRoute={this.props.addRoute}
                fetchRequests={this.props.fetchRequests}
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
                fetchRequests={this.props.fetchRequests}
                history={this.props.history}
                />
            )
        };

        const SignupPage = () => {
            return(
                <Signup
                isLoggedIn={this.props.isLoggedIn}
                resetSignUpForm={this.props.resetSignUpForm}
                postSignUp={this.props.postSignUp}
                targetRoute={this.props.targetRoute}
                resetRoute={this.props.resetRoute}
            />
            );            
        }
        return(
        <div>
                <Header 
                isLoggedIn={this.props.isLoggedIn}
                resetLoginForm={this.props.resetLoginForm} 
                resetSignUpForm={this.props.resetSignUpForm}
                postSignUp={this.props.postSignUp} 
                postLogin={this.props.postLogin} 
                signOut={this.props.signOut} 
                unratedRequests={this.props.unratedRequests}
                postRating={this.props.postRating}
                history={this.props.history}
                fetchUnratedRequests={this.props.fetchUnratedRequests}
                />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/pendingrequests" component={Requests} />
                    <Route path="/login" component={LoginPage}/>
                    <Route path="/signup" component={SignupPage}/>
                    {/* <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/> */}
                    <Redirect to="/home" />
                </Switch>
                <Footer />
        </div>);
    }
}

// unlisten();

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));