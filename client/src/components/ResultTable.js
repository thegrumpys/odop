import React from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
import { connect } from 'react-redux';

class ResultTable extends React.Component {
    
    render() {
        var feasibility_string;
        var feasibility_class;
        if (this.props.objective_value > this.props.system_controls.objmin) {
            feasibility_string = "NOT FEASIBLE";
            feasibility_class = "col-md-3 text-danger font-weight-bold";
        } else {
            if (this.props.violated_constraint_count > 0) {
                feasibility_string = "MARGINALLY FEASIBLE";
                feasibility_class = "col-md-3 text-low-danger";
            } else {
                feasibility_string = "FEASIBLE";
                feasibility_class = "col-md-3";
            }
        }
        return (
            <React.Fragment>
                <Table className="col-md-2" size="sm">
                    <tbody>
                        <tr>
                            <th className="col-md-2" id="Feasibility">Feasibility:</th>
                        </tr>
                        <tr>
                            <th className="col-md-2" id="TerminationCondition">Termination Message:</th>
                        </tr>
                    </tbody>
                </Table>
                <Table className="col-md-6" size="sm">
                    <tbody>
                        <tr>
                            <td className={feasibility_class}>{feasibility_string}</td>
                        </tr>
                        <tr>
                            <td> {this.props.termination_condition}</td>
                        </tr>
                    </tbody>
                </Table>
                <Table className="col-md-2" size="sm">
                    <tbody>
                        <tr>
                            <th id="ObjectiveValue">Objective&nbsp;Value:</th>
                            <td className={feasibility_class + " text-right"}>{this.props.objective_value.toFixed(6)}</td>
                        </tr>
                        <tr>
                            <th id="OBJMIN">OBJMIN:</th>
                            <td className="text-right">{this.props.system_controls.objmin.toFixed(6)}</td>
                        </tr>
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="Feasibility">Not Feasible:<br /> OBJ greater than OBJMIN<br /><br />Marginally Feasible:<br />constraint(s) slightly violated<br /><br />Feasible:<br />no constraints violated</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="TerminationCondition">Status feedback from solution process</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="ObjectiveValue">Search works to minimize Objective Function value <br /> See Help for details</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="OBJMIN">Stop Search if Objective&nbsp;Value gets lower than {this.props.system_controls.objmin.toFixed(6)}</UncontrolledTooltip>
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
