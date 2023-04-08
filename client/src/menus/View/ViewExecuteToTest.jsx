import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

export var outputClear = function(line) {
    console.log('In outputClear','line=',line);
    console.log('In outputClear','this=',this);
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
    console.log('In outputClear','prevState=',prevState,'props=',props);
            var l;
            l = <>{line}<br /></>;
            return {
                lines: l, // Clear lines
            };
        }
    );
}

export var outputLine = function(line) {
    console.log('In outputLine','line=',line);
    console.log('In outputLine','this=',this);
    this.setState( // Special form of setState using updater function
        (prevState, props) => {
    console.log('In outputLine','prevState=',prevState,'props=',props);
            var l;
            if (prevState.lines === undefined) {
                l = <>{line}<br /></>;
                return {
                    lines: l, // Initialize lines
                };
            } else {
                l = <>{prevState.lines}{line}<br /></>;
                return {
                    lines: l // Concatenate lines
                };
            }
        }
    );
}

class ViewExecuteToTest extends Component {

    constructor(props) {
        console.log('In ViewExecuteToTest.constructor props=',props)
        super(props);
        this.toggle = this.toggle.bind(this);
        outputClear = outputClear.bind(this); // Bind external function - no 'this'
        outputLine = outputLine.bind(this); // Bind external function - no 'this'
        this.state = {
            modal: false,
        };
    }
    
    toggle() {
        console.log('In ViewExecuteToTest.toggle');
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'ViewExecuteToTest', { event_label: 'ViewExecuteToTest'});
    }

    render() {
        console.log('In ViewExecuteToTest.render this=',this);
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    ExecuteToTest
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : ExecuteToTest
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>
                        {this.state.lines}
                        </pre>
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
