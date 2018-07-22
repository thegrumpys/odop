import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { OBJMIN } from './globals';

class SearchResultsSection extends React.Component {
    
    render() {
        var feasibility_class;
        switch (this.props.feasibility) {
        default:
        case "FEASIBLE":
            feasibility_class = "";
            break;
        case "MARGINALLY FEASIBLE":
            feasibility_class = "text-low-danger border-low-danger";
            break;
        case "NOT FEASIBLE":
            feasibility_class = "text-danger font-weight-bold border-danger";
            break;
        }
        return (
            <React.Fragment>
                <Row key="Search Results">
                    <Col className="font-weight-bold" xs="12">Search Results</Col>
                </Row>
                <Row>
                    <Col className="font-italic" xs="1">Objective Value</Col>
                    <Col className="text-right" xs="1" className={feasibility_class}>{this.props.objective_value.toFixed(5)}</Col>
                    <Col className="font-italic" xs="1">OBJMIN</Col>
                    <Col xs="1" className="text-right">{OBJMIN.toFixed(5)}</Col>
                    <Col className="font-italic" xs="1">Termination Condition</Col>
                    <Col xs="1">{this.props.termination_condition}</Col>
                    <Col className="font-italic" xs="1">Iteration Number</Col>
                    <Col xs="1" className="text-right">{this.props.iteration_number}</Col>
                    <Col className="font-italic" xs="1">Feasibility</Col>
                    <Col xs="1" className={feasibility_class}>{this.props.feasibility}</Col>
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
