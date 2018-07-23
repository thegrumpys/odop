import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { OBJMIN } from './globals';

class SearchResultsSection extends React.Component {
    
    render() {
        var feasibility_string;
        var feasibility_class;
        if (this.props.objective_value > OBJMIN) {
            feasibility_string = "NOT FEASIBLE";
            feasibility_class = "text-right text-danger font-weight-bold border-danger";
        } else {
            if (this.props.violated_constraint_count > 0) {
                feasibility_string = "MARGINALLY FEASIBLE";
                feasibility_class = "text-right text-low-danger border-low-danger";
            } else {
                feasibility_string = "FEASIBLE";
                feasibility_class = "text-right";
            }
        }
        return (
            <React.Fragment>
                <Row key="Search Results">
                    <Col className="font-weight-bold" xs="12">Search Results</Col>
                </Row>
                <Row>
                    <Col className="font-italic" xs="1">Objective Value</Col>
                    <Col xs="1" className={feasibility_class}>{this.props.objective_value.toFixed(5)}</Col>
                    <Col className="font-italic" xs="1">OBJMIN</Col>
                    <Col xs="1" className="text-right">{OBJMIN.toFixed(5)}</Col>
                    <Col className="font-italic" xs="1">Termination Condition</Col>
                    <Col xs="1">{this.props.termination_condition}</Col>
                    <Col className="font-italic" xs="1">Feasibility</Col>
                    <Col xs="1" className={feasibility_class}>{feasibility_string}</Col>
                    <Col xs="3"></Col>
                </Row>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    objective_value: state.search_results.objective_value,
    termination_condition: state.search_results.termination_condition,
    violated_constraint_count: state.search_results.violated_constraint_count
});

export default connect(mapStateToProps)(SearchResultsSection);
