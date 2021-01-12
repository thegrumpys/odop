import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';
import FeasibilityIndicator from './FeasibilityIndicator';

class ResultTable extends Component {
    
    render() {
//        console.log('In ResultTable.render this=',this);
//        From Issue #365:
//        The proposed terminology and color scheme:
//            OBJ value       Category Term           Color            RGB
//            zero            STRICTLY FEASIBLE       Black            #343a40
//            < OBJMIN        FEASIBLE                Green (or cyan)  #28a745
//            < 4x OBJMIN     CLOSE TO FEASIBLE    Orange           #fd7e14
//            > 4x OBJMIN     NOT FEASIBLE            Red              #dc3545
        var feasibility_string;
        var feasibility_class;
        if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            feasibility_string = "NOT FEASIBLE";
            feasibility_class = "text-not-feasible";
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            feasibility_string = "CLOSE TO FEASIBLE";
            feasibility_class = "text-close-to-feasible";
        } else if (this.props.objective_value > 0.0) {
            feasibility_string = "FEASIBLE";
            feasibility_class = "text-feasible";
        } else {
            feasibility_string = "STRICTLY FEASIBLE";
            feasibility_class = "text-strictly-feasible";
        }
        return (
            <React.Fragment>
                <Table className="col-md-8" size="sm">
                    <tbody>
                        <tr>
                            <th width="33%" id="Feasibility">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>NOT FEASIBLE: constraints significantly violated; CLOSE TO FEASIBLE: constraints slightly violated; FEASIBLE: constraints not significantly violated; STRICTLY FEASIBLE: no constraints violated</Tooltip>}>
                                    <span>Feasibility</span>
                                </OverlayTrigger>
                            </th>
                            <td width="67%" className={feasibility_class + " text-left"}>{feasibility_string}</td>
                        </tr>
                        <tr>
                            <th width="33%" id="Message">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Status feedback message from solution process</Tooltip>}>
                                    <span>Message:</span>
                                </OverlayTrigger>
                            </th>
                            <td width="67%" className="text-left">{this.props.termination_condition}</td>
                       </tr>
                    </tbody>
                </Table>
                <Table className="col-md-4" size="sm">
                    <tbody>
                        <tr>
                            <td className="text-center" id="ObjectiveValue">
                                <OverlayTrigger> 
                                    <FeasibilityIndicator />
                                </OverlayTrigger>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
    termination_condition: state.model.result.termination_condition,
    violated_constraint_count: state.model.result.violated_constraint_count
});

export default connect(mapStateToProps)(ResultTable);
