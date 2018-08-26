import React from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import ConstraintsMinRowIndependentVariable from './ConstraintsMinRowIndependentVariable';
import ConstraintsMinRowDependentVariable from './ConstraintsMinRowDependentVariable';
import { connect } from 'react-redux';

export class ConstraintsMinTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="3" id="IVMinConstraintTitle">IV Min Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left" id="MinConstraintConstrainTitle">Constrain</th>
                            <th className="text-center" id="MinConstraintValueTitle">Value</th>
                            <th className="text-right" id="MinConstraintViolationTitle">Violation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element) => element.input && element.equationset && <ConstraintsMinRowIndependentVariable key={element.name} element={element} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="3" id="DVMinConstraintTitle">DV Min Constraint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element) => !element.input && element.equationset && <ConstraintsMinRowDependentVariable key={element.name} element={element} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVMinConstraintTitle">Lower limits on Independent Variables</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MinConstraintConstrainTitle">Check box to establish lower limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MinConstraintValueTitle">Enter value for lower limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MinConstraintViolationTitle">Measure of constraint <br />satisfaction (-) or violation (+)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVMinConstraintTitle">Lower limits on Dependent Variables</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table
});

export default connect(mapStateToProps)(ConstraintsMinTable);
