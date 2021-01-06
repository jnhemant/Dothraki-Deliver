import * as ActionTypes from './ActionTypes';


export const TargetRoute = (state = {
    targetRoute: "/home"
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ROUTE:
            return {...state, targetRoute: action.payload};
            
        case ActionTypes.RESET_ROUTE:
            return {...state, targetRoute: "/home"};

        default:
            return state;
    }
}