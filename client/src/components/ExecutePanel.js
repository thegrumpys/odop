import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Button } from 'reactstrap';

export var startExecute = function(steps) {
//    console.log('In startExecute steps=',steps);
    if (steps[0] !== undefined) {
        this.setState({
            modal: true, // Default: do display
            steps: steps,
            step: 0,
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
        this.onCancel = this.onCancel.bind(this);
        startExecute = startExecute.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false, // Default: do not display
            steps: null,
            step: 0,
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
            steps: null,
            step: 0,
            text: ''
        });
    }

    onNext() {
//        console.log('In ExecutePanel onNext');
        var next = this.state.step+1;
        if (this.state.steps[next] !== undefined) {
            this.setState({
                step: next,
                text: this.state.steps[next].text
            });
            if (this.state.steps[next].actions !== undefined) {
                this.state.steps[next].actions.forEach((action) => { this.state.store.dispatch(action); })
            }
       } else {
            this.setState({
                modal: !this.state.modal,
                steps: null,
                step: 0,
                text: ''
            });
        }
    }

    render() {
//        console.log('In ExecutePanel render this.state.text=',this.state.text);
        return this.state.modal && (
            <Alert style={{marginTop: '10px'}}>
                {this.state.text}
                <div className="text-right align-middle">
                    <Button color="secondary" onClick={this.onCancel}>Cancel</Button>{' '}
                    <Button color="primary" onClick={this.onNext}>Next</Button>
                </div>
            </Alert>
        );
    }
    
}

ExecutePanel.contextTypes = {
        store: PropTypes.object
    };

