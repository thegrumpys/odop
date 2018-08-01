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
            feasibility_class = "text-left text-danger font-weight-bold";
        } else {
            if (this.props.violated_constraint_count > 0) {
                feasibility_string = "MARGINALLY FEASIBLE";
                feasibility_class = "text-left text-low-danger";
            } else {
                feasibility_string = "FEASIBLE";
                feasibility_class = "text-left";
            }
        }
        return (
            <React.Fragment>
                <Row>
                    <Col className="col-md-12">
                        <span className="font-weight-bold">Result</span>
                    </Col>
                </Row>
                <Row>
                    <Table className="col-md-2">
                        <tr>
                            <td className="text-left">OBJMIN:</td>
                            <td className="text-left">{OBJMIN.toFixed(6)}</td>
                        </tr>
                        <tr>
                            <td className={feasibility_class}>Objective Value:</td>
                            <td className={feasibility_class}>{this.props.objective_value.toFixed(6)}</td>
                        </tr>
                    </Table>
                    <Table className="col-md-4">
                        <tr>
                            <td className="text-left">Termination Condition:</td>
                            <td className="text-left">{this.props.termination_condition}</td>
                        </tr>
                        <tr>
                            <td className={feasibility_class}>Feasibility:</td>
                            <td className={feasibility_class}>{feasibility_string}</td>
                        </tr>
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
