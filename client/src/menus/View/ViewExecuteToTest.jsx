import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

export var outputStart = function(execute_name) {
//    console.log('In outputStart','execute_name=',execute_name);
    if (this === undefined) return;
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
            var line = '    // Execute File: ' + execute_name;
            var l = <>{line}<br /></>;
            return {
                execute_name: execute_name, // Clear lines
                lines: l, // Clear lines
            };
        }
    );
}

export var outputLine = function(line) {
//    console.log('In outputLine','line=',line);
    if (this === undefined) return;
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
            var l = <>{prevState.lines}{line}<br /></>;
            return {
                lines: l // Concatenate lines
            };
        }
    );
}

export var outputStop = function() {
//    console.log('In outputStop','this=',this);
    if (this === undefined) return;
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
            var l = <>{prevState.lines}</>;
            return {
                lines: l, // Clear lines
            };
        }
    );
}

class ViewExecuteToTest extends Component {

    constructor(props) {
//        console.log('In ViewExecuteToTest.constructor props=',props)
        super(props);
        this.toggle = this.toggle.bind(this);
        outputStart = outputStart.bind(this); // Bind external function - no 'this'
        outputLine = outputLine.bind(this); // Bind external function - no 'this'
        outputStop = outputStop.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false,
            lines: null,
        };
    }

    toggle() {
//        console.log('In ViewExecuteToTest.toggle');
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'ViewExecuteToTest', { event_label: 'ViewExecuteToTest'});
    }

    render() {
//        console.log('In ViewExecuteToTest.render this=',this);
        var pre_lines = `import { createStore, applyMiddleware } from 'redux';
import { initialState } from '../../../designtypes/Spring/Compression/initialState';
import { initialSystemControls } from '../../../initialSystemControls';
import { loadInitialState,
         changeLabelsValue,
         changeSymbolValue,
         setSymbolFlag,
         resetSymbolFlag,
         changeSymbolConstraint,
         fixSymbolValue,
         freeSymbolValue,
         search,
         changeSystemControlsValue,
         seek } from '../../../store/actionCreators';
import { reducers } from '../../../store/reducers';
import { dispatcher } from '../../../store/middleware/dispatcher';
import { MIN, MAX, CONSTRAINED, FIXED, FDCL } from '../../../store/actionTypes';

// This is a mapping of the ${this.state.execute_name} execute file to an equivalent test case file

it('${this.state.execute_name}', () => {
    var state = Object.assign({}, initialState, { system_controls: initialSystemControls });
    const store = createStore(
        reducers,
        {"user": "USERID0123456789", name: "initialState", model: state},
        applyMiddleware(dispatcher));

    var design = store.getState().model; // before
    design = store.getState().model;
    expect(design.model.result.objective_value).toEqual(0.0);

`;
        var post_lines = `});

`;
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    ExecuteToTest
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle} size="xl">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : ExecuteToTest
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.lines !== null ?
                            <>
                                <pre>
                                {pre_lines}
                                </pre>
                                <pre>
                                {this.state.lines}
                                </pre>
                                <pre>
                                {post_lines}
                                </pre>
                            </>
                        :
                            'No lines. Select the View menu before running the execute file'
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    labels: state.model.labels
});

export default connect(mapStateToProps)(ViewExecuteToTest);
