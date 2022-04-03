import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Table, OverlayTrigger, Tooltip, Button, Modal, InputGroup, Form, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, FIXED, MIN, MAX } from '../store/actionTypes';
import FeasibilityIndicator from './FeasibilityIndicator';
import { seek, search, saveAutoSave } from '../store/actionCreators';
import { logUsage } from '../logUsage';
import { displayMessage } from '../components/MessageModal';

class ResultTable extends Component {
    
    constructor(props) {
//        console.log('In ResultTable.ctor'');
        super(props);
        this.onSearchButton = this.onSearchButton.bind(this);
        this.onOptimizeButton = this.onOptimizeButton.bind(this);
        this.onOptimizeContextHelp = this.onOptimizeContextHelp.bind(this);
        this.onOptimizeCancel = this.onOptimizeCancel.bind(this);
        this.onMinMax = this.onMinMax.bind(this);
        this.onNameSelect = this.onNameSelect.bind(this);
        this.onSeek = this.onSeek.bind(this);
        this.onNoop = this.onNoop.bind(this);
        this.state = {
            optimize_modal: false, // Default: do not display optimize modal
            name: this.props.symbol_table[0].name, // TODO: A fudge
            minmax: MIN, // TODO: A fudge
        };
    }

    componentDidUpdate(prevProps) {
//        console.log('In ResultTable.componentDidUpdate this=',this,'prevProps=',prevProps);
        if (prevProps.type !== this.props.type) {
//            console.log('In ResultTable.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
            this.setState({
                name: this.props.symbol_table[0].name, // TODO: A fudge
            });
        }
    }

    onSearchButton(event) {
//        console.log('In ResultTable.onSearchButton this=',this,'event=',event);
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
            logUsage('event', 'ActionSearch', { 'event_label': 'Button ' + old_objective_value + ' --> ' + new_objective_value});
            var old_objective_value = this.props.objective_value.toPrecision(4);
            this.props.saveAutoSave();
            this.props.search();
            const { store } = this.context;
            var design = store.getState();
            var new_objective_value = design.model.result.objective_value.toPrecision(4)
        }
    }

    onOptimizeButton(event) {
//        console.log('In ResultTable.onOptimizeButton this=',this,'event=',event);
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
    }

    onOptimizeContextHelp(event) {
//        console.log('In ResultTable.onOptimizeContextHelp this=',this,'event=',event);
        this.setState({
            optimize_modal: !this.state.optimize_modal,
        });
        window.open('/docs/Help/seek.html', '_blank');
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
        logUsage('event', 'ActionSeek', { 'event_label': 'Button ' + this.state.minmax + ' ' + this.state.name });
        this.props.saveAutoSave();
        this.props.seek(this.state.name, this.state.minmax);
    }

    onNoop() {} // No-op for onHide

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
        
        var ResultTableOptimize = require('../designtypes/'+this.props.type+'/ResultTableOptimize.js'); // Dynamically load ResultTableOptimize

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
                                  <Button variant="primary" size="sm" onClick={this.onSearchButton} disabled={!display_search_button}><b>Search</b> (solve)</Button>&nbsp;
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                      SEARCH alters the values of any free independent variables to find a design that 
                                      satisfies all constraints while also achieving the desired value for each fixed dependent 
                                      variable.  Search stops when the first feasible solution is found.  The solution provided 
                                      by Search is a solution to the designer’s goals as expressed by constraints and fixes. If 
                                      a solution that meets all of these goals is not available, the search process converges 
                                      to a compromise. Typically, this compromise violates multiple constraints.
                                      </Tooltip>}>
                                      <span><i className="fas fa-info-circle text-primary"></i></span>
                                  </OverlayTrigger>
                              </td>
                            :
                              <td align="center">
                                  <Button variant="primary" size="sm" onClick={this.onOptimizeButton} disabled={display_search_button}><b>Seek</b> (optimize)</Button>&nbsp;
                                  <OverlayTrigger placement="bottom" overlay={<Tooltip>
                                      If one feasible design exists there are likely many more available, each with varying 
                                      advantages / disadvantages. The ODOP Seek feature provides a “goal seeking” capability 
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
                <Modal show={this.state.optimize_modal} onHide={this.onOptimizeCancel}>
                    <Modal.Header>
                        <Modal.Title>
                            Seek (optimize)
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="pb-0">
                        <p>This may be a long running operation. Please be patient.</p>
                        <ResultTableOptimize.default onClick={this.onOptimizeCancel}/>
                        <p>Select a specific Seek optimization:</p>
                        <InputGroup>
                            <ButtonGroup>
                                <Button variant="outline-secondary"onClick={() => this.onMinMax(MIN)} active={this.state.minmax === MIN}>Min</Button>
                                <Button variant="outline-secondary"onClick={() => this.onMinMax(MAX)} active={this.state.minmax === MAX}>Max</Button>
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
                        <Button variant="outline-info" onClick={this.onOptimizeContextHelp}>Help</Button>
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
    type: state.model.type,
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
