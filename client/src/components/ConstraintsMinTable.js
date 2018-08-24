import React from 'react';
import { Table } from 'reactstrap';
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
                            <th className="text-center bg-dark text-white" colSpan="3">IV Min Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left">Constrain</th>
                            <th className="text-center">Value</th>
                            <th className="text-right">Violation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.design_parameters.map((design_parameter) => <ConstraintsMinRowDesignParameter key={design_parameter.name} design_parameter={design_parameter} />)}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-dark text-white" colSpan="3">DV Min Constraint</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state_variables.map((state_variable) => <ConstraintsMinRowStateVariable key={state_variable.name} state_variable={state_variable} />)}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    design_parameters: state.design_parameters,
    state_variables: state.state_variables
});

export default connect(mapStateToProps)(ConstraintsMinTable);
