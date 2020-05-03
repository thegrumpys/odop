import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { initialSystemControls } from '../initialSystemControls';
import App from './App';
import { startup, deleteAutoSave } from '../store/actionCreators';
import { displaySpinner } from './Spinner';
import { displayError } from './ErrorModal';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { logUsage } from '../logUsage';
import config from '../config';

class FEHome extends Component {
  constructor(props) {
    super(props);
//    console.log('In FEHome.constructor props=',props);
//    console.log('In FEHome.constructor config.session.refresh=',config.session.refresh);
    this.state = { 
        type: config.design.type,
        name: config.design.name,
        session_refresh: config.session.refresh,
        store: null,
    };
    this.interval = null;
//    console.log('In FEHome.constructor 1 this.interval=',this.interval);
  }
  
  componentDidMount() {
//      console.log('In FEHome.componentDidMount');
    this.getDesign(this.state.type, this.state.name);
//      this.loadInitialState(this.state.type)
  }

  getDesign(type,name) {
//    console.log('In FEHome.getDesign type=', type, ' name=', name);

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */

    const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

    displaySpinner(true);
    fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
            headers: {
                Authorization: 'Bearer ' + null // User null for system read-only files
            }
        })
        .then(res => {
            displaySpinner(false);
            if (!res.ok) {
                throw Error(res.statusText);
            }
            return res.json()
        })
        .then(design => {
//            console.log('In FEHome.getDesigns design=', design);
            var { migrate } = require('../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
            var migrated_design = migrate(design);
            const store = createStore(reducers, migrated_design, middleware);
            store.dispatch(startup());
            store.dispatch(deleteAutoSave());
            logUsage('event', 'FEHome', { 'event_label': type + ' ' + name });
            this.setState({
                store: store
            });
        })
        .catch(error => {
            displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
            this.loadInitialState(type);
        });
  }

  loadInitialState(type) {
//    console.log('In FEHome.loadInitialState type=', type);

    /* eslint-disable no-underscore-dangle */
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    /* eslint-enable */

    const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

    var { initialState } = require('../designtypes/'+type+'/initialState.js'); // Dynamically load initialState
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
    const store = createStore(reducers, state, middleware);
    store.dispatch(startup());
    store.dispatch(deleteAutoSave());
    logUsage('event', 'FEHome', { 'event_label': type + ' load initialState' });
    this.setState({
        store: store
    });
  }

  render() {
//    console.log('In FEHome.render');
    if (this.state.store !== null) {
//        console.log('In FEHome.render Provider & App');
        return (
            <Provider store={this.state.store}><App store={this.state.store} /></Provider>
        );
    }
//    console.log('In FEHome.render null');
    return null;
  }
}

export default FEHome;
