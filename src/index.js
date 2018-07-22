import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { pcylWebApp } from './reducers';
import { equationsMiddleware } from './equationsMiddleware';
import { startup } from './actionCreators';
import { initialState } from './initialState';

//function loggerMiddleware({ getState }) {
//    return next => action => {
//      console.log('will dispatch', action)
//      
//      // Call the next dispatch method in the middleware chain.
//      const returnValue = next(action)
//      
//      console.log('state after dispatch', getState())
//      
//      // This will likely be the action itself, unless
//      // a middleware further in chain changed it.
//      return returnValue
//    }
//  }

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/equationsMiddleware));

const store = createStore(
        pcylWebApp,
        initialState,
        middleware
        );

//store.subscribe(() => {
//    console.log('In store.subscribe objective_value='+store.getState().search_results.objective_value)
//    });

store.dispatch(startup());

ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root'));