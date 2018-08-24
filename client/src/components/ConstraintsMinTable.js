import React from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import ConstraintsMinRowDesignParameter from './ConstraintsMinRowDesignParameter';
import ConstraintsMinRowStateVariable from './ConstraintsMinRowStateVariable';
import { connect } from 'react-redux';

export class ConstraintsMinTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-dark text-white" colSpan="3" id="IVMinConstraintTitle">IV Min Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left" id="MinConstraintConstrainTitle">Constrain</th>
                            <th className="text-center" id="MinConstraintValueTitle">Value</th>
                            <th className="text-right" id="MinConstraintViolationTitle">Violation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.design_parameters.map((design_parameter) => <ConstraintsMinRowDesignParameter key={design_parameter.name} design_parameter={design_parameter} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-dark text-white" colSpan="3" id="DVMinConstraintTitle">DV Min Constraint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state_variables.map((state_variable) => <ConstraintsMinRowStateVariable key={state_variable.name} state_variable={state_variable} />)}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVMinConstraintTitle">IV Min Constraint Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MinConstraintConstrainTitle">Min Constraint Constrain Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MinConstraintValueTitle">Min Constraint Value Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="MinConstraintViolationTitle">Min Constraint Violation Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVMinConstraintTitle">DV Min Constraint Title ToolTip</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    design_parameters: state.design_parameters,
    state_variables: state.state_variables
});

export default connect(mapStateToProps)(ConstraintsMinTable);
