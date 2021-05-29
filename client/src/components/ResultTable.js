import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED } from '../store/actionTypes';
import FeasibilityIndicator from './FeasibilityIndicator';
import { search, saveAutoSave } from '../store/actionCreators';
import { logUsage } from '../logUsage';
import { displayMessage } from '../components/MessageModal';

class ResultTable extends Component {
    
    constructor(props) {
        super(props);
        this.onSearchButton = this.onSearchButton.bind(this);
    }

    onSearchButton(event) {
       var warnMsg = '';
       if (this.props.objective_value <= this.props.system_controls.objmin) {
          warnMsg += 'Objective Value less than OBJMIN. There is nothing for Search to do. Consider using Seek; ';
       }
       if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
           warnMsg += 'No free independent variables; ';
       }
       if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && Number.isNaN(element.value) ? total+1 : total+0}, 0) !== 0) {
           warnMsg += 'One (or more) Independent Variable(s) is (are) Not a Number; ';
       }
       if (Number.isNaN(this.props.objective_value)) {
          warnMsg += 'Objective Value is Not a Number. Check constraint values; ';
       }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table entry
            if (element.type !== undefined && element.type !== "table" && element.cmin > element.cmax) {
                warnMsg += (element.name + ' constraints are inconsistent; ');
            }
        });
       if (warnMsg !== '') {
            displayMessage(warnMsg,'warning');
        } else {
            logUsage('event', 'ActionSearch', { 'event_label': 'ActionSearch'});
            this.props.saveAutoSave();
            this.props.search();
        }
    }

    render() {
//        console.log('In ResultTable.render this=',this);
//        From Issue #365:
//        The proposed terminology and color scheme:
//            OBJ value       Category Term           Color            RGB
//            zero            STRICTLY FEASIBLE       Black            #343a40
//            < OBJMIN        FEASIBLE                Green (or cyan)  #28a745
//            < 4x OBJMIN     CLOSE TO FEASIBLE       Orange           #fd7e14
//            > 4x OBJMIN     NOT FEASIBLE            Red              #dc3545
        var feasibility_string;
        var feasibility_class;
        var display_search_button;
        if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            feasibility_string = "NOT FEASIBLE";
            feasibility_class = "text-not-feasible";
            display_search_button = true;
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            feasibility_string = "CLOSE TO FEASIBLE";
            feasibility_class = "text-close-to-feasible";
            display_search_button = true;
        } else if (this.props.objective_value > 0.0) {
            feasibility_string = "FEASIBLE";
            feasibility_class = "text-feasible";
            display_search_button = false;
        } else {
            feasibility_string = "STRICTLY FEASIBLE";
            feasibility_class = "text-strictly-feasible";
            display_search_button = false;
        }
        return (
            <React.Fragment>
                <Table className="col-md-8" size="sm">
                    <tbody>
                        <tr>
                            <th width="33%" id="Feasibility">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>NOT FEASIBLE: constraints significantly violated; <br />CLOSE TO FEASIBLE: constraints slightly violated; FEASIBLE: constraints not significantly violated; STRICTLY FEASIBLE: no constraints violated</Tooltip>}>
                                    <span>Feasibility</span>
                                </OverlayTrigger>
                            </th>
                            <td width="67%" className={feasibility_class + " text-left"}>{feasibility_string}</td>
                        </tr>
                        <tr>
                            <th width="33%" id="Message" className="pb-3">
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
                        <tr>
                            <td align="center">{display_search_button ? <Button variant="primary" size="sm" onClick={this.onSearchButton} disabled={!display_search_button}>Search</Button> : ''}</td>
                        </tr>
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
    termination_condition: state.model.result.termination_condition,
    violated_constraint_count: state.model.result.violated_constraint_count
});

const mapDispatchToProps = {
    search: search,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
