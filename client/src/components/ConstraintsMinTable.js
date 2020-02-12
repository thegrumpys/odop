import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ConstraintsMinRowIndependentVariable from './ConstraintsMinRowIndependentVariable';
import ConstraintsMinRowDependentVariable from './ConstraintsMinRowDependentVariable';
import { connect } from 'react-redux';

export class ConstraintsMinTable extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="4" id="IVMinConstraintTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Lower limits on Independent Variables</Tooltip>}>
                                    <span>IV Min Constraint</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                        <tr>
                            <th className="text-left d-lg-none" id="MinConstraintNameTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip className="d-lg-none">Variable names</Tooltip>}>
                                    <span>Name</span>
                                </OverlayTrigger>
                            </th>
                            <th className="text-left" id="MinConstraintConstrainTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish lower limit</Tooltip>}>
                                    <span>Constrain</span>
                                </OverlayTrigger>
                            </th>
                            <th className="text-center" id="MinConstraintValueTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for lower limit</Tooltip>}>
                                    <span>Value</span>
                                </OverlayTrigger>
                            </th>
                            <th className={"text-right " + (this.props.system_controls.show_violations ? "" : "d-none")} id="MinConstraintViolationTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Measure of constraint <br />satisfaction (-) or violation (+)</Tooltip>}>
                                    <span>Violation</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.input && element.equationset && !element.hidden && <ConstraintsMinRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="4" id="DVMinConstraintTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Lower limits on Dependent Variables</Tooltip>}>
                                    <span>DV Min Constraint</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => !element.input && element.equationset && !element.hidden && <ConstraintsMinRowDependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    system_controls: state.system_controls
});

export default connect(mapStateToProps)(ConstraintsMinTable);
