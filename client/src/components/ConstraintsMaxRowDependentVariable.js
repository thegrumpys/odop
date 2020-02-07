import React, { Component } from 'react';
import { InputGroup, ButtonGroup, Tooltip, Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { evaluateConstraintName, evaluateConstraintValue } from '../store/middleware/evaluateConstraint';

class ConstraintsMaxRowDependentVariable extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeDependentVariableConstraint = this.onChangeDependentVariableConstraint.bind(this);
        this.onSetDependentVariableFlagConstrained = this.onSetDependentVariableFlagConstrained.bind(this)
        this.onResetSymbolFlagConstrained = this.onResetSymbolFlagConstrained.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onEnterValue = this.onEnterValue.bind(this);
        this.onSelectVariable = this.onSelectVariable.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false, // Default: do not display
        };
    }
    
    onSetDependentVariableFlagConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }
    
    onResetSymbolFlagConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }
    
    onChangeDependentVariableConstraint(event) {
        if (this.props.element.lmax & FIXED) {
            this.props.changeSymbolConstraint(this.props.element.name, MIN, parseFloat(event.target.value));
        }
        this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(event.target.value));
    }
    
    onClick(event) {
//        console.log("In onClick event=",event);
        // Show modal only if there are cmaxchoices
        if (this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0) {
            this.setState({
                modal: !this.state.modal,
                value: this.props.element.lmax & CONSTRAINED ? evaluateConstraintValue(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) : 0
            });
        }
    }
    
    onChangeValue(event) {
//        console.log("In onChangeValue event=",event);
        this.setState({
            value: event.target.value
        });
    }
    
    onEnterValue(event) {
//        console.log("In onEnterValue event=",event);
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
      
    onSelectVariable(event, name) {
//        console.log("In onSelectVariable event=",event," name=",name);
        this.setState({
            modal: !this.state.modal
        });
        if (this.props.element.lmax & FIXED) {
            this.props.setSymbolFlag(this.props.element.name, MIN, FDCL);
            this.props.symbol_table.forEach((element, i) => {
                if (element.name === name) {
//                    console.log('@In onSelectVariable element=',element,' i=',i);
                    this.props.changeSymbolConstraint(this.props.element.name, MIN, i);
                }
            })
        }
        this.props.setSymbolFlag(this.props.element.name, MAX, FDCL);
        this.props.symbol_table.forEach((element, i) => {
            if (element.name === name) {
//                console.log('In onSelectVariable element=',element,' i=',i);
                this.props.changeSymbolConstraint(this.props.element.name, MAX, i);
            }
        })
    }
    
    onCancel(event) {
//        console.log("In onCancel event=",event);
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.element.lmax & FIXED) {
            cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-right text-info border-info font-weight-bold' : 'text-right';
        } else {
            if (this.props.objective_value < this.props.system_controls.objmin) {
                cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-right text-low-danger border-low-danger' : 'text-right';
            } else {
                cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-right text-danger border-danger font-weight-bold' : 'text-right';
            }
        }
        // =======================================
        // Table Row
        // =======================================
        return (
            <React.Fragment>
                <tr key={this.props.element.name}>
                    <td className="align-middle d-lg-none" id={'dependent_variable_max_constrain_'+this.props.index}>{this.props.element.name}</td>
                    { this.props.element.tooltip !== undefined && <Tooltip class="d-lg-none" placement="top" target={'dependent_variable_max_constrain_'+this.props.index}>{this.props.element.tooltip}</Tooltip>}
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <Form.Check type="checkbox" addon aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetSymbolFlagConstrained : this.onSetDependentVariableFlagConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control type="number" id={this.props.element.name + "_cmax"} className={cmax_class} value={this.props.element.lmax & CONSTRAINED ? evaluateConstraintValue(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) : ''} onChange={this.onChangeDependentVariableConstraint} disabled={this.props.element.lmax & FIXED || this.props.element.lmax & CONSTRAINED ? false : true} onClick={this.onClick} />
                            {this.props.element.lmax & FDCL ? <Tooltip placement="top" target={this.props.element.name + "_cmax"}>{evaluateConstraintName(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax)}</Tooltip> : ''}
                        </InputGroup>
                        {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ? <Modal show={this.state.modal} className={this.props.className} size="lg">
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
                                                            <Button key={e} variant="primary" onClick={(event) => {this.onSelectVariable(event,e)}} style={{marginBotton: '5px'}} active={evaluateConstraintName(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) === e}>{e}</Button>
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
                    <td className={"text-right align-middle small " + (this.props.system_controls.show_violations ? "" : "d-none")} colSpan="1">
                        {this.props.element.lmax & FIXED ? (this.props.element.vmax*100.0).toFixed(1) : (this.props.element.lmax & CONSTRAINED ? (this.props.element.vmax*100.0).toFixed(1) + '%' : '')}
                    </td>
                </tr>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    symbol_table: state.symbol_table,
    system_controls: state.system_controls,
    objective_value: state.result.objective_value
});

const mapDispatchToProps = {
    changeSymbolConstraint: changeSymbolConstraint,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintsMaxRowDependentVariable);
