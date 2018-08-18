import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Label, Input } from 'reactstrap';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import { initialState } from '../designtypes/Piston-Cylinder/initialState';
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
        this.onSelectType = this.onSelectType.bind(this);
        this.onSelectName = this.onSelectName.bind(this);
        this.state = {
            modal: true,
            designtypes: [],
            designs: [],
            type: "Piston-Cylinder",
            name: "startup"
        };
        this.getDesigns();
    }

    getDesigns() {
//        console.log('In PromptForDesign.getDesigns');
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        // Get the designs and store them in state
        displaySpinner(true);
        fetch('/api/v1/designtypes')
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
                fetch('/api/v1/designtypes/'+this.state.type+'/designs')
                .then(res => {
                    displaySpinner(false);
                    if (!res.ok) {
                       throw Error(res.statusText);
                    }
                    return res.json()
                })
                .then(designs => {
//                    console.log('In PromptForDesign.getDesigns designs=',designs)
                    this.setState({ 
                        designs: designs
                    })
                })
                .catch(error => {
                    this.setState({
                        modal: !this.state.modal
                    });
                    displayError('GET of design names for design types failed with message: \''+error.message+'\'. Using builtin initial state instead. You may continue in "demo mode" but you will be unable to save your work.');
                    var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
                    const store = createStore(reducers, state, middleware);
                    ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
                });
            })
            .catch(error => {
                this.setState({
                    modal: !this.state.modal
                });
                displayError('GET of design types failed with message: \''+error.message+'\'. Using builtin initial state instead. You may continue in "demo mode" but you will be unable to save your work.');
                var state = Object.assign({}, initialState, { system_controls: initialSystemControls }); // Merge initialState and initialSystemControls
                const store = createStore(reducers, state, middleware);
                ReactDOM.render(<Provider store={store}><App store={store} /></Provider>, document.getElementById('root2'));
            });
    }
    
    getDesign(type,name) {
//        console.log('In PromptForDesign.getDesigns type=', type, ' name=', name);
        
        /* eslint-disable no-underscore-dangle */
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        /* eslint-enable */

        const middleware = composeEnhancers(applyMiddleware(/*loggerMiddleware,*/dispatcher));

        displaySpinner(true);
        fetch('/api/v1/designtypes/'+type+'/designs/'+name)
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
                displayError('GET of \''+name+'\' design failed with message: \''+error.message+'\'');
            });
    }

    onSelectType(event) {
//        console.log('In PromptForDesign.onSelectType event.target.value=',event.target.value);
        this.setState({
            type: event.target.value 
        });
    }
    
    onSelectName(event) {
//      console.log('In PromptForDesign.onSelectName event.target.value=',event.target.value);
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
        var type = this.state.type;
        if (type === undefined) type = 'Piston-Cylinder';
        var name = this.state.name;
        if (name === undefined) name = 'startup';
        this.getDesign(type,name);
    }
    
    onCancel() {
//        console.log('In PromptForDesign.onCancel');
        this.setState({
            modal: !this.state.modal
        });
        // Noop - all done
    }

    render() {
        return (
            <React.Fragment>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                    <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/>
                      Open Design Optimization Platform
                    </ModalHeader>
                    <ModalBody>
                        Experimental software: <a href="https://thegrumpys.github.io/odop/About/" target="_blank" rel="noopener noreferrer">See details</a>
                        <br /><br />
                        <Label for="fileOpenSelectType">Select design type to open:</Label>
                        <Input type="select" id="fileOpenSelectType" onChange={this.onSelectType} value={this.state.type}>
                            {this.state.designtypes.map((designtype, index) =>
                                <option key={index} value={designtype}>{designtype}</option>
                            )}
                        </Input>
                        <Label for="fileOpenSelectName">Select design to open:</Label>
                        <Input type="select" id="fileOpenSelectName" onChange={this.onSelectName} value={this.state.name}>
                            {this.state.designs.map((design, index) =>
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

