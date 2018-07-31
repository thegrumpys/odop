import React from 'react';
import { Row, Col } from 'reactstrap';
import StateVariableRow from './StateVariableRow';
import { connect } from 'react-redux';

class StateVariablesSection extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Row key="Dependent Variables">
                    <Col className="font-weight-bold" xs="12">Dependent Variables</Col>
                </Row>
                {this.props.state_variables.map((state_variable) => <StateVariableRow key={state_variable.name} state_variable={state_variable} objective_value={this.props.objective_value} />)}
            </React.Fragment>
        );
    }
    
}


const mapStateToProps = state => ({
    state_variables: state.state_variables,
    objective_value: state.result.objective_value
});

export default connect(mapStateToProps)(StateVariablesSection);
