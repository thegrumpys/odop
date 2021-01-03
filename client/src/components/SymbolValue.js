import React, { Component } from 'react';
import { InputGroup, ButtonGroup, Form, OverlayTrigger, Tooltip, Modal, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolValue, fixSymbolValue, freeSymbolValue } from '../store/actionCreators';

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
        this.onClick = this.onClick.bind(this);
        this.onContextMenu = this.onContextMenu.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onSet = this.onSet.bind(this);
        this.onReset = this.onReset.bind(this);
        this.onChangeIndependentVariableMinConstraint = this.onChangeIndependentVariableMinConstraint.bind(this);
        this.onSetIndependentVariableFlagMinConstrained = this.onSetIndependentVariableFlagMinConstrained.bind(this)
        this.onResetIndependentVariableFlagMinConstrained = this.onResetIndependentVariableFlagMinConstrained.bind(this)
        this.onChangeIndependentVariableMaxConstraint = this.onChangeIndependentVariableMaxConstraint.bind(this);
        this.onSetIndependentVariableFlagMaxConstrained = this.onSetIndependentVariableFlagMaxConstrained.bind(this)
        this.onResetIndependentVariableFlagMaxConstrained = this.onResetIndependentVariableFlagMaxConstrained.bind(this)
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

    onClick(e) {
//        console.log('In SymbolValue.onClick this=',this,'e=',e);
        this.setState({
            modal: false,
        });
    }

    onContextMenu(e) {
//        console.log('In SymbolValue.onContextMenu this=',this,'e=',e);
        e.preventDefault();
        this.setState({
            modal: true,
        });
    }

    onCancel() {
//        console.log('In SymbolValue.onCancel this=',this);
        this.setState({
            modal: false,
        });
    }

    onSave() {
//        console.log('In SymbolValue.onSave this=',this);
        this.setState({
            modal: false,
        });
    }

    onSet() {
//        console.log('In SymbolValue.onSet');
        this.props.fixSymbolValue(this.props.element.name);
    }

    onReset() {
//        console.log('In SymbolValue.onReset');
        this.props.freeSymbolValue(this.props.element.name);
    }

    onSetIndependentVariableFlagMinConstrained(event) {
//        console.log('In SymbolValue.onSetIndependentVariableFlagMinConstrained');
        this.props.setSymbolFlag(this.props.element.name, MIN, CONSTRAINED);
    }

    onResetIndependentVariableFlagMinConstrained(event) {
//        console.log('In SymbolValue.onResetIndependentVariableFlagMinConstrained');
        this.props.resetSymbolFlag(this.props.element.name, MIN, CONSTRAINED);
    }

    onChangeIndependentVariableMinConstraint(event) {
//        console.log('In SymbolValue.onChangeIndependentVariableMinConstraint');
        this.props.changeSymbolConstraint(this.props.element.name, MIN, parseFloat(event.target.value));
        if (this.props.element.lmin & FIXED) {
            this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(event.target.value));
        }
    }

    onSetIndependentVariableFlagMaxConstrained(event) {
//        console.log('In SymbolValue.onSetIndependentVariableFlagMaxConstrained');
        this.props.setSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }

    onResetIndependentVariableFlagMaxConstrained(event) {
//        console.log('In SymbolValue.onResetIndependentVariableFlagMaxConstrained');
        this.props.resetSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }

    onChangeIndependentVariableMaxConstraint(event) {
//        console.log('In SymbolValue.onChangeIndependentVariableMaxConstraint');
        if (this.props.element.lmax & FIXED) {
            this.props.changeSymbolConstraint(this.props.element.name, MIN, parseFloat(event.target.value));
        }
        this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(event.target.value));
    }

    render() {
//        console.log('In SymbolValue.render this=',this);
        var value_class = 'text-right ';
        var value_tooltip;
        if ((this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) || (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0)) {
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                value_tooltip = "CONSTRAINT VIOLATION: Value outside the constraint range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
                value_class += "text-not-feasible";
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                value_tooltip = "CONSTRAINT VIOLATION: Value outside the constraint range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
                value_class += "text-approaching-feasible";
            } else if (this.props.objective_value > 0.0) {
                value_tooltip = "CONSTRAINT VIOLATION: Value outside the constraint range from "+this.props.element.cmin.toODOPPrecision()+" to "+this.props.element.cmax.toODOPPrecision();
                value_class += "text-feasible";
            } else {
                value_class += "text-strictly-feasible";
            }
        }
        return (
            <React.Fragment>
                <td className={"align-middle " + this.props.className}>
                    <InputGroup>
                        { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                            (value_tooltip != undefined ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                    <Form.Control type="number" disabled={!this.props.element.input} className={value_class} step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onClick={this.onClick} onContextMenu={this.onContextMenu} />
                                </OverlayTrigger>
                            :
                                <Form.Control type="number" disabled={!this.props.element.input} className={value_class} step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} onClick={this.onClick} onContextMenu={this.onContextMenu} />
                            )
                        : ''}
                        { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                            (value_tooltip != undefined ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                    <Form.Control type="text" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onChange} />
                                </OverlayTrigger>
                            :
                                <Form.Control type="text" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onChange} />
                            )
                        : ''}
                        { this.props.element.format === 'table' ?
                            (value_tooltip != undefined ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{value_tooltip}</Tooltip>}>
                                    <Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onSelect}>
                                        {this.state.table.map((value, index) => index > 0 ? <option key={index} value={index}>{value[0]}</option> : '')}
                                    </Form.Control>
                                </OverlayTrigger>
                            :
                                (<Form.Control as="select" disabled={!this.props.element.input} className={value_class} value={this.props.element.value} onChange={this.onSelect}>
                                    {this.state.table.map((value, index) => index > 0 ? <option key={index} value={index}>{value[0]}</option> : '')}
                                </Form.Control>)
                            )
                        : ''}
                    </InputGroup>
                </td>
                <Modal show={this.state.modal} className={this.props.className} onHide={this.onClick}>
                    <Modal.Body>
                        <Table className="border border-secondary" size="sm">
                            <thead>
                                <tr>
                                    <th className="text-center bg-secondary text-white" colSpan="6" id="Title">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Inputs to design equations</Tooltip>}>
                                            <span>Variable</span>
                                        </OverlayTrigger>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-left" colSpan="2" id="NameTitle">
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Variable names</Tooltip>}>
                                        <span>Name</span>
                                    </OverlayTrigger>
                                    </th>
                                    <th className="text-center" colSpan="2" id="ValueTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Current values.<br />Check box at right to FIX. (Hold unchanged) <br /> Uncheck box to FREE <br /> (Allow Search to specify) <br /> See Help Terminology FIX</Tooltip>}>
                                            <span>Value (&nbsp;<i className="far fa-check-square"></i>&nbsp;Fix&nbsp;-&nbsp;<i className="far fa-square"></i>&nbsp;Free&nbsp;)</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th className={"text-left " + (this.props.system_controls.show_units ? "" : "d-none")} id="UnitsTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Units (information only)</Tooltip>}>
                                            <span>Units</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={this.props.element.name}>
                                    <td className="align-middle" colSpan="2" id={'independent_variable_'+this.props.index}>
                                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip>{this.props.element.tooltip}</Tooltip>}>
                                            <span>{this.props.element.name}</span>
                                        </OverlayTrigger>
                                    </td>
                                    <td className="align-middle" colSpan="2">
                                        <InputGroup>
                                            { this.props.element.format === undefined && typeof this.props.element.value === 'number' ?
                                                <Form.Control type="number" disabled={!this.props.element.input} className="text-right" step="any" value={this.state.focused ? this.props.element.value : this.props.element.value.toODOPPrecision()} onChange={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} /> : '' }
                                            { this.props.element.format === undefined && typeof this.props.element.value === 'string' ?
                                                <Form.Control type="text" disabled={!this.props.element.input} className="text-right" value={this.props.element.value} onChange={this.onChange} /> : '' }
                                            { this.props.element.format === 'table' &&
                                            (
                                                <Form.Control as="select" disabled={!this.props.element.input} value={this.props.element.value} onChange={this.onSelect}>
                                                    {this.state.table.map((value, index) =>
                                                        index > 0 ? <option key={index} value={index}>{value[0]}</option> : ''
                                                    )}
                                                </Form.Control>
                                            )
                                            }
                                            <InputGroup.Append>
                                                <InputGroup.Text>
                                                    <Form.Check type="checkbox" aria-label="Checkbox for fixed value" checked={this.props.element.lmin & FIXED} onChange={this.props.element.lmin & FIXED ? this.onReset : this.onSet} />
                                                </InputGroup.Text>
                                            </InputGroup.Append>
                                        </InputGroup>
                                    </td>
                                    <td className={"text-nowrap align-middle small " + (this.props.system_controls.show_units ? "" : "d-none")} colSpan="1">{this.props.element.units}</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table className="border border-secondary" size="sm">
                            <thead>
                                <tr>
                                    <th className="text-center bg-secondary text-white" colSpan="4" id="MinConstraintTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Lower limits on Independent Variables</Tooltip>}>
                                            <span>Min Constraint</span>
                                        </OverlayTrigger>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-left" id="MinConstraintConstrainTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish lower limit</Tooltip>}>
                                            <span>Constrain</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th className="text-center" id="MinConstraintValueTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for lower limit</Tooltip>}>
                                            <span>Value</span>
                                        </OverlayTrigger>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={this.props.element.name}>
                                    <td className="align-middle" colSpan="2">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <Form.Check type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.element.lmin & CONSTRAINED} onChange={this.props.element.lmin & CONSTRAINED ? this.onResetIndependentVariableFlagMinConstrained : this.onSetIndependentVariableFlagMinConstrained} disabled={this.props.element.lmin & FIXED ? true : false} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            {this.props.element.cminchoices !== undefined && this.props.element.cminchoices.length > 0 ?
                                                <OverlayTrigger placement="top" overlay={<Tooltip>FDCL ={this.props.element.lmin & FDCL ? this.props.element.cminchoices[this.props.element.cminchoice] : this.props.element.cmin}</Tooltip>}>
                                                    <Form.Control type="number" id={this.props.element.name + "_cmin"} className={value_class} value={this.props.element.lmin & CONSTRAINED ? this.props.element.cmin : ''} onChange={this.onChangeIndependentVariableMinConstraint} disabled={this.props.element.lmin & FIXED ? true : (this.props.element.lmin & CONSTRAINED ? false : true)} onClick={this.onClick}/>
                                                </OverlayTrigger>
                                            :
                                                <Form.Control type="number" id={this.props.element.name + "_cmin"} className={value_class} value={this.props.element.lmin & CONSTRAINED ? this.props.element.cmin : ''} onChange={this.onChangeIndependentVariableMinConstraint} disabled={this.props.element.lmin & FIXED ? true : (this.props.element.lmin & CONSTRAINED ? false : true)} onClick={this.onClick}/>
                                            }
                                        </InputGroup>
                                        {this.props.element.cminchoices !== undefined && this.props.element.cminchoices.length > 0 ? <Modal show={this.state.modal} className={this.props.className} size="lg" onHide={this.onCancel}>
                                            <Modal.Header>
                                                Set {this.props.element.name} Min Constraint
                                            </Modal.Header>
                                            <Modal.Body>
                                                Select constraint variable or enter constraint value.
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Variable:&nbsp;</td>
                                                            <td>
                                                                <InputGroup>
                                                                    <ButtonGroup>
                                                                        {this.props.element.cminchoices.map((e) => {return (
                                                                            <Button key={e} variant="primary" onClick={(event) => {this.onSelectVariable(event,e)}} style={{marginBotton: '5px'}} active={this.props.element.cminchoices[this.props.element.cminchoice] === e}>{e}</Button>
                                                                        );})}
                                                                    </ButtonGroup>
                                                                </InputGroup>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Value:&nbsp;</td>
                                                            <td>
                                                                <InputGroup>
                                                                    <Form.Control type="number" id={this.props.element.name + "_cmin"} className="text-right" value={this.state.value} onChange={this.onChangeValue} />
                                                                    <Button variant="primary" onClick={this.onEnterValue}>Enter</Button>
                                                                </InputGroup>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                                            </Modal.Footer>
                                        </Modal> : ''}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        <Table className="border border-secondary" size="sm">
                            <thead>
                                <tr>
                                    <th className="text-center bg-secondary text-white" colSpan="4" id="MaxConstraintTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Upper limits on Independent Variables</Tooltip>}>
                                            <span>Max Constraint</span>
                                        </OverlayTrigger>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="text-left" id="MaxConstraintConstrainTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Check box to establish upper limit</Tooltip>}>
                                            <span>Constrain</span>
                                        </OverlayTrigger>
                                    </th>
                                    <th className="text-center" id="MaxConstraintValueTitle">
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Enter value for upper limit</Tooltip>}>
                                            <span>Value</span>
                                        </OverlayTrigger>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={this.props.element.name}>
                                    <td className="align-middle" colSpan="2">
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>
                                                    <Form.Check type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetIndependentVariableFlagConstrained : this.onSetIndependentVariableFlagConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                                                </InputGroup.Text>
                                            </InputGroup.Prepend>
                                            {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ?
                                                <OverlayTrigger placement="top" overlay={<Tooltip>FDCL ={this.props.element.lmax & FDCL ? this.props.element.cmaxchoices[this.props.element.cmaxchoice] : this.props.element.cmax}</Tooltip>}>
                                                    <Form.Control type="number" id={this.props.element.name + "_cmax"} className={value_class} value={this.props.element.lmax & CONSTRAINED ? this.props.element.cmax : ''} onChange={this.onChangeIndependentVariableConstraint} disabled={this.props.element.lmax & FIXED ? true : (this.props.element.lmax & CONSTRAINED ? false : true)} onClick={this.onClick} />
                                                </OverlayTrigger>
                                            :
                                                <Form.Control type="number" id={this.props.element.name + "_cmax"} className={value_class} value={this.props.element.lmax & CONSTRAINED ? this.props.element.cmax : ''} onChange={this.onChangeIndependentVariableConstraint} disabled={this.props.element.lmax & FIXED ? true : (this.props.element.lmax & CONSTRAINED ? false : true)} onClick={this.onClick} />
                                            }
                                        </InputGroup>
                                        {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ? <Modal show={this.state.modal} className={this.props.className} size="lg" onHide={this.onCancel}>
                                            <Modal.Header>
                                                Set {this.props.element.name} Max Constraint
                                            </Modal.Header>
                                            <Modal.Body>
                                                Select constraint variable or enter constraint value.
                                                <table>
                                                    <tbody>
                                                        <tr>
                                                            <td>Variable:&nbsp;</td>
                                                            <td>
                                                                <InputGroup>
                                                                    <ButtonGroup>
                                                                        {this.props.element.cmaxchoices.map((e) => {return (
                                                                            <Button key={e} variant="primary" onClick={(event) => {this.onSelectVariable(event,e)}} style={{marginBotton: '5px'}} active={this.props.element.cmaxchoices[this.props.element.cmaxchoice] === e}>{e}</Button>
                                                                        );})}
                                                                    </ButtonGroup>
                                                                </InputGroup>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>Value:&nbsp;</td>
                                                            <td>
                                                                <InputGroup>
                                                                    <Form.Control type="number" id={this.props.element.name + "_cmax"} className="text-right" value={this.state.value} onChange={this.onChangeValue} />
                                                                    <Button variant="primary" onClick={this.onEnterValue}>Enter</Button>
                                                                </InputGroup>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                                            </Modal.Footer>
                                        </Modal> : ''}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button variant="primary" onClick={this.onSave}>Save</Button>
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
    fixSymbolValue: fixSymbolValue,
    freeSymbolValue: freeSymbolValue,
};

export default connect(mapStateToProps, mapDispatchToProps)(SymbolValue);
