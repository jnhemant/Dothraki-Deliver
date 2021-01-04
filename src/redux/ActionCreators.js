import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseurl';
import fetch from 'cross-fetch';

export const loginTrue = () => ({
    type: ActionTypes.USER_LOGIN
});

export const loginFalse = () => ({
    type: ActionTypes.USER_LOGOUT
});

export const postLogin = (email, password) => (dispatch) => {
    const userCredentials = {
        email: email,
        password: password
    }
    return fetch(baseUrl + 'auth/users/signin', {
        method: 'POST',
        body: JSON.stringify(userCredentials),
        headers: {
            'Content-Type': 'application/json'
        },
        // credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response));
            localStorage.setItem('token', response.token);
            dispatch(loginTrue());
        })
        .catch(err => {
            console.log('Log In not successful ', err.message);
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            dispatch(loginFalse());
            alert('Log In not successful!\nError:  ' + err.message)
        });
}

export const postSignUp = (email, phone, password, location, role) => (dispatch) => {
    const newUser = {
        email: email,
        phone: phone,
        password: password,
        currentLocation: location,
        role: role
    }
    console.log(JSON.stringify(newUser));
    return fetch(baseUrl + 'auth/users/signup', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
            'Content-Type': 'application/json',
        },
        // credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response));
            localStorage.setItem('token', response.token);
            dispatch(loginTrue());
        })
        .catch(err => {
            console.log('User Sign Up ', err.message);
            if (localStorage.getItem('token')) {
                localStorage.removeItem('token');
            }
            dispatch(loginFalse());
            alert('Sign Up unsuccessful!\nError: ' + err.message)
        });
}



export const signOut = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if(!token){
        alert('User not logged in. Please log in to continue');
        return;
    }
    localStorage.removeItem('token');
    dispatch(loginFalse());
    return fetch(baseUrl + 'auth/users/signout', {
        headers: {
            'authorization': `Bearer ${token}`,
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            alert(response.message)
        })
        .catch(err => console.log(err.message));
}

export const postRequestForm = (destination, latitude, longitude, phone)  => (dispatch) =>  {
    const token = localStorage.getItem('token');
    if(!token){
        alert('User not logged in. Please log in to continue');
        return;
    }
    const newRequest = {
        destination: destination,
        destination_phone: phone,
        destination_lat: latitude,
        destination_long: longitude
    }
    console.log(JSON.stringify(newRequest));
    return fetch(baseUrl + 'users/users/request', {
        method: 'POST',
        body: JSON.stringify(newRequest),
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`
        },
        // credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ": " + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(response => {
            alert(JSON.stringify(response.request));
        })
        .catch(err => {
            console.log('Request could not be created ', err.message);
            alert('Request creation unsuccessful!\nError: ' + err.message)
        });
}

export const fetchRequests = () => (dispatch) => {
    const token = localStorage.getItem('token');
    if(!token){
        // alert('User not logged in. Please log in to continue');
        return;
    }
    return fetch(baseUrl + 'users/requests/pending', {
        headers: {
            'authorization': `Bearer ${token}`,
        },
    })
    .then(response => {
        if(response.ok){
            return response;
        }
        else{
            var error = new Error('Error ' + response.status + ": " + response.statusText);
            error.response = response;
            throw error;
        }
    }, 
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(requests => dispatch(addRequests(requests.requests)))
    .catch(err => dispatch(requestsFailed(err.message)));
};

export const requestsFailed = (errmess) => ({
    type: ActionTypes.REQUESTS_FAILED,
    payload: errmess
});

export const addRequests = (requests) => ({
    type: ActionTypes.ADD_REQUESTS,
    payload: requests
});