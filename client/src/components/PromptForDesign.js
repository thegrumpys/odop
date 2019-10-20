import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Label, Input } from 'reactstrap';
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
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

export class PromptForDesign extends Component {
    
    constructor(props) {
        super(props);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginError = this.onLoginError.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onLoadInitialState = this.onLoadInitialState.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.state = {
            modal: true,
            designtypes: [],
            designs: [],
            type: "Spring/Compression",
            name: "startup",
            authenticated: false,
            authtoken: null,
        };
    }

    componentDidMount() {
        console.log('In PromptForDesign.componentDidMount');
        this.widget = new OktaSignIn({
          baseUrl: 'https://dev-729070.okta.com',
          clientId: "0oa1itosqdQvfGNMD357",  // spa
//          clientId: "0oa1kkefuuMoIcv9w357", // web
          redirectUri: 'http://localhost:3000/xxx',
//          i18n: {
//              en: {
//                'primaryauth.title': 'Sign in to React & Company',
//              },
//          },
          authParams: {
              issuer: "https://dev-729070.okta.com/oauth2/default",
              responseType: ['token', 'id_token'], // spa
//              responseType: ['code'], // web
              display: 'page',
//              pkce: true,
//              scopes: ['openid', 'profile', 'email'],
          },
          pkce: true
        });
        this.widget.renderEl({el: '#osw-container'}, this.onLoginSuccess, this.onLoginError);
    }

    componentWillUnmount() {
        console.log('In PromptForDesign.componentWillUnmount');
        this.widget.remove();
    }

    getDesignTypes() {
//        console.log('In PromptForDesign.getDesignTypes');

        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes' , {
                headers: {
                    Authorization: 'Bearer ' + this.state.authtoken
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
//                console.log('In PromptForDesign.getDesigns designtypes=',designtypes)
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
//        console.log('In PromptForDesign.getDesignNames type=', type);

        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs', {
                headers: {
                    Authorization: 'Bearer ' + this.state.authtoken
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
//                console.log('In PromptForDesign.getDesigns designs=',designs)
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
//        console.log('In PromptForDesign.getDesign type=', type, ' name=', name);
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        displaySpinner(true);
        fetch('/api/v1/designtypes/'+encodeURIComponent(type)+'/designs/'+encodeURIComponent(name), {
                headers: {
                    Authorization: 'Bearer ' + this.state.authtoken
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
                ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
                logUsage('function=PromptForDesign,type='+type+',name='+name);
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
        ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
    }

    onLoginSuccess(res) {
        console.log('In PromptForDesign.onLoginSuccess res=',res);
        // The properties in the response object depend on two factors:
        // 1. The type of authentication flow that has just completed, determined by res.status
        // 2. What type of token the widget is returning

        // The user has started the password recovery flow, and is on the confirmation
        // screen letting them know that an email is on the way.
        if (res.status === 'FORGOT_PASSWORD_EMAIL_SENT') {
          // Any followup action you want to take
          return;
        }

        // The user has started the unlock account flow, and is on the confirmation
        // screen letting them know that an email is on the way.
        if (res.status === 'UNLOCK_ACCOUNT_EMAIL_SENT') {
          // Any followup action you want to take
          return;
        }

        // The user has successfully completed the authentication flow
        if (res.status === 'SUCCESS') {

          // Handle success when the widget is not configured for OIDC

//          if (res.type === 'SESSION_STEP_UP') {
//            // Session step up response
//            // If the widget is not configured for OIDC and the authentication type is SESSION_STEP_UP,
//            // the response will contain user metadata and a stepUp object with the url of the resource
//            // and a 'finish' function to navigate to that url
//            console.log(res.user);
//            console.log('Target resource url: ' + res.stepUp.url);
//            res.stepUp.finish();
//            return;
//          } else {
//            // If the widget is not configured for OIDC, the response will contain
//            // user metadata and a sessionToken that can be converted to an Okta
//            // session cookie:
//            console.log(res.user);
//            res.session.setCookieAndRedirect('https://acme.com/app');
//            return;
//          }


          // OIDC response

          // If the widget is configured for OIDC with a single responseType, the
          // response will be the token.
          // i.e. authParams.responseType = 'id_token':
//          this.widget.tokenManager.add('my_id_token', res);

          // If the widget is configured for OIDC with multiple responseTypes, the
          // response will be an array of tokens:
          // i.e. authParams.responseType = ['id_token', 'token']
//          this.widget.tokenManager.add('my_id_token', res[0]);
//          this.widget.tokenManager.add('my_access_token', res[1]);
          console.log(res[0].accessToken);
          console.log(res[1].idToken);

          this.setState({
              authenticated: true,
              authtoken: res[0].accessToken,
              idtoken: res[1].idToken,
          });
          this.widget.remove();
          this.getDesignTypes();
          return;
        }
    }
    
    onLoginError(err) {
        // This function is invoked with errors the widget cannot recover from:
        // Known errors: CONFIG_ERROR, UNSUPPORTED_BROWSER_ERROR
        console.log('In PromptForDesign.onLoginError err=',err);
        throw err;
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
        return (
            <React.Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                    <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>
                      Open Design Optimization Platform
                    </ModalHeader>
                    <ModalBody>
                        {!this.state.authenticated && <div id="osw-container" />}
                        {this.state.authenticated && <React.Fragment>
                        <a href="https://thegrumpys.github.io/odop/About/messageOfTheDay" target="_blank" rel="noopener noreferrer">Message-of-the-day </a> 
                        <br />
                        Learn <a href="https://thegrumpys.github.io/odop/About/" target="_blank" rel="noopener noreferrer">About</a> ODOP
                        <br /><br />
                        <Label for="fileOpenSelectType">Select design type to open:</Label>
                        <Input type="select" id="fileOpenSelectType" onChange={this.onSelectType} value={this.state.type}>
                            {this.state.designtypes.map((designtype, index) =>
                                <option key={index} value={designtype}>{designtype}</option>
                            )}
                        </Input>
                        <br />
                        <Label for="fileOpenSelectName">Select design to open:</Label>
                        <Input type="select" id="fileOpenSelectName" onChange={this.onSelectName} value={this.state.name}>
                            {this.state.designs.map((design, index) =>
                                <option key={index} value={design}>{design}</option>
                            )}
                        </Input>
                        </React.Fragment>}
                    </ModalBody>
                    {this.state.authenticated && <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        {process.env.NODE_ENV !== "production" && <Button color="secondary" onClick={this.onLoadInitialState}>Load Initial State</Button>}{' '}
                        <Button color="primary" onClick={this.onOpen}>Open</Button>
                    </ModalFooter>}
                </Modal>
            </React.Fragment>
        );
    }
}  

