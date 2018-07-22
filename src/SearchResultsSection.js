import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { OBJMIN } from './globals';

class SearchResultsSection extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Row key="Search Results">
                    <Col className="font-weight-bold" xs="12">Search Results</Col>
                </Row>
                <Row>
                    <Col className="font-italic" xs="1">Objective Value</Col>
                    <Col className="text-right" xs="1">{this.props.objective_value.toFixed(5)}</Col>
                    <Col className="font-italic" xs="1">OBJMIN</Col>
                    <Col xs="1">{OBJMIN.toFixed(5)}</Col>
                    <Col className="font-italic" xs="1">Termination Condition</Col>
                    <Col xs="1">{this.props.termination_condition}</Col>
                    <Col className="font-italic" xs="1">Iteration Number</Col>
                    <Col xs="1">{this.props.iteration_number}</Col>
                    <Col className="font-italic" xs="1">Feasibility</Col>
                    <Col xs="1">{this.props.feasibility}</Col>
                    <Col xs="1"></Col>
                </Row>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    objective_value: state.search_results.objective_value,
    termination_condition: state.search_results.termination_condition,
    iteration_number: state.search_results.iteration_number,
    feasibility: state.search_results.feasibility
});

export default connect(mapStateToProps)(SearchResultsSection);
