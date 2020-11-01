import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewCADModel extends Component {

    constructor(props) {
//        console.log('In ViewCADModel.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }
    
    toggle() {
//        console.log('In ViewCADModel.toggle');
        this.setState({
            modal: !this.state.modal
        });
        logUsage('event', 'ViewCADModel', { 'event_label': 'ViewCADModel'});
    }

    render() {
//        console.log('In ViewCADModel.render');

        var catalog_name = this.props.symbol_table[62];
        console.log('In ViewCADModel.render Catalog_Name=',catalog_name);
        var material_type = this.props.symbol_table[37];
        console.log('In ViewCADModel.render Material_Type=',material_type);
        var od_free = this.props.symbol_table[0];
        console.log('In ViewCADModel.render OD_Free=',od_free);
        var wire_dia = this.props.symbol_table[1];
        console.log('In ViewCADModel.render Wire_Dia=',wire_dia);
        var l_free = this.props.symbol_table[14];
        console.log('In ViewCADModel.render L_Free=',l_free);

        var prefix = "https://sae-embedded.qa.partcommunity.com/3d-cad-models/?info=sae%2Fmodeling%2Fsprings%2Fas24586a.prj";
        console.log('In ViewCADModel.render prefix=',prefix);
        var varset = "varset={MAT=" + (material_type.value == 2 ? 'MW' : 'CRES') + '},{OD=' + (od_free.value) + '},{DD=' + (wire_dia.value) + '},{L=' + (l_free.value) + '}';
        console.log('In ViewCADModel.render varset=',varset);
        var src = prefix + '&' + varset;
        console.log('In ViewCADModel.render src=',src);

        return (
            <React.Fragment>
                <NavDropdown.Item onClick={this.toggle} disabled={catalog_name.value === ''}>
                    CAD Model
                </NavDropdown.Item>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.toggle} size="lg">
                    <Modal.Header>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : CAD Model
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe id="pcomiframe" src={src} width="100%" height="1024px" onLoad="this.contentWindow.postMessage('PCOM_DOCUMENT_SIZE','*')" sandbox="allow-forms allow-scripts allow-same-origin allow-popups" referrerPolicy="origin-when-cross-origin"></iframe>
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
});

export default connect(mapStateToProps)(ViewCADModel);
