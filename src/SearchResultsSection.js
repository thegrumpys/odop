import React from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from 'react-redux';

class SearchResultsSection extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Row key="Search Results">
                    <Col className="font-weight-bold" xs="12">Search Results</Col>
                </Row>
                <Row>
                    <Col xs="2">Objective Value</Col>
                    <Col className="text-right" xs="2">{this.props.objective_value.toFixed(4)}</Col>
                    <Col xs="7"></Col>
                </Row>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    objective_value: state.search_results.objective_value
});

export default connect(mapStateToProps)(SearchResultsSection);
