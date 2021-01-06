import * as ActionTypes from './ActionTypes';

export const Requests = (state = { errMess: null, isLoading: false, requests:[]}, action) => {
    switch (action.type) {
      case ActionTypes.ADD_REQUESTS:
        return {...state, errMess: null, isLoading:false, requests: action.payload};

      case ActionTypes.REQUESTS_LOADING:
        return {...state, errMess: null, isLoading: true, requests: []};
  
      case ActionTypes.REQUESTS_FAILED:
        return {...state, errMess: action.payload, isLoading: false, requests: []};
  
    //   case ActionTypes.ADD_COMMENT:
    //       var comment = action.payload;
    //       return { ...state, comments: state.comments.concat(comment)};
  
      default:
        return state;
    }
  };