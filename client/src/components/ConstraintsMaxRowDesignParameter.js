import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { MAX, FIXED, CONSTRAINED } from '../store/actionTypes';
import { changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag } from '../store/actionCreators';

class ConstraintMaxRowDesignParameter extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDesignParameterConstraint = this.onChangeDesignParameterConstraint.bind(this);
        this.onSetDesignParameterFlagConstrained = this.onSetDesignParameterFlagConstrained.bind(this)
        this.onResetDesignParameterFlagConstrained = this.onResetDesignParameterFlagConstrained.bind(this)
    }
    
    onSetDesignParameterFlagConstrained(event) {
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MAX, CONSTRAINED);
    }
    
    onResetDesignParameterFlagConstrained(event) {
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MAX, CONSTRAINED);
    }
    
    onChangeDesignParameterConstraint(event) {
        this.props.changeDesignParameterConstraint(this.props.design_parameter.name, MAX, parseFloat(event.target.value));
    }
    
    render() {
        // =======================================
        // Constraint Maximum Column
        // =======================================
        var cmax_class;
        if (this.props.objective_value < this.props.system_controls.objmin) {
            cmax_class = (this.props.design_parameter.lmax & CONSTRAINED && this.props.design_parameter.vmax > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
        } else {
            cmax_class = (this.props.design_parameter.lmax & CONSTRAINED && this.props.design_parameter.vmax > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
        }
        // =======================================
        // Table Row
        // =======================================
        return (
            <tr key={this.props.design_parameter.name}>
                <td className="align-middle" colSpan="2">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" aria-label="Checkbox for maximum value" checked={this.props.design_parameter.lmax & CONSTRAINED} onChange={this.props.design_parameter.lmax & CONSTRAINED ? this.onResetDesignParameterFlagConstrained : this.onSetDesignParameterFlagConstrained} disabled={this.props.design_parameter.lmax & FIXED ? true : false} />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input className={cmax_class} type="number" value={this.props.design_parameter.cmax} onChange={this.onChangeDesignParameterConstraint} disabled={this.props.design_parameter.lmax & FIXED ? true : (this.props.design_parameter.lmax & CONSTRAINED ? false : true)} />
                    </InputGroup>
                </td>
                <td className="text-right align-middle" colSpan="1">
                    {this.props.design_parameter.lmax & FIXED ? '' : (this.props.design_parameter.lmax & CONSTRAINED ? (this.props.design_parameter.vmax*100.0).toFixed(1) + '%' : '')}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.system_controls,
    objective_value: state.result.objective_value
});

const mapDispatchToProps = {
    changeDesignParameterConstraint: changeDesignParameterConstraint,
    setDesignParameterFlag: setDesignParameterFlag,
    resetDesignParameterFlag: resetDesignParameterFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMaxRowDesignParameter);
