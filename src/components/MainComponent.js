import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import RequestForm from './RequestFormComponent';
import PendingRequests from './PendingRequestsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { postSignUp, postLogin, signOut, postRequestForm, fetchRequests } from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

const mapStateToProps = state => {
    return {
        isLoggedIn: state.isLoggedIn,
        requests: state.requests
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
    fetchRequests: () => dispatch(fetchRequests())
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
                requests={this.props.requests.requests}
                errMess={this.props.requests.errMess}
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
        return(
        <div>
                <Header isLoggedIn={this.props.isLoggedIn} resetLoginForm={this.props.resetLoginForm} resetSignUpForm={this.props.resetSignUpForm}
                    postSignUp={this.props.postSignUp} postLogin={this.props.postLogin} signOut={this.props.signOut} isLoggedIn={this.props.isLoggedIn} />
                <Switch>
                    <Route path="/home" component={HomePage} />
                    <Route path="/pendingrequests" component={Requests} />
                    {/* <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
          <Route exact path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/> */}
                    <Redirect to="/home" />
                </Switch>
                <Footer />
        </div>);
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));