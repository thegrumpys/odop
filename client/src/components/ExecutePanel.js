import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Alert, Button, Container, Row } from 'react-bootstrap';
import { load } from '../store/actionCreators';
import { connect } from 'react-redux';
import { changeResultTerminationCondition } from '../store/actionCreators';
import { logUsage } from '../logUsage';

export var startExecute = function(prefix,execute_name,steps) {
//    console.log('In startExecute prefix=',prefix,'execute_name=',execute_name,'steps=',steps);
    if (steps !== undefined && steps[0] !== undefined) {
        const { store } = this.context;
        var design = store.getState();
        steps = Object.assign([...steps], {0: Object.assign({}, steps[0], {state: JSON.stringify(design)})});
//        console.log('In ExecutePanel.onNext steps=',steps);
        this.setState({
            execute_name: execute_name,
            modal: true, // Default: do display
            prefix: prefix,
            // Put current store state into steps[0].state - remember this for "back" time travel
            steps: steps,
            step: 0,
            title: steps[0].title,
            text: steps[0].text, // Default: first text
        });
        if (steps[0].actions !== undefined) {
            steps[0].actions.forEach((action) => { store.dispatch(action); })
        }
        window.scrollTo(0, 0);
    }
}

export var stopExecute = function() {
//    console.log('In stopExecute this=',this);
    logUsage('event', 'ExecutePanel', { event_label: 'stop ' + this.state.execute_name});
    this.setState({
        execute_name: undefined, // Clear execute name
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
//        console.log('In ExecutePanel.constructor props=',props);
        super(props);
        this.onNext = this.onNext.bind(this);
        this.onBack = this.onBack.bind(this);
        this.onCancel = this.onCancel.bind(this);
        startExecute = startExecute.bind(this); // Bind external function - no 'this'
        stopExecute = stopExecute.bind(this); // Bind external function - no 'this'
        this.state = {
            execute_name: undefined, // Start wit no execute name
            modal: false,
            prefix: '',
            steps: null,
            step: 0,
            title: '',
            text: '', // Default: no text
        };
    }
    
    componentDidMount() {
//        console.log('In ExecutePanel.componentDidMount this=',this);
        if (this.state.execute_name !== undefined) {
//            console.log('In ExecutePanel.componentDidMount this.state.execute_name=',this.state.execute_name);
            var { execute } = require('../designtypes/'+this.props.type+'/'+this.state.execute_name+'.js'); // Dynamically load execute
//            console.log('In ExecutePanel.componentDidMount execute=',execute);
            startExecute('Execute : ' + this.state.execute_name, this.state.execute_name, execute.steps);
        }
        this.setState({
            store: this.context.store
        });
    }

    componentDidUpdate(prevProps) {
//        console.log('In ExecutePanel.componentDidUpdate this=',this,'prevProps=',prevProps);
        if (prevProps.type !== this.props.type) {
//            console.log('In ExecutePanel.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
//            console.log('In ExecutePanel.componentDidUpdate this.state.execute_name=',this.state.execute_name,'prefix=',this.state.prefix);
            if (this.state.execute_name !== undefined) {
                stopExecute();
            }
        }
    }

    onCancel() {
//        console.log('In ExecutePanel.onCancel this=',this);
        stopExecute();
        this.props.changeResultTerminationCondition(''); // Reset any leftover messages
    }

    onNext() {
//        console.log('In ExecutePanel.onNext this=',this);
        var next = this.state.step+1;
        if (this.state.steps[next] !== undefined) {
            const { store } = this.context;
            var design = store.getState();
            var steps = Object.assign([...this.state.steps], {[next]: Object.assign({}, this.state.steps[next], {state: JSON.stringify(design)})});
//            console.log('In ExecutePanel.onNext steps=',steps);
            this.setState({
                // Put current store state into steps[next].state - remember this for "back" time travel
                steps: steps,
                step: next,
                title: this.state.steps[next].title,
                text: this.state.steps[next].text
            });
            if (this.state.steps[next].actions !== undefined) {
                this.state.steps[next].actions.forEach((action) => { store.dispatch(action); })
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
//        console.log('In ExecutePanel.onBack this=',this);
        var prev = this.state.step-1;
        if (prev < 0) prev = 0; // Stop going backwards if it is on the first step
        // Put steps[prev].state into current store state - that is, time travel back
        const { store } = this.context;
//        console.log('In ExecutePanel.onBack this.state.steps=',this.state.steps);
//        console.log('In ExecutePanel.onBack JSON.parse(this.state.steps[prev].state)=',JSON.parse(this.state.steps[prev].state));
        store.dispatch(load(JSON.parse(this.state.steps[prev].state)));
        this.setState({
            step: prev,
            title: this.state.steps[prev].title,
            text: this.state.steps[prev].text
        });
        if (this.state.steps[prev].actions !== undefined) {
            this.state.steps[prev].actions.forEach((action) => { store.dispatch(action); })
        }
    }
    
    render() {
//        console.log('In ExecutePanel.render this=',this);
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

const mapStateToProps = state => ({
    type: state.model.type,
});

const mapDispatchToProps = {
    changeResultTerminationCondition: changeResultTerminationCondition,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExecutePanel);
