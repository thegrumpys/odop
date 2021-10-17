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
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onContextHelp = this.onContextHelp.bind(this);
        this.onClose = this.onClose.bind(this);
        this.getValueClass = this.getValueClass.bind(this);
        if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
            this.state = {
                modal: false,
                focused: false,
            };
        } else if (this.props.element.format === 'table') {
//            console.log('In SymbolValue.constructor file= ../designtypes/'+this.props.element.table+'.json');
            var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//            console.log('In SymbolValue.constructor table=',table);
            this.state = {
                modal: false,
                table: table,
            };
        } else {
            this.state = {
                modal: false,
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
//        console.log('In SymbolValue.componentDidUpdate prevProps=',prevProps.type,'props=',this.props.type);
        if (prevProps.type !== this.props.type) {
            if (this.props.element.format === undefined && typeof this.props.element.value === 'number') {
                this.setState({
                    focused: false,
                });
            } else if (this.props.element.format === 'table') {
//                console.log('In SymbolValue.componentDidUpdate file= ../designtypes/'+this.props.element.table+'.json');
                var table = require('../designtypes/'+this.props.element.table+'.json'); // Dynamically load table
//                console.log('In SymbolValue.componentDidUpdate table=',table);
                this.setState({
                  table: table
                });
            }
        }
    }

    onChange(event) {
//        console.log('In SymbolValue.onChange event.target.value=',event.target.value);
       this.props.changeSymbolValue(this.props.element.name, parseFloat(event.target.value));
       logValue(this.props.element.name,event.target.value);
    }

    onFocus(event) {
//        console.log("In SymbolValue.onFocus event.target.value=", event.target.value);
       this.setState({
            focused: true
        });
    }

    onBlur(event) {
//        console.log("In SymbolValue.onBlur event.target.value=", event.target.value);
        this.setState({
          focused: false
        });
    }

    onSelect(event) {
//        console.log('In SymbolValue.onSelect event.target.value=',event.target.value);
        var selectedIndex = parseFloat(event.target.value);
        this.props.changeSymbolValue(this.props.element.name,selectedIndex);
        logValue(this.props.element.name,selectedIndex);
        this.state.table[selectedIndex].forEach((value, index) => {
//            console.log('In SymbolValue.onSelect value=',value,'index=',index);
            if (index > 0) { // Skip the first column
                var name = this.state.table[0][index];
//                console.log('In SymbolValue.onSelect name=',name,' this.props.symbol_table=',this.props.symbol_table);
                if (this.props.symbol_table.find(element => element.name === name) !== undefined) {
                    this.props.changeSymbolValue(name,value);
                }
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

    getValueClass() {
//        console.log('In SymbolValue.getValueClass this=',this);
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
//        console.log('In SymbolValue.getValueClass element=','this.props.element,'value_class=',value_class);
        return value_class;
    }

    render() {
//        console.log('In SymbolValue.render this=',this);
        var value_class = 'text-right ';
        var value_tooltip;
        var value_fix_free_text = '';
        if (this.props.element.input && this.props.element.value <= this.props.element.validmin) {
            value_class += "background-pink ";
            value_tooltip = "VALIDITY VIOLATION: Value outside the range from "+this.props.element.validmin.toODOPPrecision()+" to "+this.props.element.validmax.toODOPPrecision();
        }
        if (this.props.element.input && this.props.element.value >= this.props.element.validmax) {
            value_class += "background-pink ";
            value_tooltip = "VALIDITY VIOLATION: Value outside the range from "+this.props.element.validmin.toODOPPrecision()+" to "+this.props.element.validmax.toODOPPrecision();
        }
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
//        console.log('In SymbolValue.render value_class=',value_class);
        return (
            <React.Fragment>
                <td className={"align-middle " + this.props.className}>
                    <InputGroup>
                        { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                            (value_tooltip !== undefined ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                    <Form.Control type="number" disabled={!this.props.element.input} className={value_class} step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onContextMenu={this.onContextMenu} />
                                </OverlayTrigger>
                            :
                                <Form.Control type="number" disabled={!this.props.element.input} className={value_class} step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onContextMenu={this.onContextMenu} />
                            )
                        : ''}
                        { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                            (value_tooltip !== undefined ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                    <Form.Control type="text" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onChange} onContextMenu={this.onContextMenu} />
                                </OverlayTrigger>
                            :
                                <Form.Control type="text" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onChange} onContextMenu={this.onContextMenu} />
                            )
                        : ''}
                        { this.props.element.format === 'table' ?
                            (value_tooltip !== undefined ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                    <Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onSelect} onContextMenu={this.onContextMenu} >
                                        {this.state.table.map((value, index) => index > 0 ? <option key={index} value={index}>{value[0]}</option> : '')}
                                    </Form.Control>
                                </OverlayTrigger>
                            :
                                (<Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onSelect} onContextMenu={this.onContextMenu} >
                                    {this.state.table.map((value, index) => index > 0 ? <option key={index} value={index}>{value[0]}</option> : '')}
                                </Form.Control>)
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
                                <React.Fragment>
                                    <NameValueUnitsHeaderIndependentVariable />
                                    <NameValueUnitsRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <NameValueUnitsHeaderDependentVariable />
                                    <NameValueUnitsRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "calcinput" && !this.props.element.hidden &&
                                <React.Fragment>
                                    <NameValueUnitsHeaderCalcInput />
                                    <NameValueUnitsRowCalcInput key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
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
                                <React.Fragment>
                                    <ConstraintsMinHeaderIndependentVariable />
                                    <ConstraintsMinRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <ConstraintsMinHeaderDependentVariable />
                                    <ConstraintsMinRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                        </Table>
                        <Table className="border border-secondary" size="sm" style={{backgroundColor: '#eee'}}>
                            {this.props.element.type === "equationset" && this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <ConstraintsMaxHeaderIndependentVariable />
                                    <ConstraintsMaxRowIndependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                            {this.props.element.type === "equationset" && !this.props.element.input && !this.props.element.hidden &&
                                <React.Fragment>
                                    <ConstraintsMaxHeaderDependentVariable />
                                    <ConstraintsMaxRowDependentVariable key={this.props.element.name} element={this.props.element} index={0} />
                                </React.Fragment>}
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button outline="true" variant="info" onClick={this.onContextHelp}>Help</Button>{' '}
                        &nbsp;
                        <Button variant="primary" onClick={this.onClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.model.symbol_table,
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolValue: changeSymbolValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValue);
