import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './components/App';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { pcylWebApp } from './store/reducers';
import { equationsMiddleware } from './equationsMiddleware';
import { Spinner, displaySpinner } from './components/Spinner';
import { ErrorModal, displayError } from './components/ErrorModal';
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

ReactDOM.render(<div id="root2"><Spinner /><ErrorModal /></div>, document.getElementById('root'));
displaySpinner(true);
fetch('/api/v1/designs/startup')
    .then(res => {
        displaySpinner(false);
        if (!res.ok) {
            throw Error(res.statusText);
        }
        return res.json()
    })
    .then(design => {
        const store = createStore(pcylWebApp, design, middleware);
        ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
    })
    .catch(error => {
        displayError('GET of \'startup\' design failed with message: \''+error.message+'\', using builtin initialState instead');
        const store = createStore(pcylWebApp, initialState, middleware);
        ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
    });
