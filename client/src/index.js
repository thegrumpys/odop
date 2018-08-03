import React from 'react';
import ReactDOM from 'react-dom';
//import { createStore, applyMiddleware, compose } from 'redux';
//import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
//import { initialState } from './initialState';
//import App from './components/App';
import { Spinner } from './components/Spinner';
import { ErrorModal } from './components/ErrorModal';
//import { pcylWebApp } from './store/reducers';
//import { dispatcher } from './store/middleware/dispatcher';
import { PromptForDesign } from './components/PromptForDesign';

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

///* eslint-disable no-underscore-dangle */
//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
///* eslint-enable */
//
//const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

ReactDOM.render(<div id="root2"><Spinner /><ErrorModal /><PromptForDesign /></div>, document.getElementById('root'));
// go get name from PromtForDesign: var name = ...
//var name = "startup";
//displaySpinner(true);
//fetch('/api/v1/designs/'+name)
//    .then(res => {
//        displaySpinner(false);
//        if (!res.ok) {
//            throw Error(res.statusText);
//        }
//        return res.json()
//    })
//    .then(design => {
//        const store = createStore(pcylWebApp, design, middleware);
//        ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
//    })
//    .catch(error => {
//        displayError('GET of \'startup\' design failed with message: \''+error.message+'\'. Using builtin initialState instead. You may continue in "demo mode" but you will be unable to save your work.');
//        const store = createStore(pcylWebApp, initialState, middleware);
//        ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
//    });
