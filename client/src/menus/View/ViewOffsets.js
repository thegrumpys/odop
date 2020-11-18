import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewOffsets extends Component {

    constructor(props) {
//        console.log('In ViewOffsets.constructor');
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
        if (this.state.modal) logUsage('event', 'ViewOffsets', { 'event_label': 'ViewOffsets'});
    }

    render() {
//        console.log('In ViewOffsets.render this.props=', this.props);
        var ip = 0;
        var ix = 0;
        var isc = 0;
        var il = 0;
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    Offsets
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.toggle}>
                    <Modal.Header>
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
                        {'\n// System Controls (Preferences)\n'}
                        {Object.keys(this.props.system_controls).map((element) => { return 'export const ' + element.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (isc++) + ';\n'})}
                        {'\n// Labels (Properties)\n'}
                        {this.props.labels.map((element) => {return 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (il++) + ';\n'})}
                        </pre>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.toggle}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    labels: state.model.labels
});

export default connect(mapStateToProps)(ViewOffsets);
