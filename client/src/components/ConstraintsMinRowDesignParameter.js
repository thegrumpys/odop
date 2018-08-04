import React from 'react';
import { InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { MIN, FIXED, CONSTRAINED } from '../store/actionTypes';
import { changeDesignParameterConstraint, setDesignParameterFlag, resetDesignParameterFlag } from '../store/actionCreators';

class ConstraintMinRowDesignParameter extends React.Component {
    
    constructor(props) {
        super(props);
        this.onChangeDesignParameterConstraint = this.onChangeDesignParameterConstraint.bind(this);
        this.onSetDesignParameterFlagConstrained = this.onSetDesignParameterFlagConstrained.bind(this)
        this.onResetDesignParameterFlagConstrained = this.onResetDesignParameterFlagConstrained.bind(this)
    }
    
    onSetDesignParameterFlagConstrained(event) {
        this.props.setDesignParameterFlag(this.props.design_parameter.name, MIN, CONSTRAINED);
    }
    
    onResetDesignParameterFlagConstrained(event) {
        this.props.resetDesignParameterFlag(this.props.design_parameter.name, MIN, CONSTRAINED);
    }
    
    onChangeDesignParameterConstraint(event) {
        this.props.changeDesignParameterConstraint(this.props.design_parameter.name, MIN, parseFloat(event.target.value));
    }
    
    render() {
        // =======================================
        // Constraint Minimum Column
        // =======================================
        var cmin_class;
        if (this.props.objective_value < this.props.system_controls.objmin) {
            cmin_class = (this.props.design_parameter.lmin & CONSTRAINED && this.props.design_parameter.vmin > 0.0) ? 'text-low-danger text-right border-low-danger' : 'text-right';
        } else {
            cmin_class = (this.props.design_parameter.lmin & CONSTRAINED && this.props.design_parameter.vmin > 0.0) ? 'text-danger text-right font-weight-bold border-danger' : 'text-right';
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
                                <Input addon type="checkbox" aria-label="Checkbox for minimum value" checked={this.props.design_parameter.lmin & CONSTRAINED} onChange={this.props.design_parameter.lmin & CONSTRAINED ? this.onResetDesignParameterFlagConstrained : this.onSetDesignParameterFlagConstrained} disabled={this.props.design_parameter.lmin & FIXED ? true : false} />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input className={cmin_class} type="number" value={this.props.design_parameter.cmin} onChange={this.onChangeDesignParameterConstraint} disabled={this.props.design_parameter.lmin & FIXED ? true : (this.props.design_parameter.lmin & CONSTRAINED ? false : true)} />
                    </InputGroup>
                </td>
                <td className="text-right align-middle" colSpan="1">
                    {this.props.design_parameter.lmin & FIXED ? '' : (this.props.design_parameter.lmin & CONSTRAINED ? (this.props.design_parameter.vmin*100.0).toFixed(1) + '%' : '')}
                </td>
            </tr>
        );
    }
}

const mapStateToProps = state => ({
    system_controls: state.system_controls
});

const mapDispatchToProps = {
    changeDesignParameterConstraint: changeDesignParameterConstraint,
    setDesignParameterFlag: setDesignParameterFlag,
    resetDesignParameterFlag: resetDesignParameterFlag
};

export default connect(mapStateToProps, mapDispatchToProps)(ConstraintMinRowDesignParameter);
