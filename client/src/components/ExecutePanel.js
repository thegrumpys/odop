import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { load } from '../store/actionCreators';
import { connect } from 'react-redux';

export var startExecute = function(prefix,steps) {
//    console.log('In startExecute this=',this,'prefix=',prefix,'steps=',steps);
    if (steps !== undefined && steps[0] !== undefined) {
        var design = this.state.store.getState();
        this.setState({
            modal: true, // Default: do display
            prefix: prefix,
            // Put current store state into steps[0].state - remember this for "back" time travel
            steps: Object.assign([...steps], {0: Object.assign({}, steps[0], {state: design.model})}),
            step: 0,
            title: steps[0].title,
            text: steps[0].text, // Default: first text
        });
        if (steps[0].actions !== undefined) {
            steps[0].actions.forEach((action) => { this.state.store.dispatch(action); })
        }
    }
}

export var stopExecute = function() {
//    console.log('In stopExecute this=',this,'prefix=',prefix,'steps=',steps);
    var design = this.state.store.getState();
    this.setState({
        modal: false, // Default: do not display
        prefix: '',
        steps: null,
        step: 0,
        title: '',
        text: '',  // Default: no text
    });
}

class ExecutePanel extends Component {
    constructor(props) {
        super(props);
//        console.log('In ExecutePanel constructor props=',props);
        this.onNext = this.onNext.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onCancel = this.onCancel.bind(this);
        startExecute = startExecute.bind(this); // Bind external function - no 'this'
        stopExecute = stopExecute.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false, // Default: do not display
            prefix: '',
            steps: null,
            step: 0,
            title: '',
            text: '', // Default: no text
        };
    }
    
    componentDidMount() {
//        console.log('In ExecutePanel componentDidMount this.context=',this.context);
        this.setState({
            store: this.context.store
        });
    }

    componentWillUnmount() {
//        console.log('In ExecutePanel componentDidMount this.context=',this.context);
    }
    
    onCancel() {
//        console.log('In ExecutePanel onCancel');
        this.setState({
            modal: !this.state.modal,
            prefix: '',
            steps: null,
            step: 0,
            title: '',
            text: '',
        });
    }

    onNext() {
//        console.log('In ExecutePanel onNext steps=',this.state.steps);
        var next = this.state.step+1;
        if (this.state.steps[next] !== undefined) {
            var design = this.state.store.getState();
            this.setState({
                // Put current store state into steps[next].state - remember this for "back" time travel
                steps: Object.assign([...this.state.steps], {[next]: Object.assign({}, this.state.steps[next], {state: design.model})}),
                step: next,
                title: this.state.steps[next].title,
                text: this.state.steps[next].text
            });
            if (this.state.steps[next].actions !== undefined) {
                this.state.steps[next].actions.forEach((action) => { this.state.store.dispatch(action); })
            }
       } else {
            this.setState({
                modal: !this.state.modal,
                prefix: '',
                steps: null,
                step: 0,
                title: '',
                text: ''
            });
        }
    }

    onBack() {
//        console.log('In ExecutePanel onBack steps=',this.state.steps);
        var prev = this.state.step-1;
        if (prev < 0) prev = 0; // Stop going backwards if it is on the first step
        // Put steps[prev].state into current store state - that is, time travel back
        this.state.store.dispatch(load(this.state.steps[prev].state));
        this.setState({
            step: prev,
            title: this.state.steps[prev].title,
            text: this.state.steps[prev].text
        });
        if (this.state.steps[prev].actions !== undefined) {
            this.state.steps[prev].actions.forEach((action) => { this.state.store.dispatch(action); })
        }
    }
    
    render() {
//        console.log('In ExecutePanel.render this=', this);
        return this.state.modal && (
            <Alert variant="success" style={{marginTop: '10px'}}>
                <Container>
                    <Row>
                        <div className="col-5 text-left align-middle pl-0">
                            <b>{this.state.prefix}{this.state.title !== undefined && this.state.title.length > 0 ? ' - ' + this.state.title : ''}</b>
                        </div>
                        <div className="col-7 text-left align-middle">
                            <Button className="float-right ml-1" variant="primary" onClick={this.onNext} disabled={this.state.steps[this.state.step+1] === undefined}>Next</Button>
                            <Button className="float-right ml-1" variant="secondary" onClick={this.onBack} disabled={this.state.step === 0}>Back</Button>
                            <Button className="float-right ml-1" variant="secondary" onClick={this.onCancel}>Exit</Button>
                        </div>
                        <hr/>
                    </Row>
                    <Row>
                        <div style={{marginTop: '10px'}}>
                            {this.state.text}
                        </div>
                    </Row>
                </Container>
            </Alert>
        );
    }
    
}

ExecutePanel.contextTypes = {
    store: PropTypes.object
};

export default connect()(ExecutePanel);
