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

class ConstraintsMaxRowDependentVariable extends Component {

    constructor(props) {
//        console.log("In ConstraintsMaxRowDependentVariable.constructor props=",props);
        super(props);
        this.onChangeValidMaxConstraint = this.onChangeValidMaxConstraint.bind(this);
        this.onChangeInvalidMaxConstraint = this.onChangeInvalidMaxConstraint.bind(this);
        this.onSetFlagMaxConstrained = this.onSetFlagMaxConstrained.bind(this)
        this.onResetFlagMaxConstrained = this.onResetFlagMaxConstrained.bind(this)
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

    onSetFlagMaxConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
        logValue(this.props.element.name,'Enabled','MaxConstraintFlag',false);
    }

    onResetFlagMaxConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
        logValue(this.props.element.name,'Disabled','MaxConstraintFlag',false);
    }

    onChangeValidMaxConstraint(event) {
//        console.log("In ConstraintMaxRowDependentVariable.onChangeValidMaxConstraint event.target.value=", event.target.value);
        var value = parseFloat(event.target.value);
        if (this.props.element.lmax & FIXED) {
            this.props.changeSymbolConstraint(this.props.element.name, MIN, value); // Update the model
            logValue(this.props.element.name,event.target.value,'Max&MinConstraint');
        } else {
            logValue(this.props.element.name,event.target.value,'MaxConstraint');
        }
        this.props.changeSymbolConstraint(this.props.element.name, MAX, value); // Update the model
        this.props.onChangeValid();
    }

    onChangeInvalidMaxConstraint(event) {
//        console.log("In ConstraintMaxRowDependentVariable.onChangeInvalidMaxConstraint event.target.value=", event.target.value);
        this.props.onChangeInvalid();
    }

    onClick(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onClick event.target.value=",event.target.value);
        // Show modal only if there are cmaxchoices
        if (this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0) {
            this.setState({
                valueString: this.props.element.cmax.toString(), // Update the display
                modal: !this.state.modal,
            });
        }
    }

    onChangeValidValue(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onChangeValidValue event.target.value=",event.target.value);
        this.setState({
            valueString: event.target.value,
            isInvalidValue: false,
        });
        this.props.onChangeValid(event);
    }

    onChangeInvalidValue(event) {
//        console.log("In ConstraintMaxRowDependentVariable.onChangeInvalidValue event=",event);
        this.setState({
            isInvalidValue: true,
        });
        this.props.onChangeInvalid(event);
    }

    onEnterButton(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onEnterButton event.target.value=",event.target.value);
        this.setState({
            modal: !this.state.modal
        });
        var value = parseFloat(this.state.valueString);
        if (this.props.element.lmax & FIXED) {
            this.props.resetSymbolFlag(this.props.element.name, MIN, FDCL);
            this.props.changeSymbolConstraint(this.props.element.name, MIN, value);
        }
        this.props.resetSymbolFlag(this.props.element.name, MAX, FDCL);
        this.props.changeSymbolConstraint(this.props.element.name, MAX, value);
    }

    onVariableButton(event, source_name) {
//        console.log("In ConstraintsMaxRowDependentVariable.onVariableButton event.target.value=",event.target.value," source_name=",source_name);
        this.setState({
            modal: !this.state.modal
        });
        if (this.props.element.lmax & FIXED) {
            this.props.setSymbolFlag(this.props.element.name, MIN, FDCL, source_name);
        }
        this.props.setSymbolFlag(this.props.element.name, MAX, FDCL, source_name);
    }

    onCancel(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onCancel event.target.value=",event.target.value);
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In ConstraintsMaxRowDependentVariable.render this=',this);
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var results = getAlertsByName(this.props.element.name+' MAX');
        var className = results.className;
        var icon_alerts = results.alerts;
        return (
            <tbody>
                <tr key={this.props.element.name}>
                    <td className="align-middle d-lg-none" id={'dependent_variable_max_constrain_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip className="d-lg-none">{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                                <InputGroup.Text>
                                    <Form.Check className='form-check' type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetFlagMaxConstrained : this.onSetFlagMaxConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                                </InputGroup.Text>
                            <FormControlTypeNumber id={this.props.element.name + "_cmax"} icon_alerts={icon_alerts} className={className} value={this.props.element.cmax} validmin={this.props.element.validmin} validmax={this.props.element.validmax} disabled={this.props.element.lmax & FIXED || this.props.element.lmax & CONSTRAINED ? false : true} disabledText={this.props.element.lmax & CONSTRAINED ? false : true} onChangeValid={this.onChangeValidMaxConstraint} onChangeInvalid={this.onChangeInvalidMaxConstraint} onClick={this.onClick}/>
                        </InputGroup>
                        {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ?
                        <Modal show={this.state.modal} size="lg" onHide={this.onCancel}>
                            <Modal.Header closeButton>
                                <Modal.Title>
                                    Functionally Determined Constraint Level (FDCL) - Set {this.props.element.name} Max Constraint
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
                                                        {this.props.element.cmaxchoices.map((e) => {return (
                                                            <Button key={e} variant="primary" onClick={(event) => {this.onVariableButton(event,e)}} style={{marginBotton: '5px'}} active={this.props.element.cmaxchoices[this.props.element.cmaxchoice] === e}>{e}</Button>
                                                        );})}
                                                    </ButtonGroup>
                                                </InputGroup>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Value:&nbsp;</td>
                                            <td>
                                                <InputGroup>
                                                    <FormControlTypeNumber id={this.props.element.name + "_cmax"} className={className} value={this.props.element.cmax} validmin={this.props.element.validmin} validmax={this.props.element.validmax} onChangeValid={this.onChangeValidValue} onChangeInvalid={this.onChangeInvalidValue} />
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
                        {this.props.system_controls.show_violations === 1 && this.props.element.vmax <= 0 ?
                            ''
                            : (this.props.element.lmax & FIXED ? 
                                (this.props.element.vmax*100.0).toODOPPrecision() 
                                : (this.props.element.lmax & CONSTRAINED ? 
                                    (this.props.element.vmax*100.0).toODOPPrecision()
                                    : ''))}
                    </td>
                </tr>
            </tbody>
        );
    }
}

ConstraintsMaxRowDependentVariable.propTypes = {
    element: PropTypes.object,
    onChangeValid: PropTypes.func,
    onChangeInvalid: PropTypes.func,
}

ConstraintsMaxRowDependentVariable.defaultProps = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintsMaxRowDependentVariable);
