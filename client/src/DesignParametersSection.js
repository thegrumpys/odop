import React from 'react';
import { Row, Col } from 'reactstrap';
import DesignParameterRow from './DesignParameterRow';
import { connect } from 'react-redux';

class DesignParametersSection extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Row key="Independent Variables">
                    <Col className="font-weight-bold" xs="12">Independent Variables</Col>
                </Row>
                {this.props.design_parameters.map((design_parameter) => <DesignParameterRow key={design_parameter.name} design_parameter={design_parameter} objective_value={this.props.objective_value} />)}
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    design_parameters: state.design_parameters,
    objective_value: state.result.objective_value
});

export default connect(mapStateToProps)(DesignParametersSection);
