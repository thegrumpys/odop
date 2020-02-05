import React, { Component } from 'react';
import { Dropdown.Item, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

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
    }

    render() {
//        console.log('In ViewOffsets.render');
        var ip = 0;
        var ix = 0;
        var isc = 0;
        var il = 0;
        return (
            <React.Fragment>
                <Dropdown.Item onClick={this.toggle}>
                    Offsets
                </Dropdown.Item>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Offsets </ModalHeader>
                    <ModalBody>
                        <pre>
                        {'// Independent Variables (input-only)\n'}
                        {this.props.symbol_table.map((element) => {return (element.input && element.equationset) ? 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ip++) + ';\n' : ''})}
                        {'\n// Dependent Variables (input-output)\n'}
                        {this.props.symbol_table.map((element) => {return ((!element.input && element.equationset) || (!element.equationset)) ? 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ix++) + ';\n' : ''})}
                        {'\n// System Controls (Preferences)\n'}
                        {Object.keys(this.props.system_controls).map((element) => { return 'export const ' + element.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (isc++) + ';\n'})}
                        {'\n// Labels (Properties)\n'}
                        {this.props.labels.map((element) => {return 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (il++) + ';\n'})}
                        </pre>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.toggle}>Close</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    system_controls: state.system_controls,
    labels: state.labels
});

export default connect(mapStateToProps)(ViewOffsets);
