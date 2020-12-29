import {createStore, combineReducers, applyMiddleware} from 'redux';
import { createForms } from 'react-redux-form';
import { InitialLogin, InitialSignup } from './forms';
// import { Reducer, initialState } from './reducer'
import { UserLogin } from './userLogin';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            isLoggedIn : UserLogin,
            ...createForms({
                login: InitialLogin,
                signup: InitialSignup
            })
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};

