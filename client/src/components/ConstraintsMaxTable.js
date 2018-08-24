import React from 'react';
import { Table } from 'reactstrap';
import ConstraintsMaxRowDesignParameter from './ConstraintsMaxRowDesignParameter';
import ConstraintsMaxRowStateVariable from './ConstraintsMaxRowStateVariable';
import { connect } from 'react-redux';

export class ConstraintsMaxTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-dark text-white" colSpan="3">IV Max Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left">Constrain</th>
                            <th className="text-center">Value</th>
                            <th className="text-right">Violation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.design_parameters.map((design_parameter) => <ConstraintsMaxRowDesignParameter key={design_parameter.name} design_parameter={design_parameter} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-dark text-white" colSpan="3">DV Max Constraint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state_variables.map((state_variable) => <ConstraintsMaxRowStateVariable key={state_variable.name} state_variable={state_variable} />)}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    design_parameters: state.design_parameters,
    state_variables: state.state_variables,
    objective_value: state.result.objective_value
});

export default connect(mapStateToProps)(ConstraintsMaxTable);
