import React, { Component } from 'react';
import { InputGroup, ButtonGroup, OverlayTrigger, Tooltip, Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MAX, FIXED, CONSTRAINED, FDCL } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { evaluateConstraintName, evaluateConstraintValue } from '../store/middleware/evaluateConstraint';

class ConstraintMaxRowIndependentVariable extends Component {
    
    constructor(props) {
        super(props);
        this.onChangeIndependentVariableConstraint = this.onChangeIndependentVariableConstraint.bind(this);
        this.onSetIndependentVariableFlagConstrained = this.onSetIndependentVariableFlagConstrained.bind(this)
        this.onResetIndependentVariableFlagConstrained = this.onResetIndependentVariableFlagConstrained.bind(this)
        this.onClick = this.onClick.bind(this);
        this.onChangeValue = this.onChangeValue.bind(this);
        this.onEnterValue = this.onEnterValue.bind(this);
        this.onSelectVariable = this.onSelectVariable.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.state = {
            modal: false, // Default: do not display
        };
    }
    
    onSetIndependentVariableFlagConstrained(event) {
        this.props.setSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }
    
    onResetIndependentVariableFlagConstrained(event) {
        this.props.resetSymbolFlag(this.props.element.name, MAX, CONSTRAINED);
    }
    
    onChangeIndependentVariableConstraint(event) {
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
        this.props.resetSymbolFlag(this.props.element.name, MAX, FDCL);
        this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(this.state.value));
    }
      
    onSelectVariable(event, name) {
//        console.log("In onSelectVariable event=",event," name=",name);
        this.setState({
            modal: !this.state.modal
        });
        this.props.setSymbolFlag(this.props.element.name, MAX, FDCL);
        this.props.symbol_table.forEach((element, i) => {
            if (element.name === name) {
//                console.log('@@@ element=',element,' i=',i);
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
        console.log('In ConstraintMaxRowIndependentVariable.render this.props=', this.props);
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.objective_value < this.props.system_controls.objmin) {
            cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-right text-low-danger border-low-danger' : 'text-right';
        } else {
            cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-right text-danger border-danger font-weight-bold' : 'text-right';
        }
        // =======================================
        // Table Row
        // =======================================
        return (
            <React.Fragment>
                <tr key={this.props.element.name}>
                    <td className="align-middle d-lg-none" id={'independent_variable_max_constrain_'+this.props.index}>
                        <OverlayTrigger placement="top" overlay={this.props.element.tooltip !== undefined && <Tooltip className="d-lg-none">{this.props.element.tooltip}</Tooltip>}>
                            <span>{this.props.element.name}</span>
                        </OverlayTrigger>
                    </td>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <Form.Check type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetIndependentVariableFlagConstrained : this.onSetIndependentVariableFlagConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            { this.props.element.lmax & FDCL ?
                                <OverlayTrigger placement="top" overlay={<Tooltip>={evaluateConstraintName(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax)}</Tooltip>}>
                                    <Form.Control type="number" id={this.props.element.name + "_cmax"} className={cmax_class} value={this.props.element.lmax & CONSTRAINED ? evaluateConstraintValue(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) : ''} onChange={this.onChangeIndependentVariableConstraint} disabled={this.props.element.lmax & FIXED ? true : (this.props.element.lmax & CONSTRAINED ? false : true)} onClick={this.onClick} />
                                </OverlayTrigger>
                            :
                                <Form.Control type="number" id={this.props.element.name + "_cmax"} className={cmax_class} value={this.props.element.lmax & CONSTRAINED ? evaluateConstraintValue(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) : ''} onChange={this.onChangeIndependentVariableConstraint} disabled={this.props.element.lmax & FIXED ? true : (this.props.element.lmax & CONSTRAINED ? false : true)} onClick={this.onClick} />
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
                        {this.props.element.lmax & FIXED ? '' : (this.props.element.lmax & CONSTRAINED ? (this.props.element.vmax*100.0).toFixed(1) + '%' : '')}
                    </td>
                </tr>
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
    changeSymbolConstraint: changeSymbolConstraint,
    setSymbolFlag: setSymbolFlag,
    resetSymbolFlag: resetSymbolFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMaxRowIndependentVariable);
