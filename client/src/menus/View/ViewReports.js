import React, { Component } from 'react';
import { NavDropdown, Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logUsage } from '../../logUsage';

class ViewReports extends Component {

    constructor(props) {
//        console.log('In ViewReports.constructor props=',props);
        super(props);
    }
    
    render() {
//        console.log('In ViewReports.render this.props=', this.props);
        return (
            <React.Fragment>
                <NavDropdown.Item onClick={() => this.props.parent.setKey("Design")}>
                    Design
                </NavDropdown.Item>
                {this.props.report_names.map((element,i) => {return (
                    <NavDropdown.Item key={element.name} onClick={() => this.props.parent.setKey("Report"+(i+1).toString())}>
                        Report: {element.name}
                    </NavDropdown.Item>
                )})}
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    type: state.model.type,
});

export default connect(mapStateToProps)(ViewReports);
