import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from './components/Spinner';
import { ErrorModal } from './components/ErrorModal';
import { createStore, applyMiddleware, compose } from 'redux';
import { dispatcher } from './store/middleware/dispatcher';
import { reducers } from './store/reducers';
import { Provider } from 'react-redux'
import Routes from './components/Routes';
import './odop.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { initialSystemControls } from './initialSystemControls';
import config from './config';

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

//console.error('In index.js ==================================================================');
//console.log('In index.js CLIENT: PUBLIC_URL =', process.env.PUBLIC_URL, 'NODE_ENV =', process.env.NODE_ENV, 'Starting on port =', process.env.PORT, 'Node version =', process.version);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

// Create a store with an empty model where type is null
const store = createStore(reducers, { user: null, name: config.design.name, view: config.design.view, model: { type: null, system_controls: initialSystemControls }}, middleware);

ReactDOM.render(<div id="root2"><Spinner /><ErrorModal /><Provider store={store}><Router><Routes /></Router></Provider></div>, document.getElementById('root'));
