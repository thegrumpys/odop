import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from './components/Spinner';
import { MessageModal } from './components/MessageModal';
import { createStore, applyMiddleware, compose } from 'redux';
import { dispatcher } from './store/middleware/dispatcher';
import { reducers } from './store/reducers';
import { Provider } from 'react-redux'
import Routes from './components/Routes';
import './odop.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { initialSystemControls } from './initialSystemControls';
import config from './config';
import { Beforeunload } from 'react-beforeunload';
import { logUsage } from './logUsage';

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
//console.log('<li>','Start index.js','</li><ul>');

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

// Create a store with an empty model where type is null
const store = createStore(reducers, { user: null, name: config.url.name, view: config.url.view, model: { type: null, system_controls: initialSystemControls, result: {objective_value: 0} }}, middleware);
//console.log('store=',store.getState());

logUsage('event', 'Index', { event_label: 'window.location.search=' + window.location.search });

ReactDOM.render(
    <div id="root2">
        <Beforeunload onBeforeunload={(event) => {
            logUsage('event', 'BeforeUnload', { event_label: ''});
        }} />
        <Spinner />
        <MessageModal />
        <Provider store={store}>
            <Router>
                <Routes />
            </Router>
        </Provider>
    </div>,
    document.getElementById('root'));
