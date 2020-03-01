import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewSymbolTableOffsets extends Component {

    constructor(props) {
//        console.log('In ViewSymbolTableOffsets.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }
    
    toggle() {
//        console.log('In ViewSymbolTableOffsets.toggle');
        this.setState({
            modal: !this.state.modal
        });
        if (this.state.modal) logUsage('function=ViewSymbolTableOffsets');
    }

    render() {
//        console.log('In ViewSymbolTableOffsets.render');
        var ip = 0;
        var isc = 0;
        var il = 0;
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle}>
                    SymbolTableOffsets
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className}>
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : SymbolTableOffsets
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>
                        {'// Variables\n'}
                        {this.props.symbol_table.map((element) => {return 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ip++) + ';\n'})}
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
    symbol_table: state.symbol_table,
    system_controls: state.system_controls,
    labels: state.labels
});

export default connect(mapStateToProps)(ViewSymbolTableOffsets);
