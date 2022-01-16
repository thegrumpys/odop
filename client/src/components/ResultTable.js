import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip, Button, Modal, InputGroup, Form, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED, MIN, MAX } from '../store/actionTypes';
import FeasibilityIndicator from './FeasibilityIndicator';
import { seek, search, saveAutoSave } from '../store/actionCreators';
import { logUsage } from '../logUsage';
import { displayMessage } from '../components/MessageModal';
import { displaySpinner } from './Spinner';

class ResultTable extends Component {
    
    constructor(props) {
//        console.log('In ResultTable.ctor'');
        super(props);
        this.onSearchButton = this.onSearchButton.bind(this);
        this.onOptimizeButton = this.onOptimizeButton.bind(this);
        this.onOptimizeSeekMINWeight = this.onOptimizeSeekMINWeight.bind(this);
        this.onOptimizeSeekMAXCycle_Life = this.onOptimizeSeekMAXCycle_Life.bind(this);
        this.onOptimizeSeekMINRate = this.onOptimizeSeekMINRate.bind(this);
        this.onOptimizeSeekMINL_Solid = this.onOptimizeSeekMINL_Solid.bind(this);
        this.onOptimizeContextHelp = this.onOptimizeContextHelp.bind(this);
        this.onOptimizeCancel = this.onOptimizeCancel.bind(this);
        this.onMinMax = this.onMinMax.bind(this);
        this.onNameSelect = this.onNameSelect.bind(this);
        this.onSeek = this.onSeek.bind(this);
        this.state = {
            optimize_modal: false, // Default: do not display optimize modal
            name: undefined, // TODO: A fudge
            minmax: MIN // TODO: A fudge
        };
    }

