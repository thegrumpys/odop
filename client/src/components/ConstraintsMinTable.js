import React from 'react';
import { Table } from 'reactstrap';
import ConstraintsMinRowDesignParameter from './ConstraintsMinRowDesignParameter';
import ConstraintsMinRowStateVariable from './ConstraintsMinRowStateVariable';
import { connect } from 'react-redux';

export class ConstraintsMinTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-3" bordered>
                    <tbody>
                        <tr>
                            <th colSpan="3">&nbsp;</th>
                        </tr>
                        <tr>
                            <th className="text-center" colSpan="3">Min Constraint</th>
                        </tr>
                        <tr>
                            <th className="text-left">Constrain</th>
                            <th className="text-center">Value</th>
                            <th className="text-right">Violation</th>
                        </tr>
                        {this.props.design_parameters.map((design_parameter) => <ConstraintsMinRowDesignParameter key={design_parameter.name} design_parameter={design_parameter} />)}
                        <tr>
                            <th className="text-left" colSpan="3">&nbsp;</th>
                        </tr>
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
