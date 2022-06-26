import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { logValue } from '../logUsage';
import FormControlTypeNumber from './FormControlTypeNumber';
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

class ConstraintMinRowIndependentVariable extends Component {

    constructor(props) {
//        console.log("In ConstraintMinRowIndependentVariable.constructor props=",props);
        super(props);
        this.onChangeValidMinConstraint = this.onChangeValidMinConstraint.bind(this);
        this.onChangeInvalidMinConstraint = this.onChangeInvalidMinConstraint.bind(this);
        this.onSetFlagMinConstrained = this.onSetFlagMinConstrained.bind(this)
        this.onResetFlagMinConstrained = this.onResetFlagMinConstrained.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onChangeValidValue = this.onChangeValidValue.bind(this);
        this.onChangeInvalidValue = this.onChangeInvalidValue.bind(this);
        this.onEnterButton = this.onEnterButton.bind(this);
        this.onVariableButton = this.onVariableButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = { // Always a "number"
            modal: false, // Default: do not display modal
            isInvalidValue: false,
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

    onChangeValidMinConstraint(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onChangeValidMinConstraint event.target.value=", event.target.value);
        var value = parseFloat(event.target.value);
        this.props.changeSymbolConstraint(this.props.element.name, MIN, value); // Update the model
        logValue(this.props.element.name,event.target.value,'MinConstraint');
        this.props.onChangeValid();
    }
    
    onChangeInvalidMinConstraint(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onChangeInvalidMinConstraint event.target.value=", event.target.value);
        this.props.onChangeInvalid();
    }

    onClick(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onClick event.target.value=",event.target.value);
        // Show modal only if there are cminchoices
        if (this.props.element.cminchoices !== undefined && this.props.element.cminchoices.length > 0) {
            this.setState({
                valueString: this.props.element.cmin.toString(), // Update the display
                modal: !this.state.modal,
            });
        }
    }

    onChangeValidValue(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onChangeValidValue event=",event);
        this.setState({
            valueString: event.target.value,
            isInvalidValue: false,
        });
        this.props.onChangeValid(event);
    }

    onChangeInvalidValue(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onChangeInvalidValue event=",event);
        this.setState({
            isInvalidValue: true,
        });
        this.props.onChangeInvalid(event);
    }

    onEnterButton(event) {
//        console.log("In ConstraintMinRowIndependentVariable.onEnterButton event.target.value=",event.target.value);
        this.setState({
            modal: !this.state.modal
        });
        var value = parseFloat(this.state.valueString);
        this.props.resetSymbolFlag(this.props.element.name, MIN, FDCL);
        this.props.changeSymbolConstraint(this.props.element.name, MIN, value); // Update the model
        if (this.props.element.lmin & FIXED) {
            this.props.resetSymbolFlag(this.props.element.name, MAX, FDCL);
            this.props.changeSymbolConstraint(this.props.element.name, MAX, value); // Update the model
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
        var results = getAlertsByName(this.props.element.name+' MIN');
        var className = results.className;
        var icon_alerts = results.alerts;
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
                            <FormControlTypeNumber id={this.props.element.name + "_cmin"} icon_alerts={icon_alerts} className={className} value={this.props.element.cmin} validmin={this.props.element.validmin} validmax={this.props.element.validmax} disabled={this.props.element.lmin & FIXED ? true : (this.props.element.lmin & CONSTRAINED ? false : true)} disabledText={this.props.element.lmin & CONSTRAINED ? false : true} onChangeValid={this.onChangeValidMinConstraint} onChangeInvalid={this.onChangeInvalidMinConstraint} onClick={this.onClick}/>
                        </InputGroup>
                        {this.props.element.cminchoices !== undefined && this.props.element.cminchoices.length > 0 ?
                        <Modal show={this.state.modal} size="lg" onHide={this.onCancel}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Functionally Determined Constraint Level (FDCL) - Set {this.props.element.name} Min Constraint
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Table borderless="true">
                                    <tbody>
                                        <tr>
                                            <td colSpan="2">
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
                                                    <FormControlTypeNumber id={this.props.element.name + "_cmin"} className={className} value={this.props.element.cmin} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} />
                                                    <Button variant="primary" disabled={this.state.isInvalidValue} onClick={this.onEnterButton}>Enter</Button>
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
                    <td className={"text-right align-middle small " + className + (this.props.system_controls.show_violations === 0 ? "d-none" : "")} colSpan="1">
                        {this.props.system_controls.show_violations === 1 && this.props.element.vmin <= 0 ?
                            ''
                            : (this.props.element.lmin & FIXED ? 
                                '' 
                                : (this.props.element.lmin & CONSTRAINED ? 
                                    (this.props.element.vmin*100.0).toODOPPrecision()
                                    : ''))}
                    </td>
                </tr>
            </tbody>
        );
    }
}

ConstraintMinRowIndependentVariable.propTypes = {
    element: PropTypes.object,
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
}

ConstraintMinRowIndependentVariable.defaultProps = {
    element: null,
    onChangeValid: (()=>{}),
    onChangeInvalid: (()=>{}),
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