    onSearchButton(event) {
//        console.log('In ResultTable.onSearchButton this=',this,'event=',event);
       logUsage('event', 'ResultTable', { 'event_label': 'search button' });
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
            if (element.type !== undefined && element.type !== "table" && element.lmin === CONSTRAINED && element.lmax === CONSTRAINED && element.cmin > element.cmax) {
                warnMsg += (element.name + ' constraints are inconsistent; ');
            }
        });
        if (warnMsg !== '') {
            displayMessage(warnMsg,'warning');
        } else {
            var old_objective_value = this.props.objective_value.toPrecision(4);
            this.props.saveAutoSave();
            this.props.search();
            const { store } = this.context;
            var design = store.getState();
            var new_objective_value = design.model.result.objective_value.toPrecision(4)
            logUsage('event', 'ActionSearch', { 'event_label': 'ButtonSearch Before ' + old_objective_value + ' After ' + new_objective_value});
        }
    }

    onOptimizeButton(event) {
//        console.log('In ResultTable.onOptimizeButton this=',this,'event=',event);
        logUsage('event', 'ResultTable', { 'event_label': 'optmize button' });
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
    }

    onOptimizeSeekMINWeight(event) {
//        console.log('In ResultTable.onOptimizeSeekMINWeight this=',this,'event=',event);
        logUsage('event', 'ResultTable', { 'event_label': 'optmize Seek MIN Weight button' });
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('Weight', MIN);
        displaySpinner(false);
    }

    onOptimizeSeekMAXCycle_Life(event) {
//        console.log('In ResultTable.onOptimizeSeekMAXCycle_Life this=',this,'event=',event);
        logUsage('event', 'ResultTable', { 'event_label': 'optmize Seek MAX Cycle_Life button' });
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('Cycle_Life', MAX);
        displaySpinner(false);
    }

    onOptimizeSeekMINRate(event) {
//        console.log('In ResultTable.onOptimizeSeekMINRate this=',this,'event=',event);
        logUsage('event', 'ResultTable', { 'event_label': 'optmize Seek MIN Rate button' });
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('Rate', MIN);
        displaySpinner(false);
    }

    onOptimizeSeekMINL_Solid(event) {
//        console.log('In ResultTable.onOptimizeSeekMINL_Solid this=',this,'event=',event);
        logUsage('event', 'ResultTable', { 'event_label': 'optmize Seek MIN L_Solid button' });
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek('L_Solid', MIN);
        displaySpinner(false);
    }

    onOptimizeContextHelp(event) {
//        console.log('In ResultTable.onOptimizeContextHelp this=',this,'event=',event);
        logUsage('event', 'ResultTable', { 'event_label': 'optmize context Help button' });
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
        window.open('https://thegrumpys.github.io/odop/Help/optimize', '_blank');
    }

    onOptimizeCancel(event) {
//        console.log('In ResultTable.onOptimizeCancel this=',this,'event=',event);
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
    }

    onMinMax(minmax) {
//        console.log('In ResultTable.onMinMax this=',this,'minmax=',minmax);
        this.setState({
            minmax: minmax
        });
    }

    onNameSelect(event) {
//        console.log('In ResultTable.onNameSelect this=',this,'event=',event);
        this.setState({
            name: event.target.value 
        });
    }
    
    onSeek(event) {
//        console.log('In ResultTable.onSeek this=',this,'event=',event);
        this.setState({
            optimize_modal: !this.state.optimize_modal
        });
        // Do seek
        logUsage('event', 'ResultTable', { 'event_label': 'seek ' + this.state.minmax + ' ' + this.state.name });
        displaySpinner(true);
        this.props.saveAutoSave();
        this.props.seek(this.state.name, this.state.minmax);
        displaySpinner(false);
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
            feasibility_class = "text-not-feasible ";
            display_search_button = true;
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            feasibility_string = "CLOSE TO FEASIBLE";
            feasibility_class = "text-close-to-feasible ";
            display_search_button = true;
        } else if (this.props.objective_value > 0.0) {
            feasibility_string = "FEASIBLE";
            feasibility_class = "text-feasible ";
            display_search_button = false;
        } else {
            feasibility_string = "STRICTLY FEASIBLE";
            feasibility_class = "text-strictly-feasible ";
            display_search_button = false;
        }
        return (
            <>
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
                            {display_search_button ? 
                              <td align="center">
                                  <Button variant="primary" size="sm" onClick={this.onSearchButton} disabled={!display_search_button}>Search</Button>&nbsp;
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                      SEARCH will alter the values of any free independent variables to find a design that 
                                      satisfies all constraints while also achieving the desired value for each fixed dependent 
                                      variable.  Search stops when the first feasible solution is found.  The solution provided 
                                      by Search is a solution to the designer’s goals as expressed by constraints and Fixes. If 
                                      a solution that meets all of these goals is not available, the search process converges 
                                      to a compromise. Typically, this compromise violates multiple constraints.
                                      </Tooltip>}>
                                      <span><i class="fas fa-info-circle text-primary"></i></span>
                                  </OverlayTrigger>
                              </td>
                            :
                              <td align="center">
                                  <Button variant="primary" size="sm" onClick={this.onOptimizeButton} disabled={display_search_button}>Optimize</Button>&nbsp;
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                      If one feasible design exists there are likely many more available, each with varying 
                                      advantages / disadvantages. The ODOP Seek feature provides a “goal seeking” capability 
                                      to optimize your design on the parameter that you specify. If starting with a default 
                                      design, additional constraints specific to your application are required to obtain 
                                      meaningful results. Click Help (below) for details.
                                      </Tooltip>}>
                                      <span><i class="fas fa-info-circle text-primary"></i></span>
                                  </OverlayTrigger>
                              </td>
                            }
                        </tr>
                    </tbody>
                </Table>
                <Modal show={this.state.optimize_modal} onHide={this.onOptimizeCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            Optimize
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        <Table borderless="true" size="sm" className="mb-0">
                            <tbody>
                                <tr>
                                    <td width="50%">
                                        <Button variant="primary" onClick={this.onOptimizeSeekMINWeight}>Seek MIN Weight</Button>
                                    </td>
                                    <td width="50%">
                                        <Button variant="primary" onClick={this.onOptimizeSeekMAXCycle_Life}>Seek MAX Cycle_Life</Button>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="50%">
                                        <Button variant="primary" onClick={this.onOptimizeSeekMINRate}>Seek MIN Rate</Button>
                                    </td>
                                    <td width="50%">
                                        <Button variant="primary" onClick={this.onOptimizeSeekMINL_Solid}>Seek MIN L_Solid</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Header>
                        <Modal.Title>
                            Seek
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <ButtonGroup>
                                <Button variant="secondary" onClick={() => this.onMinMax(MIN)} active={this.state.minmax === MIN}>Min</Button>
                                <Button variant="secondary" onClick={() => this.onMinMax(MAX)} active={this.state.minmax === MAX}>Max</Button>
                            </ButtonGroup>
                            &nbsp;
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name: </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" className="align-middle" onChange={this.onNameSelect} value={this.state.name}>
                                {this.props.symbol_table.map((element, index) =>
                                    (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
                                )}
                            </Form.Control>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button outline="true" variant="info" onClick={this.onOptimizeContextHelp}>Help</Button>
                        <Button variant="secondary" onClick={this.onOptimizeCancel}>Cancel</Button>
                        <Button variant="primary" onClick={this.onSeek}>Seek</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
    
}

ResultTable.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
    termination_condition: state.model.result.termination_condition,
    violated_constraint_count: state.model.result.violated_constraint_count
});

const mapDispatchToProps = {
    search: search,
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
