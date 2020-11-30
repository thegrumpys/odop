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
import config from './config';
import { restoreAutoSave, deleteAutoSave, load, loadInitialState, changeName } from './store/actionCreators';
import { displayError } from './components/ErrorModal';

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
const store = createStore(reducers, {user: null}, middleware);
if (typeof(Storage) !== "undefined" && localStorage.getItem("redirect") !== null) {
//    console.log('In index.js restore "redirect" file')
    store.dispatch(restoreAutoSave("redirect"));
    var design = store.getState();
//    console.log('In index.js design=',design);
    var name = design.name;
    // Migrate model version
    var { migrate } = require('./designtypes/'+design.model.type+'/migrate.js'); // Dynamically load migrate
    var migrated_design = migrate(design.model);
    if (migrated_design.jsontype === "ODOP") {
        store.dispatch(load({name: name, model: migrated_design}));
        store.dispatch(deleteAutoSave("redirect"));
    } else {
        console.error('Invalid JSON type, function ignored');
    }
} else {
    if (typeof(Storage) !== "undefined" && localStorage.getItem("autosave") !== null) {
//        console.log('In index.js restore "autosave" file')
        store.dispatch(restoreAutoSave());
        var design = store.getState();
//        console.log('In index.js design=',design);
        var name = design.name;
        // Migrate model version
        var { migrate } = require('./designtypes/'+design.model.type+'/migrate.js'); // Dynamically load migrate
        var migrated_design = migrate(design.model);
        if (migrated_design.jsontype === "ODOP") {
            store.dispatch(load({name: name, model: migrated_design}));
            store.dispatch(deleteAutoSave());
            console.warn('Autosave file restored after interruption. Use FileSave, FileSaveAs or FileExport to save it permanently');
        } else {
            console.error('Invalid JSON type, function ignored');
        }
    } else {
//        console.log('In index.js load initial state');
        store.dispatch(loadInitialState(config.design.type, 'US'));
        store.dispatch(changeName(config.design.name));
    }
}

ReactDOM.render(<div id="root2"><Spinner /><ErrorModal /><Provider store={store}><Router><Routes /></Router></Provider></div>, document.getElementById('root'));
