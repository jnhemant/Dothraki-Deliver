import * as ActionTypes from './ActionTypes';


export const ProtectedRoute = (state = {
    protectedRoute: false
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_ROUTE:
            return {...state, protectedRoute: true};
            
        case ActionTypes.RESET_ROUTE:
            return {...state, protectedRoute: false};

        default:
            return state;
    }
}