import React from 'react';
import { DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { getReportNames as pcyl_getReportNames } from '../../designtypes/Piston-Cylinder/report';
import { getReportNames as solid_getReportNames } from '../../designtypes/Solid/report';
import { getReportNames as spring_getReportNames } from '../../designtypes/Spring/report';
import { report as pcyl_report } from '../../designtypes/Piston-Cylinder/report';
import { report as solid_report } from '../../designtypes/Solid/report';
import { report as spring_report } from '../../designtypes/Spring/report';

class ViewReport extends React.Component {
    constructor(props) {
//        console.log('In ViewReport.constructor');
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onClose = this.onClose.bind(this);
        var report_names;
        switch(this.props.type) {
        default:
        case 'Piston-Cylinder':
            report_names = pcyl_getReportNames();
            break;
        case 'Solid':
            report_names = solid_getReportNames();
            break;
        case 'Spring':
            report_names = spring_getReportNames();
            break;
        }
        var report_name;
        if (report_names.length > 0)
            report_name = report_names[0]; // Default to Report1
        this.state = {
            modal: false,
            report_names: report_names,
            report_name: report_name
        };
    }
    
    toggle(i) {
//        console.log('In ViewReport.toggle i=',i);
        this.setState({
            modal: !this.state.modal,
            report_name: this.state.report_names[i]
        });
    }

    onClose() {
//        console.log('In ViewReport.onClose');
        this.setState({
            modal: !this.state.modal
        });
    }
    
    report() {
//        console.log('In ViewReport.report');
        
        var element;

        // Loop to create prefs from system_controls
        var prefs = [];
        for(var key in this.props.system_controls) {
            prefs.push(this.props.system_controls[key]);
        }

        // Loop to create p and x from symbol_table
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

        // Generate design-type specific report
        var output;
        switch(this.props.type) {
        default:
        case 'Piston-Cylinder':
            output = pcyl_report(this.state.report_name, prefs, p, x);
            break;
        case 'Solid':
            output = solid_report(this.state.report_name, prefs, p, x);
            break;
        case 'Spring':
            output = spring_report(this.state.report_name, prefs, p, x);
            break;
        }
        return output;
    }
    
    render() {
//      console.log('In ViewReport.render');
      return (
          <React.Fragment>
              {this.state.report_names.map((element,i) => {return (
                      <DropdownItem key={element} onClick={(event) => {this.toggle(i)}}>
                          {element}
                      </DropdownItem>
                  );
              })}
              <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} size="lg">
                  <ModalHeader toggle={this.toggle}><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; View : {this.state.report_name} </ModalHeader>
                  <ModalBody>
                      {this.report()}
                  </ModalBody>
                  <ModalFooter>
                      <Button color="primary" onClick={this.onClose}>Close</Button>
                  </ModalFooter>
              </Modal>
          </React.Fragment>
      );
  }
}  

const mapStateToProps = state => ({
    type: state.type,
    symbol_table: state.symbol_table,
    system_controls: state.system_controls,
});

export default connect(mapStateToProps)(ViewReport);