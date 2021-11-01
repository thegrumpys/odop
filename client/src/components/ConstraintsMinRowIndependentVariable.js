import React, { Component } from 'react';
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { logValue } from '../logUsage';

class ConstraintMinRowIndependentVariable extends Component {

    constructor(props) {
        super(props);
        this.onChangeMinConstraint = this.onChangeMinConstraint.bind(this);
        this.onSetFlagMinConstrained = this.onSetFlagMinConstrained.bind(this)
        this.onResetFlagMinConstrained = this.onResetFlagMinConstrained.bind(this)
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onEnterButton = this.onEnterButton.bind(this);
        this.onVariableButton = this.onVariableButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = { // Always a "number"
            modal: false, // Default: do not display modal
            valueString: this.props.element.cmin.toString(), // Update the display
            focused: false,
        };
    }

    onSetFlagMinConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MIN, CONSTRAINED);
        logValue(this.props.element.name,'Enabled','MinConstraintFlag',false);
    }

    onResetFlagMinConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MIN, CONSTRAINED);
        logValue(this.props.element.name,'Disabled','MinConstraintFlag',false);
    }

    onChangeMinConstraint(event) {
        this.setState({
            valueString: event.target.value, // Update the display
        });
        var value = parseFloat(event.target.value);
        if (!isNaN(value) && isFinite(value)) {
            this.props.changeSymbolConstraint(this.props.element.name, MIN, value); // Update the model
            logValue(this.props.element.name,event.target.value,'MinConstraint');
            if (this.props.element.lmin & FIXED) {
                this.props.changeSymbolConstraint(this.props.element.name, MAX, value); // Update the model
                logValue(this.props.element.name,event.target.value,'MaxConstraint');
            }
        }
    }
    
    onFocus(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onFocus event.target.value=", event.target.value);
        this.setState({
            valueString: this.props.element.cmin.toString(), // Update the display with unformatted value
            focused: true,
        });
    }
    
    onBlur(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onBlur event.target.value=", event.target.value);
        this.setState({
            valueString: this.props.element.cmin.toString(), // Update the display with formatted value
            focused: false,
        });
    }

    onClick(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onClick event.target.value=",event.target.value);
        // Show modal only if there are cminchoices
        if (this.props.element.cminchoices !== undefined && this.props.element.cminchoices.length > 0) {
            this.setState({
                modal: !this.state.modal,
            });
        }
    }

    onChangeValue(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onChangeValue event.target.value=",event.target.value);
        this.setState({
            valueString: event.target.value,
            focused: true,
        });
    }

    onEnterButton(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onEnterButton event.target.value=",event.target.value);
        this.setState({
            modal: !this.state.modal
        });
        var value = parseFloat(this.state.valueString);
        if (!isNaN(value) && isFinite(value)) {
            this.props.resetSymbolFlag(this.props.element.name, MIN, FDCL);
            this.props.changeSymbolConstraint(this.props.element.name, MIN, value); // Update the model
            if (this.props.element.lmin & FIXED) {
                this.props.resetSymbolFlag(this.props.element.name, MAX, FDCL);
                this.props.changeSymbolConstraint(this.props.element.name, MAX, value); // Update the model
            }
        }
    }

    onVariableButton(event, source_name) {
//        console.log("In ConstraintMinRowIndependentVariable.onVariableButton event.target.value=",event.target.value," source_name=",source_name);
        this.setState({
            modal: !this.state.modal
        });
        this.props.setSymbolFlag(this.props.element.name, MIN, FDCL, source_name);
        if (this.props.element.lmin & FIXED) {
            this.props.setSymbolFlag(this.props.element.name, MAX, FDCL, source_name);
        }
    }

    onCancel(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onCancel event.target.value=",event.target.value);
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In ConstraintMinRowIndependentVariable.render this=',this);
        // =======================================
        // Constraint Minimum Column
        // =======================================
        var value_class = 'text-right ';
        if (this.props.element.lmin & CONSTRAINED && this.props.element.vmin > 0.0) {
            if (this.props.objective_value > 4*this.props.system_controls.objmin) {
                value_class += "text-not-feasible";
            } else if (this.props.objective_value > this.props.system_controls.objmin) {
                value_class += "text-close-to-feasible";
            } else if (this.props.objective_value > 0.0) {
                value_class += "text-feasible";
            } else {
                value_class += "text-strictly-feasible";
            }
        }
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle d-lg-none" id={'independent_variable_min_constrain_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip className="d-lg-none">{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <Form.Check type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.element.lmin & CONSTRAINED} onChange={this.props.element.lmin & CONSTRAINED ? this.onResetFlagMinConstrained : this.onSetFlagMinConstrained} disabled={this.props.element.lmin & FIXED ? true : false} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            {this.props.element.cminchoices !== undefined && this.props.element.cminchoices.length > 0 ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{this.props.element.lmin & FDCL ? 'FDCL =' + this.props.element.cminchoices[this.props.element.cminchoice] : '=' + this.props.element.cmin + ' (non-FDCL)'}</Tooltip>}>
                                    <Form.Control type="number" id={this.props.element.name + "_cmin"} className={value_class} value={this.props.element.lmin & CONSTRAINED ? (this.state.focused ? this.state.valueString : this.props.element.cmin.toString()) : ''} onChange={this.onChangeMinConstraint} disabled={this.props.element.lmin & FIXED ? true : (this.props.element.lmin & CONSTRAINED ? false : true)} onClick={this.onClick} onFocus={this.onFocus} onBlur={this.onBlur }/>
                                </OverlayTrigger>
                            :
                                <Form.Control type="number" id={this.props.element.name + "_cmin"} className={value_class} value={this.props.element.lmin & CONSTRAINED ? (this.state.focused ? this.state.valueString : this.props.element.cmin.toString()) : ''} onChange={this.onChangeMinConstraint} disabled={this.props.element.lmin & FIXED ? true : (this.props.element.lmin & CONSTRAINED ? false : true)} onClick={this.onClick} onFocus={this.onFocus} onBlur={this.onBlur }/>
                            }
                        </InputGroup>
                        {this.props.element.cminchoices !== undefined && this.props.element.cminchoices.length > 0 ?
                        <Modal show={this.state.modal} className={this.props.className} size="lg" onHide={this.onCancel}>
                            <Modal.Header>
                                <Modal.Title>
                                    Functionally Determined Constraint Level (FDCL) - Set {this.props.element.name} Min Constraint
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table borderless="true">
                                    <tbody>
                                        <tr>
                                            <td colspan="2">
                                                Select constraint variable or enter constraint value.
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Variable:&nbsp;</td>
                                            <td>
                                                <InputGroup>
                                                    <ButtonGroup>
                                                        {this.props.element.cminchoices.map((e) => {return (
                                                            <Button key={e} variant="primary" onClick={(event) => {this.onVariableButton(event,e)}} style={{marginBotton: '5px'}} active={this.props.element.cminchoices[this.props.element.cminchoice] === e}>{e}</Button>
                                                        );})}
                                                    </ButtonGroup>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Value:&nbsp;</td>
                                            <td>
                                                <InputGroup>
                                                    <Form.Control type="number" id={this.props.element.name + "_cmin"} className="text-right" value={this.state.focused ? this.state.valueString : this.props.element.cmin.toString()} onChange={this.onChangeValue} />
                                                    <Button variant="primary" onClick={this.onEnterButton}>Enter</Button>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                            </Modal.Footer>
                        </Modal> : ''}
                    </td>
                    <td className={"text-right align-middle small " + (this.props.system_controls.show_violations ? "" : "d-none")} colSpan="1">
                        {this.props.element.lmin & FIXED ? '' : (this.props.element.lmin & CONSTRAINED ? (this.props.element.vmin*100.0).toFixed(1) + '%' : '')}
                    </td>
                </tr>
            </tbody>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolConstraint: changeSymbolConstraint,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMinRowIndependentVariable);
