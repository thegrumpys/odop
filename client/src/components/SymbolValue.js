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
import { logValue } from '../logUsage';
import { logUsage } from '../logUsage';

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
        this.onSelect = this.onSelect.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onValidValue = this.onValidValue.bind(this);
        this.onInvalidValue = this.onInvalidValue.bind(this);
        this.onValidMinConstraint = this.onValidMinConstraint.bind(this);
        this.onInvalidMinConstraint = this.onInvalidMinConstraint.bind(this);
        this.onValidMaxConstraint = this.onValidMaxConstraint.bind(this);
        this.onInvalidMaxConstraint = this.onInvalidMaxConstraint.bind(this);
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

    onSelect(event) {
//        console.log('In SymbolValue.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex); // Update the model
        logValue(this.props.element.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
//                console.log('In SymbolValue.onSelect value=',value,'index=',index);
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                    console.log('In SymbolValue.onSelect name=',name,' this.props.symbol_table=',this.props.symbol_table);
                this.props.changeSymbolValue(name,value); // Update the model
            }
        });
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
        logUsage('event', 'SymbolValue', { 'event_label': 'context Help button' });
        this.setState({
            modal: !this.state.modal
        });
        window.open('https://thegrumpys.github.io/odop/Help/settingValues', '_blank');
    }

    onClose() {
//        console.log('In SymbolValue.onCancel this=',this);
        this.setState({
            modal: false,
        });
    }

    onValidValue() {
//        console.log('In SymbolValue.onValidValue this=',this);
        this.setState({
            isInvalidValue: false,
        });
    }

    onInvalidValue() {
//        console.log('In SymbolValue.onInvalidValue this=',this);
        this.setState({
            isInvalidValue: true,
        });
    }

    onValidMinConstraint() {
//        console.log('In SymbolValue.onValidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: false,
        });
    }

    onInvalidMinConstraint() {
//        console.log('In SymbolValue.onInvalidMinConstraint this=',this);
        this.setState({
            isInvalidMinConstraint: true,
        });
    }

    onValidMaxConstraint() {
//        console.log('In SymbolValue.onValidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: false,
        });
    }

    onInvalidMaxConstraint() {
//        console.log('In SymbolValue.onInvalidMaxConstraint this=',this);
        this.setState({
            isInvalidMaxConstraint: true,
        });
    }

    getValueClass() {
        var value_class = '';
        if (this.props.objective_value > 4*this.props.system_controls.objmin) {
            value_class += "text-not-feasible ";
        } else if (this.props.objective_value > this.props.system_controls.objmin) {
            value_class += "text-close-to-feasible ";
        } else if (this.props.objective_value > 0.0) {
            value_class += "text-feasible ";
        } else {
            value_class += "text-strictly-feasible ";
        }
//        console.log('In SymbolValue.getValueClass value_class=',value_class);
        return value_class;
    }

    render() {
//        console.log('In SymbolValue.render this=',this);
        var value_class = 'text-right ';
        var value_tooltip;
        var value_fix_free_text = '';
        var icon_tag = '';
        if (!this.props.element.input && (this.props.element.lmin & FIXED && this.props.element.vmin > 0.0) && (this.props.element.lmax & FIXED && this.props.element.vmax > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "FIX VIOLATION: Value outside the range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
        } else if (!this.props.element.input && (this.props.element.lmin & FIXED && this.props.element.vmin > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "FIX VIOLATION: Value less than "+this.props.element.cmin.toODOPPrecision();
        } else if (!this.props.element.input && (this.props.element.lmax & FIXED && this.props.element.vmax > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "FIX VIOLATION: Value greater than "+this.props.element.cmax.toODOPPrecision();
        } else if ((this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) && (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0)) {
            value_class += this.getValueClass();
            value_tooltip = "CONSTRAINT VIOLATION: Value outside the range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
        } else if (this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) {
            value_class += this.getValueClass();
            value_tooltip = "CONSTRAINT VIOLATION: Value less than "+this.props.element.cmin.toODOPPrecision();
        } else if (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) {
            value_class += this.getValueClass();
            value_tooltip = "CONSTRAINT VIOLATION: Value greater than "+this.props.element.cmax.toODOPPrecision();
        }
        if (this.props.element.lmin & FIXED) {
            value_class += "borders-fixed ";
            if (this.props.element.type !== "calcinput") {
                if (this.props.element.input) { // Independent Variable?
                  value_fix_free_text = <div className="mb-3"><em>Fixed status prevents <img src="SearchButton.png" alt="SearchButton"/> from changing the value of this variable.</em></div>; // For Fixed
                } else {
                  value_fix_free_text = <div className="mb-3"><em>Fixed status restrains the <img src="SearchButton.png" alt="SearchButton"/> result to be as close as possible to the constraint value.</em></div>; // For Fixed
                }
            }
        } else {
            if (this.props.element.type !== "calcinput") {
                value_fix_free_text = <div className="mb-3"><em>Free status allows <img src="SearchButton.png" alt="SearchButton"/> to change the value of this variable.</em></div>; // For Free
            }
            if (this.props.element.lmin & CONSTRAINED) {
                value_class += "borders-constrained-min ";
            }
            if (this.props.element.lmax & CONSTRAINED) {
                value_class += "borders-constrained-max ";
            }
        }
        if (isNaN(parseFloat(this.props.element.value))) {
            value_class += "borders-invalid ";
        }
        if (this.props.element.type === "equationset" && !this.props.element.input) { // Dependent Variable?
            icon_tag = 
                <OverlayTrigger placement="top" overlay={<Tooltip>Dependent Variable</Tooltip>}>
                    <i className="fas fa-asterisk fa-sm icon"></i>
                </OverlayTrigger>;
        }
        value_class += "background-white ";
//        console.log('In SymbolValue.render value_class=',value_class);
        return (
            <>
                <td className={"align-middle " + this.props.className}>
                    <InputGroup>
                        { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                            (value_tooltip !== undefined ?
                                <>
                                    {icon_tag}
                                    <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                            <Form.Control type="number" readOnly className={value_class} step="any" value={this.props.element.value.toODOPPrecision()} onClick={this.onContextMenu} onContextMenu={this.onContextMenu} />
                                    </OverlayTrigger>
                                </>
                            :
                                <>
                                    {icon_tag}
                                    <Form.Control type="number" readOnly className={value_class} step="any" value={this.props.element.value.toODOPPrecision()} onClick={this.onContextMenu} onContextMenu={this.onContextMenu} />
                                </>
                            )
                        : ''}
                        { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                            (value_tooltip !== undefined ?
                                <>
                                    {icon_tag}
                                    <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                        <Form.Control type="text" readOnly className={value_class} value={this.props.element.value} onClick={this.onContextMenu} />
                                    </OverlayTrigger>
                                </>
                            :
                                <>
                                    {icon_tag}
                                    <Form.Control type="text" readOnly className={value_class} value={this.props.element.value} onClick={this.onContextMenu} onContextMenu={this.onContextMenu} />
                                </>
                            )
                        : ''}
                        { this.props.element.format === 'table' ?
                            (value_tooltip !== undefined ?
                                <>
                                    {icon_tag}
                                    <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                        <Form.Control type="text" readOnly className={value_class} value={this.state.table[this.props.element.value][0]} onClick={this.onContextMenu} />
                                    </OverlayTrigger>
                                </>
                            :
                                <>
                                    {icon_tag}
                                    <Form.Control type="text" readOnly className={value_class} value={this.state.table[this.props.element.value][0]} onClick={this.onContextMenu} />
                                </>
                            )
                        : ''}
                    </InputGroup>
                </td>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onClose}>
                    <Modal.Header>
                        <Modal.Title>
                        {this.props.element.type === "equationset" && (this.props.element.input ? 'Independent Variable' : 'Dependent Variable')} Value Input
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderIndependentVariable />
                                    <NameValueUnitsRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onValid={this.onValidValue} onInvalid={this.onInvalidValue} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderDependentVariable />
                                    <NameValueUnitsRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onValid={this.onValidValue} onInvalid={this.onInvalidValue} />
                                </>}
                            {this.props.element.type === "calcinput" && !this.props.element.hidden &&
                                <>
                                    <NameValueUnitsHeaderCalcInput />
                                    <NameValueUnitsRowCalcInput key={this.props.element.name} element={this.props.element} index={0} onValid={this.onValidValue} onInvalid={this.onInvalidValue} />
                                </>}
                        </Table>
                        <Table size="sm" style={{backgroundColor: '#eee'}} className="mb-0">
                            <tbody>
                                <tr className="table-light">
                                    <td>
                                      {value_fix_free_text}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMinHeaderIndependentVariable />
                                    <ConstraintsMinRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onValid={this.onValidMinConstraint} onInvalid={this.onInvalidMinConstraint} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMinHeaderDependentVariable />
                                    <ConstraintsMinRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onValid={this.onValidMinConstraint} onInvalid={this.onInvalidMinConstraint} />
                                </>}
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMaxHeaderIndependentVariable />
                                    <ConstraintsMaxRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} onValid={this.onValidMaxConstraint} onInvalid={this.onInvalidMaxConstraint} />
                                </>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <>
                                    <ConstraintsMaxHeaderDependentVariable />
                                    <ConstraintsMaxRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} onValid={this.onValidMaxConstraint} onInvalid={this.onInvalidMaxConstraint} />
                                </>}
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button outline="true" variant="info" onClick={this.onContextHelp}>Help</Button>{' '}
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
