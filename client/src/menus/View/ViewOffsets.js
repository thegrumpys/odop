import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewOffsets extends Component {

    constructor(props) {
//        console.log('In ViewOffsets.constructor props=',props)
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }
    
    toggle() {
//        console.log('In ViewOffsets.toggle');
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('event', 'ViewOffsets', { event_label: 'ViewOffsets'});
    }

    render() {
//        console.log('In ViewOffsets.render this=',this);
        var ip = 0;
        var ix = 0;
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    Offsets
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Offsets
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>
                        {'// Independent Variables (input-only)\n'}
                        {this.props.symbol_table.map((element) => {return (element.type === "equationset" && element.input) ? 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ip++) + ';\n' : ''})}
                        {'\n// Dependent Variables (input-output)\n'}
                        {this.props.symbol_table.map((element) => {return ((element.type === "equationset" && !element.input) || (element.type === "calcinput")) ? 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ix++) + ';\n' : ''})}
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

export default connect(mapStateToProps)(ViewOffsets);
