import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from './components/Spinner';
import { ErrorModal } from './components/ErrorModal';
import { createStore, applyMiddleware, compose } from 'redux';
import { dispatcher } from './store/middleware/dispatcher';
import { reducers } from './store/reducers';
import { Provider } from 'react-redux'
import FEApp from './components/FEApp';
import './odop.css';
import { BrowserRouter as Router } from 'react-router-dom';
import config from './config';
import { loadInitialState, changeName } from './store/actionCreators';

//function loggerMiddleware({ getState }) {
//    return next => action => {
//      console.log('will dispatch', action);
//      
//      // Call the next dispatch method in the middleware chain.
//      const returnValue = next(action)
//      
//      console.log('state after dispatch', getState());
//      
//      // This will likely be the action itself, unless
//      // a middleware further in chain changed it.
//      return returnValue
//    }
//  }

console.error('==================================================================');
//console.log('CLIENT: PUBLIC_URL =', process.env.PUBLIC_URL, 'NODE_ENV =', process.env.NODE_ENV, 'Starting on port =', process.env.PORT, 'Node version =', process.version);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));
const store = createStore(reducers, {user: null}, middleware);
store.dispatch(loadInitialState(config.design.type, 'US'));
store.dispatch(changeName(config.design.name));
ReactDOM.render(<div id="root2"><Spinner /><ErrorModal /><Provider store={store}><Router><FEApp /></Router></Provider></div>, document.getElementById('root'));
