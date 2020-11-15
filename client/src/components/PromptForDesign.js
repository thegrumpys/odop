import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
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
import { withAuth } from '@okta/okta-react';
import config from '../config';

export default withAuth(class PromptForDesign extends Component {

    constructor(props) {
        super(props);
//        console.log("In PromptForDesign.constructor props=",props);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onLoadInitialState = this.onLoadInitialState.bind(this);
        this.onLoadInitialStateMetric = this.onLoadInitialStateMetric.bind(this);
        this.onLoadAutoSave = this.onLoadAutoSave.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.state = {
            modal: true,
            designtypes: config.design.types,
            designs: [],
            type: config.design.type,
            name: config.design.name,
            authenticated: null,
            user: null,
            store: null,
        };
    }

    async componentDidMount() {
//        console.log('In PromptForDesign.componentDidMount this.props.auth=',this.props.auth);
        var authenticated = await this.props.auth.isAuthenticated();
//        console.log("In PromptForDesign.componentDidMount before authenticated=",authenticated);
        if (authenticated !== this.state.authenticated) { // Did authentication change?
            this.setState({ authenticated }); // Remember our current authentication state
            if (authenticated) { // We have become authenticated
                var user = await this.props.auth.getUser();
//                console.log('In PromptForDesign.componentDidMount user=',user);
                if (user !== undefined) { // Have we a user?
                    this.setState({
                        user: user.sub,
                    });
                } else {
                    this.setState({
                        user: null,
                    });
                }
            } else { // We have become unauthenticated
                this.setState({
                    user: null,
                });
            }
            this.getDesignNames(this.state.type);
        }
    }

    getDesignNames(type) {
//        console.log('In PromptForDesign.getDesignNames type=', type, ' user=', this.state.user);
        // Get the designs and store them in state
        displaySpinner(true);
//        console.log('In PromptForDesign.getDesignNames this.state.user=',this.state.user);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
            headers: {
                Authorization: 'Bearer ' + this.state.user
            }
        })
        .then(res => {
            displaySpinner(false);
            if (!res.ok) {
               throw Error(res.statusText);
            }
            return res.json()
        })
        .then(designs => {
//                console.log('In PromptForDesign.getDesignNames designs=',designs);
            this.setState({
                designs: designs
            })
        })
        .catch(error => {
            this.setState({
                modal: !this.state.modal
            });
            displayError('GET of design names for design types failed with message: \''+error.message+'\'. Using builtin initial state instead. You may continue in "demo mode" but you will be unable to save your work.');
            this.loadInitialState(this.state.type);
        });
    }

    getDesign(type, name) {
//        console.log('In PromptForDesign.getDesign type=', type, ' name=', name, ' user=', this.state.user);

        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

        displaySpinner(true);
//        console.log('In PromptForDesign.getDesign this.state.user=',this.state.user);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
            headers: {
                Authorization: 'Bearer ' + this.state.user
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
//                console.log('In PromptForDesign.getDesign design=', design);
            var { migrate } = require('../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
            var migrated_design = migrate(design);
            if (migrated_design.jsontype === "ODOP") {
                const store = createStore(reducers, {name: name, model: migrated_design}, middleware);
                store.dispatch(startup());
                store.dispatch(deleteAutoSave());
                logUsage('event', 'PromptForDesign', { 'event_label': type + ' ' + name });
                this.setState({
                    store: store
                });
            } else {
                displayError('Invalid JSON type, function ignored');
            }
        })
        .catch(error => {
            displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
            this.loadInitialState(type);
        });
    }

    loadInitialState(type) {
//        console.log('In PromptForDesign.loadInitialState type=', type);

        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

        var { initialState } = require('../designtypes/'+type+'/initialState.js'); // Dynamically load initialState
        var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
        const store = createStore(reducers, {name: "initialState", model: state}, middleware);
        store.dispatch(startup());
        store.dispatch(deleteAutoSave());
        logUsage('event', 'PromptForDesign', { 'event_label': type + ' load initialState' });
        this.setState({
            store: store
        });
    }

    loadInitialStateMetric(type) {
//      console.log('In PromptForDesign.loadInitialStateMetric type=', type);

      /* eslint-disable no-underscore-dangle */
      const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
      /* eslint-enable */

      const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

      var { initialState } = require('../designtypes/'+type+'/initialState_metric_units.js'); // Dynamically load initialState
      var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
      const store = createStore(reducers, {name: "initialState", model: state}, middleware);
      store.dispatch(startup());
      store.dispatch(deleteAutoSave());
      logUsage('event', 'PromptForDesign', { 'event_label': type + ' load initialState' });
      this.setState({
          store: store
      });
  }

    loadAutoSave() {
//        console.log('In PromptForDesign.loadAutoSave');

        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/* loggerMiddleware, */dispatcher));

