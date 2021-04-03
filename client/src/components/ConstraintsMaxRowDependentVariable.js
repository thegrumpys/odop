import React, { Component } from 'react';
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { logValue } from '../logUsage';

class ConstraintsMaxRowDependentVariable extends Component {

    constructor(props) {
        super(props);
        this.onChangeDependentVariableMaxConstraint = this.onChangeDependentVariableMaxConstraint.bind(this);
        this.onSetDependentVariableFlagMaxConstrained = this.onSetDependentVariableFlagMaxConstrained.bind(this)
        this.onResetDependentVariableFlagMaxConstrained = this.onResetDependentVariableFlagMaxConstrained.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onEnterButton = this.onEnterButton.bind(this);
        this.onVariableButton = this.onVariableButton.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false, // Default: do not display
        };
    }

    onSetDependentVariableFlagMaxConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
        logValue(this.props.element.name,'Enabled','MaxConstraint');
    }

    onResetDependentVariableFlagMaxConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
        logValue(this.props.element.name,'Disabled','MaxConstraint');
    }

    onChangeDependentVariableMaxConstraint(event) {
        if (this.props.element.lmax & FIXED) {
            this.props.changeSymbolConstraint(this.props.element.name, MIN, parseFloat(event.target.value));
            logValue(this.props.element.name,event.target.value,'MinConstraint');
        }
        this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(event.target.value));
        logValue(this.props.element.name,event.target.value,'MaxConstraint');
    }

    onClick(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onClick event=",event);
        // Show modal only if there are cmaxchoices
        if (this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0) {
            this.setState({
                modal: !this.state.modal,
                value: this.props.element.lmax & CONSTRAINED ? this.props.element.cmax : 0
            });
        }
    }

    onChangeValue(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onChangeValue event=",event);
        this.setState({
            value: event.target.value
        });
    }

    onEnterButton(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onEnterButton event=",event);
        this.setState({
            modal: !this.state.modal
        });
        if (this.props.element.lmax & FIXED) {
            this.props.resetSymbolFlag(this.props.element.name, MIN, FDCL);
            this.props.changeSymbolConstraint(this.props.element.name, MIN, parseFloat(this.state.value));
        }
        this.props.resetSymbolFlag(this.props.element.name, MAX, FDCL);
        this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(this.state.value));
    }

    onVariableButton(event, source_name) {
//        console.log("In ConstraintsMaxRowDependentVariable.onVariableButton event=",event," source_name=",source_name);
        this.setState({
            modal: !this.state.modal
        });
        if (this.props.element.lmax & FIXED) {
            this.props.setSymbolFlag(this.props.element.name, MIN, FDCL, source_name);
        }
        this.props.setSymbolFlag(this.props.element.name, MAX, FDCL, source_name);
    }

    onCancel(event) {
//        console.log("In ConstraintsMaxRowDependentVariable.onCancel event=",event);
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
//        console.log('In ConstraintsMaxRowDependentVariable.render this=',this);
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var value_class = 'text-right ';
        if (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) {
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
                    <td className="align-middle d-lg-none" id={'dependent_variable_max_constrain_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip className="d-lg-none">{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <Form.Check type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetDependentVariableFlagMaxConstrained : this.onSetDependentVariableFlagMaxConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>{this.props.element.lmax & FDCL ? 'FDCL =' + this.props.element.cmaxchoices[this.props.element.cmaxchoice] : '=' + this.props.element.cmax + ' (non-FDCL)'}</Tooltip>}>
                                    <Form.Control type="number" id={this.props.element.name + "_cmax"} className={value_class} value={this.props.element.lmax & CONSTRAINED ? this.props.element.cmax : ''} onChange={this.onChangeDependentVariableMaxConstraint} disabled={this.props.element.lmax & FIXED || this.props.element.lmax & CONSTRAINED ? false : true} onClick={this.onClick} />
                                </OverlayTrigger>
                            :
                                <Form.Control type="number" id={this.props.element.name + "_cmax"} className={value_class} value={this.props.element.lmax & CONSTRAINED ? this.props.element.cmax : ''} onChange={this.onChangeDependentVariableMaxConstraint} disabled={this.props.element.lmax & FIXED || this.props.element.lmax & CONSTRAINED ? false : true} onClick={this.onClick} />
                            }
                        </InputGroup>
                        {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ? <Modal show={this.state.modal} className={this.props.className} size="lg" onHide={this.onCancel}>
                            <Modal.Header>
                                <Modal.Title>
                                    Functionally Determined Constraint Level (FDCL) - Set {this.props.element.name} Max Constraint
                                </Modal.Title>
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
                                                    <Form.Control type="number" id={this.props.element.name + "_cmax"} className="text-right" value={this.state.value} onChange={this.onChangeValue} />
                                                    <Button variant="primary" onClick={this.onEnterButton}>Enter</Button>
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
                    <td className={"text-right align-middle small " + (this.props.system_controls.show_violations ? "" : "d-none")} colSpan="1">
                        {this.props.element.lmax & FIXED ? (this.props.element.vmax*100.0).toFixed(1) : (this.props.element.lmax & CONSTRAINED ? (this.props.element.vmax*100.0).toFixed(1) + '%' : '')}
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintsMaxRowDependentVariable);
