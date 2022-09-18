import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip, Modal, InputGroup, ButtonGroup, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED, MIN, MAX } from '../store/actionTypes';
import FeasibilityIndicator from './FeasibilityIndicator';
import { search, seek, saveAutoSave } from '../store/actionCreators';
import { logUsage } from '../logUsage';
import { displayMessage } from '../components/MessageModal';
import AlertsAccordion from "./AlertsAccordion"

class ResultTable extends Component {
    
    constructor(props) {
//        console.log('In ResultTable.constructor props=',props);
        super(props);
        this.onSearchRequest = this.onSearchRequest.bind(this);
        this.onSeekRequest = this.onSeekRequest.bind(this);
        this.onSeekContextHelpButton = this.onSeekContextHelpButton.bind(this);
        this.onSeekCancelButton = this.onSeekCancelButton.bind(this);
        this.onSeekMinMaxSelect = this.onSeekMinMaxSelect.bind(this);
        this.onSeekNameSelect = this.onSeekNameSelect.bind(this);
        this.onSeekButton = this.onSeekButton.bind(this);
        this.state = {
            seek_modal: false, // Default: do not display optimize modal
        };
    }

    onSearchRequest(event) {
//        console.log('In ResultTable.onSearchRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('No free independent variables', 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
        }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                displayMessage((element.name + ' constraints are inconsistent'), 'danger', 'Errors', '/docs/Help/errors.html#searchErr');
            }
        });
        var old_objective_value = this.props.objective_value.toPrecision(4);
        this.props.saveAutoSave();
        this.props.search();
        const { store } = this.context;
        var design = store.getState();
        var new_objective_value = design.model.result.objective_value.toPrecision(4)
        logUsage('event', 'ActionSearch', { event_label: 'Button ' + old_objective_value + ' --> ' + new_objective_value});
    }

    onSeekRequest(event) {
//        console.log('In ResultTable.onSeekRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('No free independent variables', 'danger', 'Errors', '/docs/Help/errors.html#seekErr');
        }
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                displayMessage((element.name + ' constraints are inconsistent'), 'danger', 'Errors', '/docs/Help/errors.html#seekErr');
            }
        });
        var result = this.props.symbol_table.find( // Find free variable matching the current variable name
            (element) => this.state.seek_name === element.name && element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
        );
        if (result === undefined) { // Was matching free variable not found
            // Set default name to the First free variable. There must be at least one
            // This duplicates the UI render code algorithm - be careful and make them match!
            result = this.props.symbol_table.find( // Find first free variable
                (element) => element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)
            );
        }
        this.setState({
            seek_modal: !this.state.seek_modal,
            seek_name: result.name,
            seek_minmax: MIN,
        });
    }

    onSeekContextHelpButton(event) {
//        console.log('In ResultTable.onSeekContextHelpButton this=',this,'event=',event);
        this.setState({
            seek_modal: !this.state.seek_modal,
        });
        window.open('/docs/Help/seek.html', '_blank');
    }

    onSeekCancelButton(event) {
//        console.log('In ResultTable.onSeekCancelButton this=',this,'event=',event);
        this.setState({
            seek_modal: !this.state.seek_modal,
        });
    }

    onSeekMinMaxSelect(seek_minmax) {
//        console.log('In ResultTable.onSeekMinMaxSelect this=',this,'seek_minmax=',seek_minmax);
        this.setState({
            seek_minmax: seek_minmax
        });
    }

    onSeekNameSelect(event) {
//        console.log('In ResultTable.onSeekNameSelect this=',this,'event=',event);
        this.setState({
            seek_name: event.target.value 
        });
    }
    
    onSeekButton(event) {
//        console.log('In ResultTable.onSeekButton this=',this,'event=',event);
        this.setState({
            seek_modal: !this.state.seek_modal
        });
        // Do seek
        this.props.saveAutoSave();
        this.props.seek(this.state.seek_name, this.state.seek_minmax);
        logUsage('event', 'ActionSeek', { event_label: 'Button ' + this.state.seek_minmax + ' ' + this.state.seek_name });
    }

    render() {
//        console.log('In ResultTable.render this=',this);

//      From Issue #365:
//      The proposed terminology and color scheme:
//          OBJ value       Category Term           Color            RGB
//          zero            STRICTLY FEASIBLE       Black            #343a40
//          < OBJMIN        FEASIBLE                Green (or cyan)  #28a745
//          < 4x OBJMIN     CLOSE TO FEASIBLE       Orange           #fd7e14
//          > 4x OBJMIN     NOT FEASIBLE            Red              #dc3545
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

        var ResultTableOptimize = require('../designtypes/'+this.props.type+'/ResultTableOptimize.jsx'); // Dynamically load ResultTableOptimize

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
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Search works to minimize Objective Value.<br />Objective Value = {this.props.objective_value.toFixed(7)}<br />Search stops if Objective Value falls below<br />OBJMIN = {this.props.system_controls.objmin.toFixed(7)}</Tooltip>}>
                                    <b>Status</b>
                                </OverlayTrigger>
                                <FeasibilityIndicator />
                            </td>
                        </tr>
                        <tr>
                            {display_search_button ? 
                              <td align="center">
                                  <Button variant="primary" size="sm" onClick={this.onSearchRequest} disabled={!display_search_button}><b>Search</b> (solve)</Button>&nbsp;
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                      SEARCH alters the values of any free independent variables to find a design that 
                                      satisfies all constraints while also achieving the desired value for each fixed dependent 
                                      variable.  Search stops when the first feasible solution is found.  The solution provided 
                                      by SEARCH is a solution to the designer’s goals as expressed by constraints and fixes. If 
                                      a solution that meets all of these goals is not available, the search process converges 
                                      to a compromise. Typically, this compromise violates multiple constraints.
                                      </Tooltip>}>
                                      <span><i className="fas fa-info-circle text-primary"></i></span>
                                  </OverlayTrigger>
                              </td>
                            :
                              <td align="center">
                                  <Button variant="primary" size="sm" onClick={this.onSeekRequest} disabled={display_search_button}><b>Seek</b> (optimize)</Button>&nbsp;
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                      If one feasible design exists there are likely many more available, each with varying 
                                      advantages / disadvantages. SEEK provides a “goal seeking” capability 
                                      to optimize your design on the parameter that you specify. If starting with a default 
                                      design, additional constraints specific to your application are required to obtain 
                                      meaningful results.
                                      </Tooltip>}>
                                      <span><i className="fas fa-info-circle text-primary"></i></span>
                                  </OverlayTrigger>
                              </td>
                            }
                        </tr>
                    </tbody>
                </Table>
                <AlertsAccordion />
                <Modal show={this.state.seek_modal} onHide={this.onSeekCancelButton}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Seek (optimize)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        <p>This may be a long running operation. Please be patient.</p>
                        <ResultTableOptimize.default onClick={this.onSeekCancelButton}/>
                        <p>Select a specific Seek optimization:</p>
                        <InputGroup>
                            <ButtonGroup>
                                <Button variant="outline-secondary" onClick={() => this.onSeekMinMaxSelect(MIN)} active={this.state.seek_minmax === MIN}> Min </Button>
                                <Button variant="outline-secondary" onClick={() => this.onSeekMinMaxSelect(MAX)} active={this.state.seek_minmax === MAX}> Max </Button>
                            </ButtonGroup>
                            &nbsp;
                            <InputGroup.Prepend>
                                <InputGroup.Text>Name: </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control as="select" className="align-middle" onChange={this.onSeekNameSelect} value={this.state.seek_name}>
                                {this.props.symbol_table.map((element, index) =>
                                    (element.type === "equationset" && !element.hidden && !(element.lmin & FIXED)) ? <option key={index} value={element.name}>{element.name}</option> : ''
                                )}
                            </Form.Control>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.onSeekContextHelpButton}>Help</Button>{' '}
                        <Button variant="secondary" onClick={this.onSeekCancelButton}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onSeekButton}>Seek</Button>
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
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
    termination_condition: state.model.result.termination_condition,
});

const mapDispatchToProps = {
    search: search,
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
