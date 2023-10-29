import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED } from '../store/actionTypes';
import NameValueUnitsHeaderIndependentVariable from './NameValueUnitsHeaderIndependentVariable';
import NameValueUnitsRowIndependentVariable from './NameValueUnitsRowIndependentVariable';
import NameValueUnitsHeaderDependentVariable from './NameValueUnitsHeaderDependentVariable';
import NameValueUnitsRowDependentVariable from './NameValueUnitsRowDependentVariable';
import ConstraintsMinHeaderIndependentVariable from './ConstraintsMinHeaderIndependentVariable';
import ConstraintsMinRowIndependentVariable from './ConstraintsMinRowIndependentVariable';
import ConstraintsMinHeaderDependentVariable from './ConstraintsMinHeaderDependentVariable';
import ConstraintsMinRowDependentVariable from './ConstraintsMinRowDependentVariable';
import ConstraintsMaxHeaderIndependentVariable from './ConstraintsMaxHeaderIndependentVariable';
import ConstraintsMaxRowIndependentVariable from './ConstraintsMaxRowIndependentVariable';
import ConstraintsMaxHeaderDependentVariable from './ConstraintsMaxHeaderDependentVariable';
import ConstraintsMaxRowDependentVariable from './ConstraintsMaxRowDependentVariable';
import NameValueUnitsHeaderCalcInput from './NameValueUnitsHeaderCalcInput';
import NameValueUnitsRowCalcInput from './NameValueUnitsRowCalcInput';
import FormControlTypeNumber from './FormControlTypeNumber';
import { logUsage } from '../logUsage';
import { getAlertsByName } from './Alerts';
import { load, search, seek, saveAutoSave, changeSymbolValue, setSymbolFlag, resetSymbolFlag, changeSymbolConstraint } from '../store/actionCreators';
import { displayMessage } from '../components/MessageModal';
import FeasibilityIndicator from './FeasibilityIndicator';

