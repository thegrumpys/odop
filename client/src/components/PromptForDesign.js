import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { initialState } from '../problems/Piston-Cylinder/initialState';
import { initialSystemControls } from '../initialSystemControls';
import App from './App';
import { displaySpinner } from './Spinner';
import { displayError } from './ErrorModal';
import { reducers } from '../store/reducers';
import { dispatcher } from '../store/middleware/dispatcher';

export class PromptForDesign extends React.Component {
    constructor(props) {
        super(props);
        this.onCancel = this.onCancel.bind(this);
        this.onOpen = this.onOpen.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            modal: true,
            designs: [],
            name: "startup"
        };
        this.getDesigns();
    }

    getDesigns() {
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designs')
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                   throw Error(res.statusText);
                }
                return res.json()
            })
            .then(designs => this.setState({ designs }))
            .catch(error => {
//                displayError('GET of design names failed: '+error.message);
                this.setState({
                    modal: !this.state.modal
                });
                displayError('GET of design names failed with message: \''+error.message+'\'. Using builtin initial state instead. You may continue in "demo mode" but you will be unable to save your work.');
                var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
                const store = createStore(reducers, state, middleware);
                ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
            });
    }
    
    getDesign(name) {
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        displaySpinner(true);
        fetch('/api/v1/designs/'+name)
            .then(res => {
                displaySpinner(false);
                if (!res.ok) {
                    throw Error(res.statusText);
                }
                return res.json()
            })
            .then(design => {
                const store = createStore(reducers, design, middleware);
                ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
            })
            .catch(error => {
                displayError('GET of \''+name+'\' design failed: '+error.message);
            });
    }

    onSelect(event) {
//        console.log(event.target.value)
        this.setState({
            name: event.target.value 
        });
    }
    
    onOpen() {
        this.setState({
            modal: !this.state.modal
        });
//        console.log(this.state.name);
        // Load the model
        var name = this.state.name;
        if (name === undefined) name = 'startup';
        this.getDesign(name);
    }
    
    onCancel() {
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        const { designs } = this.state;
        return (
            <React.Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                    <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>
                      Open Design Optimization Platform
                    </ModalHeader>
                    <ModalBody>
                        Experimental software: <a href="https://thegrumpys.github.io/pcyl-web/About/" target="_blank" rel="noopener noreferrer">See details</a>
                        <br /><br />
                        <Label for="fileOpenSelect">Select design to open:</Label>
                        <Input type="select" id="fileOpenSelect" onChange={this.onSelect} value={this.state.name}>
                            {designs.map((design, index) =>
                                <option key={index} value={design}>{design}</option>
                            )}
                        </Input>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onOpen}>Open</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

