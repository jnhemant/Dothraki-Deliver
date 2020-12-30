import * as ActionTypes from './ActionTypes';


var currState = false;
if(localStorage.getItem('token')){
    currState = true;
}
export const UserLogin = (state = {
    isLoggedIn: currState
}, action) => {
    switch(action.type){
        case ActionTypes.USER_LOGIN:
            return {...state, isLoggedIn: true};
            
        case ActionTypes.USER_LOGOUT:
            return {...state, isLoggedIn: false};

        default:
            return state;
    }
}