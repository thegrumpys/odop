import React from 'react';
import { Table, UncontrolledTooltip } from 'reactstrap';
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
                            <th className="col-md-1" id="Feasibility">Feasibility:</th>
                            <td className={feasibility_class} colSpan="2">{feasibility_string}</td>
                            <td className="col-md-2"></td>
                        </tr>
                        <tr>
                            <th className="col-md-1" id="TerminationCondition">Termination Condition:</th>
                            <td className="col-md-3 text-right" colSpan="2">{this.props.termination_condition}</td>
                            <td className="col-md-2"></td>
                        </tr>
                    </tbody>
                </Table>
                <Table className="col-md-2" size="sm">
                    <tbody>
                        <tr>
                            <th id="ObjectiveValue">Objective Value:</th>
                            <td className={feasibility_class}>{this.props.objective_value.toFixed(6)}</td>
                        </tr>
                        <tr>
                            <th id="OBJMIN">OBJMIN:</th>
                            <td className="text-right">{this.props.system_controls.objmin.toFixed(6)}</td>
                        </tr>
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="Feasibility">Feasibility Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="TerminationCondition">Termination Condition Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="ObjectiveValue">Objective Value Title ToolTip</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="OBJMIN">OBJMIN Title ToolTip</UncontrolledTooltip>
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
