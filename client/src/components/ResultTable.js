import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { connect } from 'react-redux';

class ResultTable extends Component {
    
    render() {
//        console.log('In ResultTable.render this=', this);
        var feasibility_string;
        var feasibility_class;
        if (this.props.objective_value > this.props.system_controls.objmin) {
            feasibility_string = "NOT FEASIBLE";
            feasibility_class = "text-danger font-weight-bold";
        } else {
            if (this.props.violated_constraint_count > 0) {
                feasibility_string = "MARGINALLY FEASIBLE";
                feasibility_class = "text-low-danger";
            } else {
                feasibility_string = "FEASIBLE";
                feasibility_class = "";
            }
        }
        return (
            <React.Fragment>
                <Table className="col-md-8" size="sm">
                    <tbody>
                        <tr>
                            <th width="33%" id="Feasibility">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>NOT FEASIBLE: many constraints violated; MARGINALLY FEASIBLE: constraints slightly violated; FEASIBLE: no constraints violated</Tooltip>}>
                                    <span>Feasibility</span>
                                </OverlayTrigger>
                            </th>
                            <td width="67%" className={feasibility_class + " text-left"}>{feasibility_string}</td>
                        </tr>
                        <tr>
                            <th width="33%" id="TerminationCondition">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Status feedback message from solution process</Tooltip>}>
                                    <span>Termination Message:</span>
                                </OverlayTrigger>
                            </th>
                            <td width="67%" className="text-left">{this.props.termination_condition}</td>
                       </tr>
                    </tbody>
                </Table>
                <Table className="col-md-4" size="sm">
                    <tbody>
                        <tr>
                            <th width="50%" id="ObjectiveValue">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Search works to minimize this value. See Help for details</Tooltip>}>
                                    <span>Objective&nbsp;Value:</span>
                                </OverlayTrigger>
                            </th>
                            <td width="50%" className={feasibility_class + " text-right"}>{this.props.objective_value.toFixed(6)}</td>
                        </tr>
                        <tr>
                            <th width="50%" id="OBJMIN">
                                <OverlayTrigger placement="top" overlay={<Tooltip>Stop Search if Objective&nbsp;Value gets lower than this value = {this.props.system_controls.objmin.toFixed(6)}</Tooltip>}>
                                    <span>OBJMIN:</span>
                                </OverlayTrigger>
                            </th>
                            <td width="50%" className="text-right">{this.props.system_controls.objmin.toFixed(6)}</td>
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
