import React, { Component } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { initialSystemControls } from '../initialSystemControls';
import App from './App';
import { startup } from '../store/actionCreators';
import { displaySpinner } from './Spinner';
import { displayError } from './ErrorModal';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';
import { logUsage } from '../logUsage';
import { withAuth } from '@okta/okta-react';
import config from './config';

export default withAuth(class PromptForDesign extends Component {
    
    constructor(props) {
        super(props);
//        console.log("In PromptForDesign.constructor props=",props);
        this.onCancel = this.onCancel.bind(this);
        this.onLoadInitialState = this.onLoadInitialState.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.state = {
            modal: true,
            designtypes: [],
            designs: [],
            type: config.design.type,
            name: config.design.name,
            authenticated: null,
            uid: null,
            store: null,
        };
    }

    async componentDidMount() {
//        console.log('In PromptForDesign.componentDidMount');
        var authenticated = await this.props.auth.isAuthenticated();
//        console.log("In PromptForDesign.componentDidMount before authenticated=",authenticated);
        var session = await this.props.auth._oktaAuth.session.get();
//        console.log('In PromptForDesign.componentDidMount session=',session);
        if (session.status === "INACTIVE") {
//            console.log('In PromptForDesign.componentDidMount INACTIVE session.status=',session.status);
            authenticated = authenticated && false; // Combine with session status
        }
//        console.log("In PromptForDesign.componentDidMount after authenticated=",authenticated);
        if (authenticated !== this.state.authenticated) { // Did authentication change?
            this.setState({ authenticated }); // Remember our current authentication state
            if (authenticated) { // We have become authenticated
                this.setState({
                    uid: session.userId,
                });
            } else { // We have become unauthenticated
                this.setState({
                    uid: null,
                });
            }
            this.getDesignTypes();
        }
    }

    getDesignTypes() {
//        console.log('In PromptForDesign.getDesignTypes uid=', this.state.uid);

        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes', {
                headers: {
                    Authorization: 'Bearer ' + this.state.uid
                }
            })
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                   throw Error(res.statusText);
                }
                return res.json()
            })
            .then(designtypes => {
//                console.log('In PromptForDesign.getDesigns designtypes=',designtypes);
                this.setState({ 
                    designtypes: designtypes
                })
                this.getDesignNames(this.state.type);
            })
            .catch(error => {
                this.setState({
                    modal: !this.state.modal
                });
                displayError('GET of design types failed with message: \''+error.message+'\'. Using builtin initial state instead. You may continue in "demo mode" but you will be unable to save your work.');
                this.loadInitialState(this.state.type);
            });
    }
    
    getDesignNames(type) {
//        console.log('In PromptForDesign.getDesignNames type=', type, ' uid=', this.state.uid);

        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
                headers: {
                    Authorization: 'Bearer ' + this.state.uid
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
//                console.log('In PromptForDesign.getDesigns designs=',designs);
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
    
    getDesign(type,name) {
//        console.log('In PromptForDesign.getDesign type=', type, ' name=', name, ' uid=', this.state.uid);
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                headers: {
                    Authorization: 'Bearer ' + this.state.uid
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
//                console.log('In PromptForDesign.getDesigns design=', design);
                var { migrate } = require('../designtypes/'+design.type+'/migrate.js'); // Dynamically load migrate
                var migrated_design = migrate(design);
                const store = createStore(reducers, migrated_design, middleware);
                store.dispatch(startup());
                logUsage('event', 'PromptForDesign', { 'event_label': type + ' ' + name });
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
//        console.log('In PromptForDesign.loadInitialState type=', type);
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        var { initialState } = require('../designtypes/'+type+'/initialState.js'); // Dynamically load initialState
        var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
        const store = createStore(reducers, state, middleware);
        store.dispatch(startup());
        logUsage('event', 'PromptForDesign', { 'event_label': type + ' load initialState' });
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
    
    onLoadInitialState() {
//        console.log('In PromptForDesign.onLoadInitialState this.state.type=',this.state.type);
        this.setState({
            modal: !this.state.modal
        });
        this.loadInitialState(this.state.type);
    }

    
    onCancel() {
//        console.log('In PromptForDesign.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
//        console.log('In PromptForDesign.render');
        if (this.state.store === null) {
            return (
                <React.Fragment>
                    <Modal show={this.state.modal} className={this.props.className} size="lg">
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
                            <Button variant="secondary" onClick={() => this.props.auth.logout()}>Logout</Button>
                            <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                            {process.env.NODE_ENV !== "production" && <Button variant="secondary" onClick={this.onLoadInitialState}>Load Initial State</Button>}{' '}
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
