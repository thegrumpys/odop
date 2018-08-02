import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { OBJMIN } from './globals';

class ResultSection extends React.Component {
    
    render() {
        var feasibility_string;
        var feasibility_class;
        if (this.props.objective_value > OBJMIN) {
            feasibility_string = "NOT FEASIBLE";
            feasibility_class = "text-right text-danger font-weight-bold";
        } else {
            if (this.props.violated_constraint_count > 0) {
                feasibility_string = "MARGINALLY FEASIBLE";
                feasibility_class = "text-right text-low-danger";
            } else {
                feasibility_string = "FEASIBLE";
                feasibility_class = "text-right";
            }
        }
        return (
            <React.Fragment>
                <Row>
                    <Col className="col-md-3">
                        <th className="text-left" colSpan="3">Result</th>
                    </Col>
                </Row>
                <Row>
                    <Table className="col-md-2">
                        <tbody>
                            <tr>
                                <th>OBJMIN:</th>
                                <td className="text-right">{OBJMIN.toFixed(6)}</td>
                            </tr>
                            <tr>
                                <th>Objective Value:</th>
                                <td className={feasibility_class}>{this.props.objective_value.toFixed(6)}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Table className="col-md-4">
                        <tbody>
                            <tr>
                                <th>Termination Condition:</th>
                                <td className="text-right" colSpan="2">{this.props.termination_condition}</td>
                            </tr>
                            <tr>
                                <th>Feasibility:</th>
                                <td className={feasibility_class} colSpan="2">{feasibility_string}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    objective_value: state.result.objective_value,
    termination_condition: state.result.termination_condition,
    violated_constraint_count: state.result.violated_constraint_count
});

export default connect(mapStateToProps)(ResultSection);
