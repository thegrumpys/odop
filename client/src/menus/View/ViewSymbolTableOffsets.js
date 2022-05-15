import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewSymbolTableOffsets extends Component {

    constructor(props) {
//        console.log('In ViewSymbolTableOffsets.constructor props=',props)
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
        if (this.state.modal) logUsage('event', 'ViewSymbolTableOffsets', { event_label: 'ViewSymbolTableOffsets'});
    }

    render() {
//        console.log('In ViewSymbolTableOffsets.render this=',this);
        var ip = 0;
        var il = 0;
        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    SymbolTableOffsets
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : SymbolTableOffsets
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <pre>
                        {'// Variables\n'}
                        {this.props.symbol_table.map((element) => {return 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (ip++) + ';\n'})}
                        {'\n// Labels (Properties)\n'}
                        {this.props.labels.map((element) => {return 'export const ' + element.name.replace('%','PC').replace(/[^a-zA-Z0-9]/g,'_') + ' = ' + (il++) + ';\n'})}
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

export default connect(mapStateToProps)(ViewSymbolTableOffsets);