/*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/
Number.prototype.toODOPPrecision = function() {
    var value = this.valueOf();
    var odopValue;
    if (value < 10000.0 || value >= 1000000.0)
         odopValue = value.toPrecision(4);
    else odopValue = value.toFixed(0);
    return odopValue;
};

class SymbolValue extends Component {

    constructor(props) {
//        console.log('In SymbolValue.constructor props=',props);
        super(props);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onResetButton = this.onResetButton.bind(this);
        this.onSearchRequest = this.onSearchRequest.bind(this);
        this.onSeekMinRequest = this.onSeekMinRequest.bind(this);
        this.onSeekMaxRequest = this.onSeekMaxRequest.bind(this);
        this.onChangeValidValue = this.onChangeValidValue.bind(this);
        this.onChangeInvalidValue = this.onChangeInvalidValue.bind(this);
        this.onChangeValidMinConstraint = this.onChangeValidMinConstraint.bind(this);
        this.onChangeInvalidMinConstraint = this.onChangeInvalidMinConstraint.bind(this);
        this.onChangeValidMaxConstraint = this.onChangeValidMaxConstraint.bind(this);
        this.onChangeInvalidMaxConstraint = this.onChangeInvalidMaxConstraint.bind(this);
        this.onModifiedFlag = this.onModifiedFlag.bind(this);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                modal: false,
                isInvalidValue: false,
                isInvalidMinConstraint: false,
                isInvalidMaxConstraint: false,
                error: '',
            };
        } else if (this.props.element.format === 'table') {
//            console.log('In SymbolValue.constructor file= ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In SymbolValue.constructor table=',table);
            this.state = {
                table: table,
                modal: false,
                isInvalidValue: false,
                isInvalidMinConstraint: false,
                isInvalidMaxConstraint: false,
                error: '',
            };
        } else { // String
            this.state = {
                modal: false,
                isInvalidValue: false,
                isInvalidMinConstraint: false,
                isInvalidMaxConstraint: false,
                error: '',
            };
        }
    }

    componentDidMount() {
//      console.log('In SymbolValue.componentDidMount this=',this);
        document.addEventListener("click", this.handleClick);
        document.addEventListener("contextmenu", this.handleContextMenu);
    }

    componentWillUnmount() {
//      console.log('In SymbolValue.componentWillUnmount this=',this);
        document.removeEventListener("click", this.handleClick);
        document.removeEventListener("contextmenu", this.handleContextMenu);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
//            console.log('In SymbolValue.componentDidUpdate prevProps.type=',prevProps.type,'props.type=',this.props.type);
            if (this.props.element.format === 'table') {
//                console.log('In SymbolValue.componentDidUpdate file= ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In SymbolValue.componentDidUpdate table=',table);
                this.setState({
                    table: table,
                });
            }
        }
    }

    onSearchRequest(event) {
//        console.log('In SymbolValue.onSearchRequest this=',this,'event=',event);
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
        var old_objective_value = this.props.objective_value.toPrecision(4);
        this.props.saveAutoSave();
        this.props.search();
        const { store } = this.context;
        var design = store.getState();
        var new_objective_value = design.model.result.objective_value.toPrecision(4)
        logUsage('event', 'ActionSearch', { event_label: 'Element ' + this.props.element.name + ' ' + old_objective_value + ' --> ' + new_objective_value});
//        if (new_objective_value <= this.props.system_controls.objmin) {
//            this.setState({
//                modal: !this.state.modal
//            });
//        }
    }

    onSeekMinRequest(event) {
//        console.log('In SymbolValue.onSeekMinRequest this=',this,'event=',event);
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
//        this.setState({
//            modal: !this.state.modal
//        });
//        // Do seek
        this.props.saveAutoSave();
        this.props.seek(this.props.element.name, MIN);
        logUsage('event', 'ActionSeek', { event_label: 'Element ' + this.props.element.name + ' MIN'});
    }

    onSeekMaxRequest(event) {
//        console.log('In SymbolValue.onSeekMaxRequest this=',this,'event=',event);
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
//        this.setState({
//            modal: !this.state.modal
//        });
//        // Do seek
        this.props.saveAutoSave();
        this.props.seek(this.props.element.name, MAX);
        logUsage('event', 'ActionSeek', { event_label: 'Element ' + this.props.element.name + ' MAX'});
    }

    onContextMenu(e) {
//        console.log('In SymbolValue.onContextMenu this=',this,'e=',e);
        e.preventDefault();
        const { store } = this.context;
        var design = store.getState();
        var reset = JSON.stringify(design);
        this.setState({
            modal: true,
            reset: reset,
            error: '',
            modified: false,
        });
    }

    onContextHelp() {
//        console.log('In SymbolValue.onContextHelp this=',this);
        logUsage('event', 'SymbolValue', { event_label: 'Context Help button' });
        this.setState({
            modal: !this.state.modal,
            modified: false,
        });
        window.open('/docs/Help/settingValues.html', '_blank');
    }

    onClose() {
//        console.log('In SymbolValue.onClose this=',this);
        this.setState({
            modal: false,
            modified: false,
        });
    }

    onResetButton() {
//        console.log('In SymbolValue.onResetButton this=',this);
        logUsage('event', 'SymbolValue', { event_label: 'Reset button' });
        const { store } = this.context;
        store.dispatch(load(JSON.parse(this.state.reset)));
        this.setState({
            modified: false,
        });
    }

    onChangeValidValue(event) {
//        console.log('In SymbolValue.onChangeValidValue this=',this);
        this.setState({
            isInvalidValue: false,
            modified: true,
        });
    }

    onChangeInvalidValue(event) {
//        console.log('In SymbolValue.onChangeInvalidValue this=',this);
        this.setState({
            isInvalidValue: true,
            modified: true,
        });
    }

    onChangeValidMinConstraint(event) {
//        console.log('In SymbolValue.onChangeValidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: false,
            modified: true,
        });
    }

    onChangeInvalidMinConstraint(event) {
//        console.log('In SymbolValue.onChangeInvalidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: true,
            modified: true,
        });
    }

    onChangeValidMaxConstraint(event) {
//        console.log('In SymbolValue.onChangeValidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: false,
            modified: true,
        });
    }

    onChangeInvalidMaxConstraint(event) {
//        console.log('In SymbolValue.onChangeInvalidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: true,
            modified: true,
        });
    }

    onModifiedFlag(event) {
//        console.log('In SymbolValue.onModifiedFlag this=',this);
        this.setState({
            modified: true,
        });
    }

    render() {
//        console.log('In SymbolValue.render this=',this);
        var sv_results = getAlertsByName(this.props.element.name, true);
        var sv_value_class = sv_results.className;
        var sv_icon_alerts = sv_results.alerts;
        if (this.props.element.lmin & FIXED) {
            sv_value_class += "borders-fixed ";
        } else {
            if (this.props.element.lmin & CONSTRAINED) {
                sv_value_class += "borders-constrained-min ";
            }
            if (this.props.element.lmax & CONSTRAINED) {
                sv_value_class += "borders-constrained-max ";
            }
        }
        var disabled = false;
        if (this.props.element.type === "calcinput" && !this.props.element.input) { // Disable any calcinput that's an output'
            disabled = true;
        } else {
            sv_value_class += "background-white "; // Set rest to white background
//          console.log('In SymbolValue.render sv_value_class=',sv_value_class);
        }
        var icon_dependent_tag = '';
        if (this.props.element.type === "equationset" && !this.props.element.input) { // Dependent Variable?
            icon_dependent_tag =
                <OverlayTrigger placement="top" overlay={<Tooltip>Dependent Variable</Tooltip>}>
                    <i className="fas fa-asterisk fa-sm icon-dependent"></i>
                </OverlayTrigger>;
        }

        var feasibility_string;
        var feasibility_class;
        var display_search_button = false;
        var display_seek_button = false;
        if (this.props.element.type === 'equationset') {
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                feasibility_string = "NOT FEASIBLE";
                feasibility_class = "text-not-feasible ";
                display_search_button = true;
                display_seek_button = false;
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                feasibility_string = "CLOSE TO FEASIBLE";
                feasibility_class = "text-close-to-feasible ";
                display_search_button = true;
                display_seek_button = false;
            } else if (this.props.objective_value > 0.0) {
                feasibility_string = "FEASIBLE";
                feasibility_class = "text-feasible ";
                display_search_button = false;
                display_seek_button = true;
            } else {
                feasibility_string = "STRICTLY FEASIBLE";
                feasibility_class = "text-strictly-feasible ";
                display_search_button = false;
                display_seek_button = true;
            }
        }
        var free_variables = '';
        this.props.symbol_table.forEach((element) => {
            if (element.type === 'equationset' && element.input && !(element.lmin & FIXED)) {
                free_variables += element.name + ', ';
            }
        });
//        console.log('feasibility_string=',feasibility_string,'feasibility_class=',feasibility_class,'display_search_button=',display_search_button,'display_seek_button=',display_seek_button);

        return (
            <>
                <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')}>
                    <InputGroup>
                        { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                            <>
                                {icon_dependent_tag}
                                <FormControlTypeNumber id={'sv_'+this.props.element.name} disabled={disabled} readOnly icon_alerts={sv_icon_alerts} className={sv_value_class} value={this.props.element.value} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onClick={this.onContextMenu} />
                            </>
                        : ''}
                        { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                            <>
                                {icon_dependent_tag}
                                <Form.Control id={'sv_'+this.props.element.name} type="text" disabled={disabled} readOnly value={this.props.element.value} onClick={this.onContextMenu} />
                            </>
                        : ''}
                        { this.props.element.format === 'table' ?
                            <>
                                {icon_dependent_tag}
                                <Form.Control id={'sv_'+this.props.element.name} type="text" disabled={disabled} readOnly className={sv_value_class} value={this.state.table[this.props.element.value][0]} onClick={this.onContextMenu} />
                            </>
                        : ''}
                    </InputGroup>
                </td>
                <Modal show={this.state.modal} onHide={this.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                        Edit {this.props.element.type === "equationset" ? (this.props.element.input ? 'Independent Variable' : 'Dependent Variable') : "Calculation Input"} {this.props.element.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {display_search_button === true || display_seek_button === true ?
                            <Table borderless className="bg-white pb-5" size="sm">
                                <tbody>
                                    <tr>
                                        <td className={feasibility_class + " text-center"}>
                                            {feasibility_string}
                                            {feasibility_string === 'NOT FEASIBLE' && this.props.search_completed ?
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
                                        <td className="text-center" id="ObjectiveValue">
                                            <OverlayTrigger placement="bottom" overlay={<Tooltip>Search works to minimize Objective Value.<br />Objective Value = {this.props.objective_value.toFixed(7)}<br />Search stops if Objective Value falls below<br />OBJMIN = {this.props.system_controls.objmin.toFixed(7)}</Tooltip>}>
                                                <b>Status</b>
                                            </OverlayTrigger>
                                            <FeasibilityIndicator />
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        :
                            ''
                        }
                        {this.state.error !== '' ? <Alert variant="danger"> {this.state.error} </Alert> : ''}
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderIndependentVariable />
                                    <NameValueUnitsRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderDependentVariable />
                                    <NameValueUnitsRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                                </>}
                            {this.props.element.type === "calcinput" && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderCalcInput />
                                    <NameValueUnitsRowCalcInput key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} onChange={this.onModifiedFlag} onSelect={this.onModifiedFlag} />
                                </>}
                        </Table>
                        {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                            <Table size="sm" borderless>
                                <tbody>
                                    <tr>
                                        <td>
                                            To control the value of a Dependent Variable either FIX it or enable its MIN and/or MAX constraints and then set its constraint values. 
                                            This allows <img src="SearchButton.png" alt="SearchButton"/> to find the Dependent Variable's value that is within this constraint range.
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>}
                        {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                            <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                <ConstraintsMinHeaderIndependentVariable />
                                <ConstraintsMinRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMinConstraint} onChangeInvalid={this.onChangeInvalidMinConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                            </Table>}
                        {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                            <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                <ConstraintsMinHeaderDependentVariable />
                                <ConstraintsMinRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMinConstraint} onChangeInvalid={this.onChangeInvalidMinConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                            </Table>}
                        {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                            <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                <ConstraintsMaxHeaderIndependentVariable />
                                <ConstraintsMaxRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMaxConstraint} onChangeInvalid={this.onChangeInvalidMaxConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                            </Table>}
                        {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                            <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                                <ConstraintsMaxHeaderDependentVariable />
                                <ConstraintsMaxRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMaxConstraint} onChangeInvalid={this.onChangeInvalidMaxConstraint} onSet={this.onModifiedFlag} onReset={this.onModifiedFlag} />
                            </Table>}
                    </Modal.Body>
                    <Modal.Footer>
                        <><Button variant="outline-info" onClick={this.onContextHelp}>Help</Button>{' '}&nbsp;</>
                        {this.state.modified ? <><Button variant="secondary" onClick={this.onResetButton}>Reset</Button>&nbsp;</> : ''}
                        {display_search_button ? 
                            <>
                                {this.props.element.type === "equationset" && this.props.element.input && this.props.element.lmin & FIXED && free_variables.length > 0 ? 
                                    (this.props.search_completed ?
                                        <Button variant="secondary" onClick={this.onSearchRequest} disabled><b>Search</b> (solve)</Button>
                                    :
                                        <OverlayTrigger placement="top" overlay={<Tooltip>
                                            The Independent Variable {this.props.element.name} is Fixed. Search manipulates only the values of Free Independent Variables. Press this <img src="SearchButton.png" alt="SearchButton"/> button to alter the values, {free_variables} to locate a feasible solution (if available).
                                            </Tooltip>}>
                                            <Button variant="primary" onClick={this.onSearchRequest}><b>Search</b> (solve)</Button>
                                        </OverlayTrigger>)
                                :
                                    <Button variant={this.props.search_completed ? "secondary" : "primary"} onClick={this.onSearchRequest} disabled={this.props.search_completed}><b>Search</b> (solve)</Button>}
                                <Button variant={this.props.search_completed ? "primary" : "secondary"} disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.onClose}>Close</Button>
                            </>
                        :
                            (display_seek_button ? 
                                <>
                                    {this.props.element.lmin & FIXED ? '' : <Button variant="secondary" onClick={this.onSeekMinRequest} disabled={this.props.element.lmin & FIXED ? true : false} >Seek MIN {this.props.element.name}</Button>}
                                    {this.props.element.lmin & FIXED ? '' : <Button variant="secondary" onClick={this.onSeekMaxRequest} disabled={this.props.element.lmin & FIXED ? true : false} >Seek MAX {this.props.element.name}</Button>}
                                    <Button variant="primary" disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.onClose}>Close</Button>
                                </>
                            :
                                    <Button variant="primary" disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.onClose}>Close</Button>
                            )
                        }
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

SymbolValue.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    type: state.model.type,
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
    search_completed: state.model.result.search_completed,
});

const mapDispatchToProps = {
    load: load,
    search: search,
    seek: seek,
    saveAutoSave: saveAutoSave,
    changeSymbolValue: changeSymbolValue,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag,
    changeSymbolConstraint: changeSymbolConstraint,
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValue);
