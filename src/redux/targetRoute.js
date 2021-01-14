import * as ActionTypes from './ActionTypes';


export const TargetRoute = (state = {
    targetRoute: "/login"
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_TARGETROUTE:
            return {...state, targetRoute: action.payload};
            
        case ActionTypes.RESET_TARGETROUTE:
            return {...state, targetRoute: "/home"};

        default:
            return state;
    }
}