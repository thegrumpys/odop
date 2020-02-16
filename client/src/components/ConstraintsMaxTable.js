import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import ConstraintsMaxRowIndependentVariable from './ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxRowDependentVariable from './ConstraintsMaxRowDependentVariable';
import { connect } from 'react-redux';

export class ConstraintsMaxTable extends Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="4" id="IVMaxConstraintTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Upper limits on Independent Variables</Tooltip>}>
                                    <span>IV Max Constraint</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                        <tr>
                            <th className="text-left d-lg-none" id="MaxConstraintNameTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                                    <span>Name</span>
                                </OverlayTrigger>
                            </th>
                            <th className="text-left" id="MaxConstraintConstrainTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish upper limit</Tooltip>}>
                                    <span>Constrain</span>
                                </OverlayTrigger>
                            </th>
                            <th className="text-center" id="MaxConstraintValueTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for upper limit</Tooltip>}>
                                    <span>Value</span>
                                </OverlayTrigger>
                            </th>
                            <th className={"text-right " + (this.props.system_controls.show_violations ? "" : "d-none")} id="MaxConstraintViolationTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Measure of constraint <br />satisfaction (-) or violation (+)</Tooltip>}>
                                    <span>Violation</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.input && element.equationset && !element.hidden && <ConstraintsMaxRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="4" id="DVMaxConstraintTitle">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Upper limits on Dependent Variables</Tooltip>}>
                                    <span>DV Max Constraint</span>
                                </OverlayTrigger>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => !element.input && element.equationset && !element.hidden && <ConstraintsMaxRowDependentVariable key={element.name} element={element} index={index} />)}
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

export default connect(mapStateToProps)(ConstraintsMaxTable);
