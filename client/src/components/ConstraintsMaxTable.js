import React from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import ConstraintsMaxRowIndependentVariable from './ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxRowDependentVariable from './ConstraintsMaxRowDependentVariable';
import { connect } from 'react-redux';

export class ConstraintsMaxTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="3" id="IVMaxConstraintTitle">IV Max Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left" id="MaxConstraintConstrainTitle">Constrain</th>
                            <th className="text-center" id="MaxConstraintValueTitle">Value</th>
                            <th className="text-right" id="MaxConstraintViolationTitle">Violation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element) => element.input && <ConstraintsMaxRowIndependentVariable key={element.name} element={element} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="3" id="DVMaxConstraintTitle">DV Max Constraint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.symbol_table.map((element) => !element.input && <ConstraintsMaxRowDependentVariable key={element.name} element={element} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVMaxConstraintTitle">Upper limits on Independent Variables</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MaxConstraintConstrainTitle">Check box to establish upper limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MaxConstraintValueTitle">Enter value for upper limit</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MaxConstraintViolationTitle">Measure of constraint <br />satisfaction (-) or violation (+)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVMaxConstraintTitle">Upper limits on Dependent Variables</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    objective_value: state.result.objective_value
});

export default connect(mapStateToProps)(ConstraintsMaxTable);
