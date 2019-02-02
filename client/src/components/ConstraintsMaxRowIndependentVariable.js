import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, UncontrolledTooltip, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { MAX, FIXED, CONSTRAINED, FUNCTION } from '../store/actionTypes';
import { changeSymbolConstraint, setSymbolFlag, resetSymbolFlag } from '../store/actionCreators';
import { evaluateConstraintName, evaluateConstraintValue } from '../store/middleware/evaluateConstraint';

class ConstraintMaxRowIndependentVariable extends React.Component {
    
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
//      console.log("In onChangeValue event=",event);
      this.setState({
          value: event.target.value
      });
    }
    
    onEnterValue(event) {
//        console.log("In onEnterValue event=",event);
        this.setState({
            modal: !this.state.modal
        });
        this.props.resetSymbolFlag(this.props.element.name, MAX, FUNCTION);
        this.props.changeSymbolConstraint(this.props.element.name, MAX, parseFloat(this.state.value));
    }
      
    onSelectVariable(event, name) {
//        console.log("In onSelectVariable event=",event," name=",name);
        this.setState({
            modal: !this.state.modal
        });
        this.props.setSymbolFlag(this.props.element.name, MAX, FUNCTION);
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
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.objective_value < this.props.system_controls.objmin) {
            cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
        } else {
            cmax_class = (this.props.element.lmax & CONSTRAINED && this.props.element.vmax > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
        }
        // =======================================
        // Table Row
        // =======================================
        return (
            <React.Fragment>
                <tr key={this.props.element.name}>
                    <td className="align-middle" colSpan="2">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.element.lmax & CONSTRAINED} onChange={this.props.element.lmax & CONSTRAINED ? this.onResetIndependentVariableFlagConstrained : this.onSetIndependentVariableFlagConstrained} disabled={this.props.element.lmax & FIXED ? true : false} />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input id={this.props.element.name + "_cmax"} className={cmax_class} type="number" value={this.props.element.lmax & CONSTRAINED ? evaluateConstraintValue(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) : ''} onChange={this.onChangeIndependentVariableConstraint} disabled={this.props.element.lmax & FIXED ? true : (this.props.element.lmax & CONSTRAINED ? false : true)} />
                            {this.props.element.lmax & FUNCTION ? <UncontrolledTooltip placement="top" target={this.props.element.name + "_cmax"}>{evaluateConstraintName(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax)}</UncontrolledTooltip> : ''}
                        </InputGroup>
                    </td>
                    <td className="text-right align-middle" colSpan="1">
                        {this.props.element.lmax & FIXED ? '' : (this.props.element.lmax & CONSTRAINED ? (this.props.element.vmax*100.0).toFixed(1) + '%' : '')}
                    </td>
                </tr>
                {this.props.element.cmaxchoices !== undefined && this.props.element.cmaxchoices.length > 0 ? <Modal isOpen={this.state.modal} className={this.props.className} size="lg">
                    <ModalHeader>
                        Set {this.props.element.name} Max Constraint
                    </ModalHeader>
                    <ModalBody>
                        Select constraint variable or enter constraint value.
                        <table>
                            <tr>
                                <td>Variable:&nbsp;</td>
                                <td>
                                    <InputGroup>
                                        <ButtonGroup>
                                            {this.props.element.cmaxchoices.map((e) => {return (
                                                <Button key={e} color="primary" onClick={(event) => {this.onSelectVariable(event,e)}} style={{marginBotton: '5px'}} active={evaluateConstraintName(this.props.symbol_table,this.props.element.lmax,this.props.element.cmax) == e}>{e}</Button>
                                            );})}
                                        </ButtonGroup>
                                    </InputGroup>
                                </td>
                            </tr>
                            <tr>
                                <td>Value:&nbsp;</td>
                                <td>
                                    <InputGroup>
                                        <Input id={this.props.element.name + "_cmax"} className="text-right" type="number" value={this.state.value} onChange={this.onChangeValue} />
                                        <Button color="primary" onClick={this.onEnterValue}>Enter</Button>
                                    </InputGroup>
                                </td>
                            </tr>
                        </table>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal> : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMaxRowIndependentVariable);
