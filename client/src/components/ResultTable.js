import React from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';

class ResultTable extends React.Component {
    
    render() {
        var feasibility_string;
        var feasibility_class;
        if (this.props.objective_value > this.props.system_controls.objmin) {
            feasibility_string = "NOT FEASIBLE";
            feasibility_class = "col-md-3 text-right text-danger font-weight-bold";
        } else {
            if (this.props.violated_constraint_count > 0) {
                feasibility_string = "MARGINALLY FEASIBLE";
                feasibility_class = "col-md-3 text-right text-low-danger";
            } else {
                feasibility_string = "FEASIBLE";
                feasibility_class = "col-md-3 text-right";
            }
        }
        return (
            <React.Fragment>
                <Table className="col-md-6" size="sm">
                    <tbody>
                        <tr>
                            <th className="col-md-1">Feasibility:</th>
                            <td className={feasibility_class} colSpan="2">{feasibility_string}</td>
                            <td className="col-md-2"></td>
                        </tr>
                        <tr>
                            <th className="col-md-1">Termination Condition:</th>
                            <td className="col-md-3 text-right" colSpan="2">{this.props.termination_condition}</td>
                            <td className="col-md-2"></td>
                        </tr>
                    </tbody>
                </Table>
                <Table className="col-md-2" size="sm">
                    <tbody>
                        <tr>
                            <th>Objective Value:</th>
                            <td className={feasibility_class}>{this.props.objective_value.toFixed(6)}</td>
                        </tr>
                        <tr>
                            <th>OBJMIN:</th>
                            <td className="text-right">{this.props.system_controls.objmin.toFixed(6)}</td>
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    system_controls: state.system_controls,
    objective_value: state.result.objective_value,
    termination_condition: state.result.termination_condition,
    violated_constraint_count: state.result.violated_constraint_count
});

export default connect(mapStateToProps)(ResultTable);
