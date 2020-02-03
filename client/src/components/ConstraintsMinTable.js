import React, { Component } from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
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
                            <th className="text-center bg-secondary text-white" colSpan="4" id="IVMinConstraintTitle">IV Min Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left d-lg-none" id="MinConstraintNameTitle">Name</th>
                            <th className="text-left" id="MinConstraintConstrainTitle">Constrain</th>
                            <th className="text-center" id="MinConstraintValueTitle">Value</th>
                            <th className={"text-right " + (this.props.system_controls.show_violations ? "" : "d-none")} id="MinConstraintViolationTitle">Violation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.input && element.equationset && !element.hidden && <ConstraintsMinRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="4" id="DVMinConstraintTitle">DV Min Constraint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => !element.input && element.equationset && !element.hidden && <ConstraintsMinRowDependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVMinConstraintTitle">Lower limits on Independent Variables</UncontrolledTooltip>
                <UncontrolledTooltip class="d-lg-none" placement="top" target="MinConstraintNameTitle">Variable names</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="MinConstraintConstrainTitle">Check box to establish lower limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="MinConstraintValueTitle">Enter value for lower limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="MinConstraintViolationTitle">Measure of constraint <br />satisfaction (-) or violation (+)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVMinConstraintTitle">Lower limits on Dependent Variables</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    system_controls: state.system_controls
});

export default connect(mapStateToProps)(ConstraintsMinTable);
