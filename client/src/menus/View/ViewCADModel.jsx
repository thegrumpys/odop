import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewCADModel extends Component {

    constructor(props) {
//        console.log('In ViewCADModel.constructor props=',props);
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }
    
    toggle() {
//        console.log('In ViewCADModel.toggle this=',this);
        this.setState({
            modal: !this.state.modal
        });
        logUsage('event', 'ViewCADModel', { event_label: 'ViewCADModel'});
    }

    render() {
//        console.log('In ViewCADModel.render this=',this);

        var od_free = this.props.symbol_table[0];
//        console.log('In ViewCADModel.render OD_Free=',od_free);
        var wire_dia = this.props.symbol_table[1];
//        console.log('In ViewCADModel.render Wire_Dia=',wire_dia);
        var coils_t = this.props.symbol_table[2];
//        console.log('In ViewCADModel.render Coils_T=',coils_t);

//        var l_free = this.props.symbol_table[14];
////        console.log('In ViewCADModel.render L_Free=',l_free);
//
//        var l_free_value = l_free.value;
//        var l_free_table = [
//            1.250,
//            1.375,
//            1.500,
//            1.625,
//            1.750,
//            1.875,
//            2.000,
//            2.125,
//            2.250,
//            2.375,
//            2.500,
//            2.750,
//            3.000,
//            3.250,
//            3.500,
//            3.750,
//            4.000,
//            4.250,
//            4.500,
//            4.750,
//            5.000,
//        ];
////        console.log('In ViewCADModel.render l_free_table=',l_free_table);
//        var l_free_fudged = l_free_table[l_free_table.length-1];
////        console.log('In ViewCADModel.render l_free_fudged=',l_free_fudged);
//        for (let i = 0; i < l_free_table.length; i++) {
////            console.log("i=",i,"l_free_value=",l_free_value,"l_free_table=",l_free_table[i]);
//            if (l_free_value < l_free_table[i]) {
//                var prev_diff = l_free_value-l_free_table[i-1];
//                var next_diff = l_free_table[i]-l_free_value;
////                console.log("i=",i,"prev_diff=",prev_diff,"next_diff=",next_diff);
//                if (prev_diff < next_diff) {
//                    l_free_fudged = l_free_table[i-1];
//                } else {
//                    l_free_fudged = l_free_table[i];
//                }
//                break;
//            }
//        }
////        console.log('In ViewCADModel.render l_free_fudged=',l_free_fudged);

          // Original URL to SAE Extension Spring
//        var prefix = "https://sae-embedded.qa.partcommunity.com/3d-cad-models/?info=sae%2Fmodeling%2Fsprings%2Fas24586a.prj";
//        var varset = "varset={MAT=" + (material_type.value === 2 ? 'MW' : 'CRES') + '},{OD=' + (od_free.value) + '},{DD=' + (wire_dia.value) + '},{L=' + (l_free_fudged) + '}';

//        https://psdev-embedded.qa.partcommunity.com/3d-cad-models/?info=usa_demo%2Fs%2Fspring_analysis_software%2Fspring_220mm_ss.prj
//          &varset=%7bOD=12%7d,%7bWD=3%7d,%7bNOC=24%7d&hidePortlets=navigation
//          varset={OD=12},{WD=3},{NOC=24}&hidePortlets=navigation
        var prefix = "https://psdev-embedded.qa.partcommunity.com/3d-cad-models/?info=usa_demo%2Fs%2Fspring_analysis_software%2Fspring_220mm_ss.prj";
//        console.log('In ViewCADModel.render prefix=',prefix);

        var varset = 'varset={OD=' + (od_free.value.toFixed(2)) + '},{WD=' + (wire_dia.value.toFixed(3)) + '},{NOC=' + (coils_t.value.toFixed(0)) + '}';
//        console.log('In ViewCADModel.render varset=',varset);

        var src = prefix + '&' + encodeURI(varset) + '&hidePortlets=navigation';
//        console.log('In ViewCADModel.render src=',src);

        return (
            <>
                <NavDropdown.Item onClick={this.toggle}>
                    CAD Model (Pre-alpha)
                </NavDropdown.Item>
                <Modal show={this.state.modal} onHide={this.toggle} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : CAD Model (Pre-alpha)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <iframe title="CADModel" id="pcomiframe" src={src} width="100%" height="750px" sandbox="allow-forms allow-scripts allow-same-origin allow-popups" referrerPolicy="origin-when-cross-origin"></iframe>
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
});

export default connect(mapStateToProps)(ViewCADModel);
