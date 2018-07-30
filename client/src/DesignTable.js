import React from 'react';
import { Row, Col } from 'reactstrap';
import DesignParametersSection from './DesignParametersSection';
import StateVariablesSection from './StateVariablesSection';
import ResultsSection from './ResultsSection';

export class DesignTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Row>
                    <Col className="font-weight-bold" xs="2">Name</Col>
                    <Col className="font-weight-bold text-center" xs="2">Value</Col>
                    <Col className="font-weight-bold" xs="1">Units</Col>
                    <Col className="font-weight-bold text-center" xs="3">Min Constraint</Col>
                    <Col className="font-weight-bold text-center" xs="3">Max Constraint</Col>
                </Row>
                <Row>
                    <Col className="font-weight-bold" xs="2"></Col>
                    <Col className="font-weight-bold text-left" xs="1">&nbsp;</Col>
                    <Col className="font-weight-bold text-right" xs="1">Fix</Col>
                    <Col className="font-weight-bold" xs="1"></Col>
                    <Col className="font-weight-bold text-left" xs="1">Constrain</Col>
                    <Col className="font-weight-bold text-center" xs="1">Value</Col>
                    <Col className="font-weight-bold text-right" xs="1">Violation</Col>
                    <Col className="font-weight-bold text-left" xs="1">Constrain</Col>
                    <Col className="font-weight-bold text-center" xs="1">Value</Col>
                    <Col className="font-weight-bold text-right" xs="1">Violation</Col>
                </Row>
                <DesignParametersSection />
                <StateVariablesSection />
                <ResultsSection />
            </React.Fragment>
        );
    }
    
}
