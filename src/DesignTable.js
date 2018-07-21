import React from 'react';
import { Row, Col } from 'reactstrap';
import DesignParametersSection from './DesignParametersSection';
import StateVariablesSection from './StateVariablesSection';
import { connect } from 'react-redux';

class DesignTable extends React.Component {
    
    render() {
        return (
                <React.Fragment>
                <Row>
                    <Col className="font-weight-bold" xs="2">Name</Col>
                    <Col className="font-weight-bold text-center" xs="2">Value</Col>
                    <Col className="font-weight-bold" xs="1">Units</Col>
                    <Col className="font-weight-bold text-center" xs="3">Min</Col>
                    <Col className="font-weight-bold text-center" xs="3">Max</Col>
                </Row>
                <Row>
                    <Col className="font-weight-bold" xs="2"></Col>
                    <Col className="font-weight-bold text-left" xs="1">&nbsp;</Col>
                    <Col className="font-weight-bold text-right" xs="1">Fix</Col>
                    <Col className="font-weight-bold" xs="1"></Col>
                    <Col className="font-weight-bold text-left" xs="1">Constrain</Col>
                    <Col className="font-weight-bold text-right" xs="1">Value</Col>
                    <Col className="font-weight-bold text-center" xs="1">Violation</Col>
                    <Col className="font-weight-bold text-left" xs="1">Constrain</Col>
                    <Col className="font-weight-bold text-right" xs="1">Value</Col>
                    <Col className="font-weight-bold text-center" xs="1">Violation</Col>
                </Row>
                <DesignParametersSection />
                <StateVariablesSection />
                <Row>
                    <Col xs="8"></Col>
                    <Col className="font-weight-bold" xs="2">Objective Value</Col>
                    <Col className="text-right" xs="1">{this.props.objective_value.toFixed(4)}</Col>
                </Row>
                </React.Fragment>
        );
    }
    
}


const mapStateToProps = state => ({
    objective_value: state.objective_value
});

export default connect(mapStateToProps)(DesignTable);
