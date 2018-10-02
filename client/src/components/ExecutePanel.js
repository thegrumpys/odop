import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button } from 'reactstrap';

export var startExecute = function(prefix,steps) {
//    console.log('In startExecute steps=',steps);
    if (steps !== undefined && steps[0] !== undefined) {
        this.setState({
            modal: true, // Default: do display
            prefix: prefix,
            steps: steps,
            step: 0,
            title: steps[0].title,
            text: steps[0].text, // Default: first text
        });
        if (steps[0].actions !== undefined) {
            steps[0].actions.forEach((action) => { this.state.store.dispatch(action); })
        }
    }
}

export class ExecutePanel extends React.Component {
    constructor(props) {
        super(props);
//        console.log('In ExecutePanel constructor props=',props);
        this.onNext = this.onNext.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onCancel = this.onCancel.bind(this);
        startExecute = startExecute.bind(this); // Bind external function - no 'this'
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
            text: ''
        });
    }

    onNext() {
//        console.log('In ExecutePanel onNext');
        var next = this.state.step+1;
        if (this.state.steps[next] !== undefined) {
            this.setState({
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
//      console.log('In ExecutePanel onBack');
        var prev = this.state.step-1;
        if (prev < 0) prev = 0;
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
//        console.log('In ExecutePanel render this.state.text=',this.state.text);
        return this.state.modal && (
            <Alert style={{marginTop: '10px'}}>
                <div className="text-left align-middle">
                    <b>{this.state.prefix}{this.state.title !== undefined && this.state.title.length > 0 ? ' - ' + this.state.title : ''}</b>
                    <Button className="float-right" color="primary" onClick={this.onNext}>Next</Button>
                    <span className="float-right">&nbsp;</span>
                    <Button className="float-right" color="secondary" onClick={this.onBack}>Back</Button>
                    <span className="float-right">&nbsp;</span>
                    <Button className="float-right" color="secondary" onClick={this.onCancel}>Cancel</Button>
                </div>
                <hr/>
                <div style={{marginTop: '10px'}}>
                    {this.state.text}
                </div>
            </Alert>
        );
    }
    
}

ExecutePanel.contextTypes = {
    store: PropTypes.object
};

