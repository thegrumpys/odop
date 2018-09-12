import React from 'react';
import { DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { report as pcyl_report } from '../../designtypes/Piston-Cylinder/report';
import { report as solid_report } from '../../designtypes/Solid/report';
import { report as spring_report } from '../../designtypes/Spring/report';

class ViewReport extends React.Component {
    constructor(props) {
//        console.log('In ViewReport.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false
        };
    }
    
    toggle() {
//        console.log('In ViewReport.toggle');
        this.setState({
            modal: !this.state.modal
        });
    }

    report() {
//        console.log('In ViewReport.report');

        // Loop to create p and x_in from symbol_table
        var element;
        var p = [];
        var x = [];
        for (let i = 0; i < this.props.symbol_table.length; i++) {
            element = this.props.symbol_table[i];
            if (element.input) {
                p.push(Object.assign({},element));
            } else {
                x.push(Object.assign({},element));
            }
        }

        var output;
        switch(this.props.type) {
        default:
        case 'Piston-Cylinder':
            output = pcyl_report(p, x);
            break;
        case 'Solid':
            output = solid_report(p, x);
            break;
        case 'Spring':
            output = spring_report(p, x);
            break;
        }
        return output;
    }
    
    render() {
//      console.log('In ViewReport.render');
      return (
          <React.Fragment>
              <DropdownItem onClick={this.toggle}>
                  Report
              </DropdownItem>
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
                  <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : Report </ModalHeader>
                  <ModalBody>
                      {this.report()}
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
    type: state.type,
    symbol_table: state.symbol_table,
});

export default connect(mapStateToProps)(ViewReport);