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
import { logValue } from '../logUsage';
import { logUsage } from '../logUsage';
import { getAlertsByName } from './Alerts';
import { search, saveAutoSave, changeSymbolValue, setSymbolFlag, resetSymbolFlag, changeSymbolConstraint } from '../store/actionCreators';
import { displayMessage } from '../components/MessageModal';

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
        this.onReset = this.onReset.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onChangeValidValue = this.onChangeValidValue.bind(this);
        this.onChangeInvalidValue = this.onChangeInvalidValue.bind(this);
        this.onChangeValidMinConstraint = this.onChangeValidMinConstraint.bind(this);
        this.onChangeInvalidMinConstraint = this.onChangeInvalidMinConstraint.bind(this);
        this.onChangeValidMaxConstraint = this.onChangeValidMaxConstraint.bind(this);
        this.onChangeInvalidMaxConstraint = this.onChangeInvalidMaxConstraint.bind(this);
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
        } else {
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

    onContextMenu(e) {
//        console.log('In SymbolValue.onContextMenu this=',this,'e=',e);
        e.preventDefault();
        this.setState({
            modal: true,
            element: this.props.element,
            error: '',
            modified: false,
        });
    }

    onContextHelp() {
//        console.log('In SymbolValue.onContextHelp this=',this);
        logUsage('event', 'SymbolValue', { event_label: 'context Help button' });
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

    onReset() {
//        console.log('In SymbolValue.onReset this=',this);
        this.props.changeSymbolValue(this.state.element.name, this.state.element.value); // Reset the value back to what it was
        if (this.state.element.lmin & FIXED) {
            this.props.setSymbolFlag(this.state.element.name, MIN, FIXED);
        } else {
            this.props.resetSymbolFlag(this.state.element.name, MIN, FIXED);
        }
        if (this.state.element.lmax & FIXED) {
            this.props.setSymbolFlag(this.state.element.name, MAX, FIXED);
        } else {
            this.props.resetSymbolFlag(this.state.element.name, MAX, FIXED);
        }
        this.props.changeSymbolConstraint(this.state.element.name, MIN, this.state.element.cmin);
        this.props.changeSymbolConstraint(this.state.element.name, MAX, this.state.element.cmin);
        if (this.state.element.lmin & CONSTRAINED) {
            this.props.setSymbolFlag(this.state.element.name, MIN, CONSTRAINED);
        } else {
            this.props.resetSymbolFlag(this.state.element.name, MIN, CONSTRAINED);
        }
        if (this.state.element.lmax & CONSTRAINED) {
            this.props.setSymbolFlag(this.state.element.name, MAX, CONSTRAINED);
        } else {
            this.props.resetSymbolFlag(this.state.element.name, MAX, CONSTRAINED);
        }
        this.setState({
            modified: false,
        });
    }

    onSearch() {
//        console.log('In SymbolValue.onSearch this=',this);
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
//        console.log('In SymbolValue.onSearch','old_objective_value=',old_objective_value,'new_objective_value=',new_objective_value);

        if (design.model.result.objective_value < this.props.system_controls.objmin) {
            this.setState({
                modal: false,
                modified: false,
            });
        } else {
            this.setState({
                error: 'Search returned not feasible',
            });
        }
    }

    onChangeValidValue(event) {
//        console.log('In SymbolValue.onChangeValidValue this=',this);
        this.setState({
            isInvalidValue: false,
            modified: true,
        });
        logValue(this.props.element.name,event.target.value);
    }

    onChangeInvalidValue() {
//        console.log('In SymbolValue.onChangeInvalidValue this=',this);
        this.setState({
            isInvalidValue: true,
            modified: true,
        });
    }

    onChangeValidMinConstraint() {
//        console.log('In SymbolValue.onChangeValidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: false,
            modified: true,
        });
    }

    onChangeInvalidMinConstraint() {
//        console.log('In SymbolValue.onChangeInvalidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: true,
            modified: true,
        });
    }

    onChangeValidMaxConstraint() {
//        console.log('In SymbolValue.onChangeValidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: false,
            modified: true,
        });
    }

    onChangeInvalidMaxConstraint() {
//        console.log('In SymbolValue.onChangeInvalidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: true,
            modified: true,
        });
    }

    render() {
//        console.log('In SymbolValue.render this=',this);
        var results = getAlertsByName(this.props.element.name, true);
        var className = results.className;
        var icon_alerts = results.alerts;
        if (this.props.element.lmin & FIXED) {
            className += "borders-fixed ";
        } else {
            if (this.props.element.lmin & CONSTRAINED) {
                className += "borders-constrained-min ";
            }
            if (this.props.element.lmax & CONSTRAINED) {
                className += "borders-constrained-max ";
            }
        }
        className += "background-white "; // Always white
//        console.log('In SymbolValue.render className=',className);
        var icon_dependent_tag = '';
        if (this.props.element.type === "equationset" && !this.props.element.input) { // Dependent Variable?
            icon_dependent_tag =
                <OverlayTrigger placement="top" overlay={<Tooltip>Dependent Variable</Tooltip>}>
                    <i className="fas fa-asterisk fa-sm icon-dependent"></i>
                </OverlayTrigger>;
        }
        return (
            <>
                <td className={"align-middle " + (this.props.className !== undefined ? this.props.className : '')}>
                    <InputGroup>
                        { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                            <>
                                {icon_dependent_tag}
                                <FormControlTypeNumber id={'sv_'+this.props.element.name} readOnly icon_alerts={icon_alerts} className={className} value={this.props.element.value} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onClick={this.onContextMenu} />
                            </>
                        : ''}
                        { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                            <>
                                {icon_dependent_tag}
                                <Form.Control id={'sv_'+this.props.element.name} type="text" readOnly value={this.props.element.value} onClick={this.onContextMenu} />
                            </>
                        : ''}
                        { this.props.element.format === 'table' ?
                            <>
                                {icon_dependent_tag}
                                <Form.Control id={'sv_'+this.props.element.name} type="text" readOnly className={className} value={this.state.table[this.props.element.value][0]} onClick={this.onContextMenu} />
                            </>
                        : ''}
                    </InputGroup>
                </td>
                <Modal show={this.state.modal} onHide={this.props.system_controls.enable_auto_search && this.state.modified ? this.onReset : this.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                        {this.props.element.type === "equationset" && (this.props.element.input ? 'Independent Variable' : 'Dependent Variable')} Value Input
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.error !== '' ? <Alert variant="danger"> {this.state.error} </Alert> : ''}
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderIndependentVariable />
                                    <NameValueUnitsRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderDependentVariable />
                                    <NameValueUnitsRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} toolTip="Change value by enabling Fixed status and changing the constraint value, or by enabling one or both contraints and changing the corresponding value(s)" />
                                </>}
                            {this.props.element.type === "calcinput" && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderCalcInput />
                                    <NameValueUnitsRowCalcInput key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} />
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
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMinHeaderIndependentVariable />
                                    <ConstraintsMinRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMinConstraint} onChangeInvalid={this.onChangeInvalidMinConstraint} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMinHeaderDependentVariable />
                                    <ConstraintsMinRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMinConstraint} onChangeInvalid={this.onChangeInvalidMinConstraint} />
                                </>}
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMaxHeaderIndependentVariable />
                                    <ConstraintsMaxRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMaxConstraint} onChangeInvalid={this.onChangeInvalidMaxConstraint} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMaxHeaderDependentVariable />
                                    <ConstraintsMaxRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onChangeValid={this.onChangeValidMaxConstraint} onChangeInvalid={this.onChangeInvalidMaxConstraint} />
                                </>}
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <><Button variant="outline-info" onClick={this.onContextHelp}>Help</Button>{' '}&nbsp;</>
                        {this.props.system_controls.enable_auto_search && this.state.modified ? <><Button variant="secondary" onClick={this.onReset}>Reset</Button>&nbsp;</> : ''}
                        <Button variant="primary" disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.props.system_controls.enable_auto_search ? this.onSearch : this.onClose}>{this.props.system_controls.enable_auto_search && this.props.objective_value >= this.props.system_controls.objmin ? <><b>Search</b> (solve)</> : 'Close'}</Button>
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
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    search: search,
    saveAutoSave: saveAutoSave,
    changeSymbolValue: changeSymbolValue,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag,
    changeSymbolConstraint: changeSymbolConstraint,
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValue);
