import React, { Component } from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import ConstraintsMaxRowIndependentVariable from './ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxRowDependentVariable from './ConstraintsMaxRowDependentVariable';
import { connect } from 'react-redux';

export class ConstraintsMaxTable extends Component {
    
    constructor(props) {
        super(props);
//        console.log('In ConstraintsMaxTable.constructor props=',props);
    }

    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="4" id="IVMaxConstraintTitle">IV Max Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left d-lg-none" id="MaxConstraintNameTitle">Name</th>
                            <th className="text-left" id="MaxConstraintConstrainTitle">Constrain</th>
                            <th className="text-center" id="MaxConstraintValueTitle">Value</th>
                            <th className={"text-right " + (this.props.system_controls.view_violations ? "d-block" : "d-none")} id="MaxConstraintViolationTitle">Violation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => element.input && element.equationset && !element.hidden && <ConstraintsMaxRowIndependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="4" id="DVMaxConstraintTitle">DV Max Constraint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element,index) => !element.input && element.equationset && !element.hidden && <ConstraintsMaxRowDependentVariable key={element.name} element={element} index={index} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVMaxConstraintTitle">Upper limits on Independent Variables</UncontrolledTooltip>
                <UncontrolledTooltip class="d-lg-none" placement="top" target="MaxConstraintNameTitle">Variable names</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="MaxConstraintConstrainTitle">Check box to establish upper limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="MaxConstraintValueTitle">Enter value for upper limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="MaxConstraintViolationTitle">Measure of constraint <br />satisfaction (-) or violation (+)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVMaxConstraintTitle">Upper limits on Dependent Variables</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    system_controls: state.system_controls
});

export default connect(mapStateToProps)(ConstraintsMaxTable);
