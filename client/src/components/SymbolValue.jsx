import React, { Component } from 'react';
import { InputGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { FIXED, CONSTRAINED } from '../store/actionTypes';
import { changeSymbolValue } from '../store/actionCreators';
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
            };
        } else {
            this.state = {
                modal: false,
                isInvalidValue: false,
                isInvalidMinConstraint: false,
                isInvalidMaxConstraint: false,
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
        });
    }

    onContextHelp() {
//        console.log('In SymbolValue.onContextHelp this=',this);
        logUsage('event', 'SymbolValue', { event_label: 'context Help button' });
        this.setState({
            modal: !this.state.modal
        });
        window.open('/docs/Help/settingValues.html', '_blank');
    }

    onClose() {
//        console.log('In SymbolValue.onCancel this=',this);
        this.setState({
            modal: false,
        });
    }

    onChangeValidValue(event) {
//        console.log('In SymbolValue.onChangeValidValue this=',this);
        this.setState({
            isInvalidValue: false,
        });
        logValue(this.props.element.name,event.target.value);
    }

    onChangeInvalidValue() {
//        console.log('In SymbolValue.onChangeInvalidValue this=',this);
        this.setState({
            isInvalidValue: true,
        });
    }

    onChangeValidMinConstraint() {
//        console.log('In SymbolValue.onChangeValidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: false,
        });
    }

    onChangeInvalidMinConstraint() {
//        console.log('In SymbolValue.onChangeInvalidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: true,
        });
    }

    onChangeValidMaxConstraint() {
//        console.log('In SymbolValue.onChangeValidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: false,
        });
    }

    onChangeInvalidMaxConstraint() {
//        console.log('In SymbolValue.onChangeInvalidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: true,
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
                <Modal show={this.state.modal} onHide={this.onClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                        {this.props.element.type === "equationset" && (this.props.element.input ? 'Independent Variable' : 'Dependent Variable')} Value Input
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                        <Button variant="outline-info" onClick={this.onContextHelp}>Help</Button>{' '}
                        &nbsp;
                        <Button variant="primary" disabled={this.state.isInvalidValue || this.state.isInvalidMinConstraint || this.state.isInvalidMaxConstraint} onClick={this.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

const mapStateToProps = state => ({
    type: state.model.type,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValue);