//        console.log("Restore Auto Save");
        var state = JSON.parse(localStorage.getItem('autosave'));
        var name = state.name; // get name from model to restore it ***FUDGE*** for compatibility with existing autosave files
        delete state.name; // after restoring it delete name from model ***FUDGE*** for compatibility with existing autosave files
//        console.log('In PromptForDesign.loadAutoSave state=',state,'type=',state.type,'name=',name);
        const store = createStore(reducers, {name: name, model: state}, middleware);
        store.dispatch(startup());
        store.dispatch(deleteAutoSave());
        logUsage('event', 'PromptForDesign', { 'event_label': state.type + ' load autoSave' });
        this.setState({
            store: store
        });
    }

    onSelectType(event) {
//        console.log('In PromptForDesign.onSelectType event.target.value=',event.target.value);
        this.setState({
            type: event.target.value
        });
        this.getDesignNames(event.target.value);
    }

    onSelectName(event) {
//        console.log('In PromptForDesign.onSelectName event.target.value=',event.target.value);
        this.setState({
            name: event.target.value
        });
    }

    onOpen() {
//        console.log('In PromptForDesign.onOpen this.state.type=',this.state.type,' this.state.name=',this.state.name);
        this.setState({
            modal: !this.state.modal
        });
        // Load the model
        this.getDesign(this.state.type,this.state.name);
    }

    onLoadAutoSave() {
//        console.log('In PromptForDesign.onLoadAutoSave');
        this.setState({
            modal: !this.state.modal
        });
        this.loadAutoSave();
    }

    onLoadInitialState() {
//        console.log('In PromptForDesign.onLoadInitialState this.state.type=',this.state.type);
        this.setState({
            modal: !this.state.modal
        });
        this.loadInitialState(this.state.type);
    }

    onLoadInitialStateMetric() {
//      console.log('In PromptForDesign.onLoadInitialStateMetric this.state.type=',this.state.type);
      this.setState({
          modal: !this.state.modal
      });
      this.loadInitialStateMetric(this.state.type);
  }

    onLogout() {
//        console.log('In PromptForDesign.onLogout');
        this.setState({
            modal: !this.state.modal
        });
        if (typeof(Storage) !== "undefined") {
//            console.log("Delete Auto Save");
            localStorage.removeItem('autosave'); // remove auto save file
        }
        this.props.auth.logout()
  }

    render() {
//        console.log('In PromptForDesign.render');
        if (this.state.store === null) {
            return (
                <React.Fragment>
                    <Modal show={this.state.modal} className={this.props.className} size="lg" backdrop='static'>
                        <Modal.Header>
                            <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>
                              Open Design Optimization Platform
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <a href="https://thegrumpys.github.io/odop/About/messageOfTheDay" target="_blank" rel="noopener noreferrer">Message-of-the-day </a>
                            <br />
                            Learn <a href="https://thegrumpys.github.io/odop/About/" target="_blank" rel="noopener noreferrer">About</a> ODOP
                            <br /><br />
                            <Form.Label htmlFor="fileOpenSelectType">Select design type to open:</Form.Label>
                            <Form.Control as="select" id="fileOpenSelectType" onChange={this.onSelectType} value={this.state.type}>
                                {this.state.designtypes.map((designtype, index) =>
                                    <option key={index} value={designtype}>{designtype}</option>
                                )}
                            </Form.Control>
                            <br />
                            <Form.Label htmlFor="fileOpenSelectName">Select design to open:</Form.Label>
                            <Form.Control as="select" id="fileOpenSelectName" onChange={this.onSelectName} value={this.state.name}>
                                {this.state.designs.filter((design,index,self) => {return self.map(design => {return design.name}).indexOf(design.name) === index}).map((design, index) =>
                                    <option key={index} value={design.name}>{design.name}{design.user === null ? ' [ReadOnly]' : ''}</option>
                                )}
                            </Form.Control>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.onLogout}>Logout</Button>
                            {process.env.NODE_ENV !== "production" && <Button variant="secondary" onClick={this.onLoadInitialState}>Load Initial State</Button>}{' '}
                            {process.env.NODE_ENV !== "production" && <Button variant="secondary" onClick={this.onLoadInitialStateMetric}>Load Initial State Metric</Button>}{' '}
                            {typeof(Storage) !== "undefined" && localStorage.getItem('autosave') !== null && <Button variant="secondary" onClick={this.onLoadAutoSave}>Load Auto Save</Button>}{' '}
                            <Button variant="primary" onClick={this.onOpen}>Open</Button>
                        </Modal.Footer>
                    </Modal>
                </React.Fragment>
            );
        } else {
            return (
              <Provider store={this.state.store}><App store={this.state.store} /></Provider>
            );
        }
    }
});
