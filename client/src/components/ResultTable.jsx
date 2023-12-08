import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip, Modal, InputGroup, ButtonGroup, Button, Form, Alert } from 'react-bootstrap';
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
        this.onSearchContextHelp = this.onSearchContextHelp.bind(this);
        this.onSearchContinue = this.onSearchContinue.bind(this);
        this.onSearchCancel = this.onSearchCancel.bind(this);
        this.doSearch = this.doSearch.bind(this);
        this.onSeekRequest = this.onSeekRequest.bind(this);
        this.onSeekContextHelpButton = this.onSeekContextHelpButton.bind(this);
        this.onSeekCancelButton = this.onSeekCancelButton.bind(this);
        this.onSeekMinMaxSelect = this.onSeekMinMaxSelect.bind(this);
        this.onSeekNameSelect = this.onSeekNameSelect.bind(this);
        this.onSeekButton = this.onSeekButton.bind(this);
        this.state = {
            search_infinite_modal: false,
            seek_modal: false, // Default: do not display optimize modal
            seek_name: null,
            seek_minmax: MIN,
        };
    }

    onSearchRequest(event) {
//        console.log('In ResultTable.onSearchRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('Search cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
            return;
        }
        var inverted_constraint = false;
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                inverted_constraint = true;
                displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
                return;
            }
        });
        if (inverted_constraint) {
            return;
        }
        if (!Number.isFinite(this.props.objective_value)) {
            this.setState({
                search_infinite_modal: !this.state.search_infinite_modal
            });
            return;
        }
        this.doSearch('FINITE');
    }

    onSearchContextHelp() {
//        console.log('In ResultTable.onSearchContinue this=',this);
        window.open('/docs/Help/errors.html#objNotFinite', '_blank');
    }

    onSearchContinue() {
//        console.log('In ResultTable.onSearchContinue');
        this.setState({
            search_infinite_modal: !this.state.search_infinite_modal
        });
        this.doSearch('NOT FINITE');
    }
    
    onSearchCancel() {
//        console.log('In ResultTable.onSearchCancel');
        this.setState({
            search_infinite_modal: !this.state.search_infinite_modal
        });
        // Noop - all done
    }
    
    doSearch(type) {
//        console.log('In ResultTable.doSearch');
        var old_objective_value = this.props.objective_value;
        this.props.saveAutoSave();
        this.props.search();
        const { store } = this.context;
        var design = store.getState();
        var new_objective_value = design.model.result.objective_value;
        logUsage('event', 'ActionSearch', { event_label: 'Type ' + type + ' Button ' + old_objective_value.toPrecision(4) + ' --> ' + new_objective_value.toPrecision(4)});
    }

    onSeekRequest(event) {
//        console.log('In ResultTable.onSeekRequest this=',this,'event=',event);
        if (this.props.symbol_table.reduce((total, element)=>{return (element.type === "equationset" && element.input) && !(element.lmin & FIXED) ? total+1 : total+0}, 0) === 0) {
            displayMessage('Seek cannot continue because there are no free independent variables. Help button provides more information.', 'danger', 'Errors', '/docs/Help/alerts.html#NoFreeIV');
            return;
        }
        var inverted_constraint = false;
        this.props.symbol_table.forEach((element) => { // For each Symbol Table "equationset" entry
            if (element.type !== undefined && element.type === "equationset" && (element.lmin & CONSTRAINED) && (element.lmax & CONSTRAINED) && element.cmin > element.cmax) {
                inverted_constraint = true;
                displayMessage((element.name + ' constraints are inconsistent. Help button provides more information.'), 'danger', 'Errors', '/docs/Help/alerts.html#Constraint_Inconsistency');
                return;
            }
        });
        if (inverted_constraint) {
            return;
        }
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

//      From Issue #365 and #869:
//      The proposed terminology and color scheme:
//          OBJ value       Category Term           Color            RGB
//          zero            STRICTLY FEASIBLE       Black            #343a40
//          < OBJMIN        FEASIBLE                Green (or cyan)  #28a745
//          < 4x OBJMIN     CLOSE TO FEASIBLE       Orange           #fd7e14
//          > 4x OBJMIN     NOT FEASIBLE            Red              #dc3545
//          > Not finite    FEASIBILITY UNDEFINED   Purple           #8b299e
        var feasibility_status;
        var feasibility_tooltip;
        var feasibility_class;
        var display_search_button;
        if (!Number.isFinite(this.props.objective_value)) {
            feasibility_status = "FEASIBILITY UNDEFINED";
            feasibility_tooltip = 'FEASIBILITY UNDEFINED: computing constraints failed';
            feasibility_class = "text-feasibility-undefined";
            display_search_button = true;
        } else if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            feasibility_status = "NOT FEASIBLE";
            feasibility_tooltip = 'NOT FEASIBLE: constraints significantly violated';
            feasibility_class = "text-not-feasible ";
            display_search_button = true;
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            feasibility_status = "CLOSE TO FEASIBLE";
            feasibility_tooltip = 'CLOSE TO FEASIBLE: constraints slightly violated';
            feasibility_class = "text-close-to-feasible ";
            display_search_button = true;
        } else if (this.props.objective_value > 0.0) {
            feasibility_status = "FEASIBLE";
            feasibility_tooltip = 'FEASIBLE: constraints not significantly violated';
            feasibility_class = "text-feasible ";
            display_search_button = false;
        } else {
            feasibility_status = "STRICTLY FEASIBLE";
            feasibility_tooltip = 'STRICTLY FEASIBLE: no constraints violated';
            feasibility_class = "text-strictly-feasible ";
            display_search_button = false;
        }

        var ResultTableOptimize = require('../designtypes/'+this.props.type+'/ResultTableOptimize.jsx'); // Dynamically load ResultTableOptimize

        return (
            <>
                <Table className="col-md-8" size="sm">
                    <tbody>
                        <tr>
                            <th id="Feasibility">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Viability of the current design relative to constraints and fixed values</Tooltip>}>
                                    <span>Feasibility</span>
                                </OverlayTrigger>
                            </th>
                            <td className={feasibility_class + " text-left"}>
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>{feasibility_tooltip}</Tooltip>}>
                                    <span>{feasibility_status}</span>
                                </OverlayTrigger>
                                {feasibility_status === 'NOT FEASIBLE' && this.props.search_completed ?
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                        This design may be over-specified. 
                                        See Help topics on Feasibility, Design Situations, Spring Design Technique and Hints, Tricks & Tips.
                                        </Tooltip>}>
                                        <span>&nbsp;<i className="fas fa-info-circle text-primary"></i></span>
                                    </OverlayTrigger>
                                :
                                    ''
                                }
                            </td>
                        </tr>
                        <tr>
                            <th width="10%" id="Message" className="pb-3">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>Status feedback message from solution process</Tooltip>}>
                                    <span>Message</span>
                                </OverlayTrigger>
                            </th>
                            <td className="text-left">{this.props.termination_condition}</td>
                       </tr>
                    </tbody>
                </Table>
                <Table className="col-md-4" size="sm">
                    <tbody>
                        <tr>
                            <td className="text-left" id="ObjectiveValue">
                                <OverlayTrigger placement="bottom" overlay={<Tooltip>
	                                    <p>Visual summary of feasibility status.</p>
	                                    <p>Objective Value = {this.props.objective_value.toFixed(7)}<br />
	                                    OBJMIN = {this.props.system_controls.objmin.toFixed(7)}</p>
	                                    <p>See on-line Help for details.  Try Help lookup <b>indicator</b></p>
	                                    </Tooltip>}>
                                    <b>Status</b>
                                </OverlayTrigger>
                                <FeasibilityIndicator />
                            </td>
                        </tr>
                        <tr>
                            {display_search_button ? 
                                <td align="text-left">
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip><b>Seek</b> (optimize) if feasible.<br /><b>Search</b> (solve) if not feasible.<br />Same functions as Action menu.</Tooltip>}>
                                        <b className="pr-5">Action</b>
                                    </OverlayTrigger>
                                    <Button variant="primary" size="sm" onClick={this.onSearchRequest} disabled={!display_search_button}><b>Search</b> (solve)</Button>&nbsp;
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                        <p>Search alters the values of any free independent variables to find a design that 
                                        satisfies all constraints and each fixed dependent 
                                        variable. A feasible result is a solution to the designer’s
                                        goals as expressed by constraints and fixed values.</p>
                                        <p>Search stops when the first feasible solution is found. This happens
                                        when the Objective Value ({this.props.objective_value.toFixed(7)}) falls below 
                                        OBJMIN ({this.props.system_controls.objmin.toFixed(7)}).</p>
                                        <p>If Search cannot achieve a feasible result it converges to a compromise.
                                        This compromise tries to minimize violations.</p></Tooltip>}>
                                        <span><i className="fas fa-info-circle text-primary"></i></span>
                                    </OverlayTrigger>
                                </td>
                            :
                                <td align="text-left">
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip><b>Seek</b> (optimize) if feasible.<br /><b>Search</b> (solve) if not feasible.<br />Same functions as Action menu.</Tooltip>}>
                                        <b className="pr-5">Action</b>
                                    </OverlayTrigger>
                                    <Button variant="primary" size="sm" onClick={this.onSeekRequest} disabled={display_search_button}><b>Seek</b> (optimize)</Button>&nbsp;
                                    <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                        <p>If one feasible design exists there are likely many more available, each with varying advantages / disadvantages. 
                                        Seek provides a “goal seeking” capability to optimize your design on the parameter that you specify.</p> 
                                        <p>If starting with a default design, additional constraints specific to your application are required to obtain meaningful results.</p>
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
                <Modal show={this.state.search_infinite_modal} onHide={this.onSearchCancel}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            Search (solve)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Alert variant="warning">
                            <p>This design has numeric issues.
                            Some design variable values are causing the Objective Value to be infinite.</p>
                            <p>Continuing Search may not result in an improvement.</p>
                            <p>Canceling Search will allow you to examine the Alerts panel for invalid values and associated help.
                            Freeing one or more Independent Variables may result in an improvement.</p>
                        </Alert> 
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.onSearchContextHelp}>Help</Button>{' '}
                        <Button variant="secondary" onClick={this.onSearchContinue}>Continue</Button>
                        <Button variant="primary" onClick={this.onSearchCancel}>Cancel</Button>
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
    search_completed: state.model.result.search_completed,
});

const mapDispatchToProps = {
    search: search,
    seek: seek,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ResultTable);
