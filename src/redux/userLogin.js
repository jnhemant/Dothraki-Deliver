import * as ActionTypes from './ActionTypes';

export const UserLogin = (state = {
    isLoggedIn: false
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