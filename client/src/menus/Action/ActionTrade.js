import PropTypes from 'prop-types';
import React from 'react';
import { DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { CONSTRAINED, MIN, MAX } from '../../store/actionTypes';
import { changeDesignParameterConstraint,
    saveDesignParameterValues,
    restoreDesignParameterValues,
    changeStateVariableConstraint, 
    changeResultTerminationCondition,
    search,
    trade } from '../../store/actionCreators';

class ActionTrade extends React.Component {
    constructor(props) {
        super(props);
        this.strategyToggle = this.strategyToggle.bind(this);
        this.onStrategyCancel = this.onStrategyCancel.bind(this);
        this.onStrategyExisting = this.onStrategyExisting.bind(this);
        this.onStrategyArbitrary = this.onStrategyArbitrary.bind(this);
        this.onStrategyProportional = this.onStrategyProportional.bind(this);
        this.onProportionalCancel = this.onProportionalCancel.bind(this);
        this.onProportionalContinue = this.onProportionalContinue.bind(this);
        this.onEstablishNo = this.onEstablishNo.bind(this);
        this.onEstablishYes = this.onEstablishYes.bind(this);
        this.state = {
                strategyModal: false,
                proportionalModal: false,
                establishModal: false
            };
    }
    
    //===========================================================
    // Trade Menu Item
    //===========================================================
    
    strategyToggle() {
        console.log('In strategyToggle');
        console.log('state=',this.state);
        const { store } = this.context;
        console.log('store=',store);
        var design = store.getState();
        var dp;
        var sv;
        var nviol = 0;
        var ldir = [];
        var vflag = [];
        this.props.saveDesignParameterValues();
        for (let i = 0; i < design.design_parameters.length; i++) {
            dp = design.design_parameters[i];
            if (dp.lmin & CONSTRAINED && dp.vmin > 0.0) {
                nviol++
                vflag[nviol - 1] = i;
                ldir[nviol - 1] = -1;
            } else if (dp.lmax & CONSTRAINED && dp.vmax > 0.0) {
                nviol++
                vflag[nviol - 1] = i;
                ldir[nviol - 1] = +1;
            }
        }
        for (let i = 0; i < design.state_variables.length; i++) {
            sv = design.state_variables[i];
            if (sv.lmin & CONSTRAINED && sv.vmin > 0.0) {
                nviol++
                vflag[nviol - 1] = i + design.design_parameters.length;
                ldir[nviol - 1] = -1;
            } else if (sv.lmax & CONSTRAINED && sv.vmax > 0.0) {
                nviol++
                vflag[nviol - 1] = i + design.design_parameters.length;
                ldir[nviol - 1] = +1;
            }
        }
        console.log('nviol=',nviol);
        console.log('vflag=',vflag);
        console.log('ldir=',ldir);
        if (design.result.objective_value <= design.system_controls.objmin || nviol === 0) {
            var ncode = 'OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE';
            this.props.changeResultTerminationCondition(ncode);
        } else {
            this.setState({
                strategyModal: !this.state.strategyModal,
                nviol: nviol,
                vflag: vflag,
                ldir: ldir
            });
        }
    }

    //===========================================================
    // Strategy Modal
    //===========================================================
    
    onStrategyCancel() { // Option 3
        console.log('In onStrategyCancel');
        console.log('state=',this.state);
//        const { store } = this.context;
//        console.log('store=',store);
//        var design = store.getState();
        var ncode = 'NO ACTION REQUESTED';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            strategyModal: !this.state.strategyModal
        });
    }

    onStrategyExisting() { // Option 2
        console.log('In onStrategyExisting');
        console.log('state=',this.state);
        const { store } = this.context;
        console.log('store=',store);
        var design = store.getState();
        var dp;
        var sv;
        var value;
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (this.state.ldir[i] < 0) {
                    value = dp.cmin + dp.vmin * dp.smin * this.state.ldir[i];
                    this.props.changeDesignParameterConstraint(dp.name, MIN, value);
                } else {
                    value = dp.cmax + dp.vmax * dp.smax * this.state.ldir[i];
                    this.props.changeDesignParameterConstraint(dp.name, MAX, value);
                }
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (this.state.ldir[i] < 0) {
                    value = sv.cmin + sv.vmin * sv.smin * this.state.ldir[i];
                    this.props.changeStateVariableConstraint(sv.name, MIN, value);
                } else {
                    value = sv.cmax + sv.vmax * sv.smax * this.state.ldir[i];
                    this.props.changeStateVariableConstraint(sv.name, MAX, value);
                }
            }
        }
        var ncode = 'CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            strategyModal: !this.state.strategyModal
        });
    }

    onStrategyArbitrary() { // Option 1
        console.log('In onStrategyArbitrary');
        console.log('state=',this.state);
//        const { store } = this.context;
//        console.log('store=',store);
//        var design = store.getState();
        var dir = [];
        this.commonProportionalOrArbitrary(dir);
    }

    onStrategyProportional() { // Option 0
        console.log('In onStrategyProportional');
        console.log('state=',this.state);
        const { store } = this.context;
        console.log('store=',store);
        var design = store.getState();
        var dp;
        var sv;
        var dir = [];
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (this.state.ldir[i] < 0)
                    dir[i] = this.state.ldir[i] * dp.vmin;
                else
                    dir[i] = this.state.ldir[i] * dp.vmax;
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (this.state.ldir[i] < 0)
                    dir[i] = this.state.ldir[i] * sv.vmin;
                else
                    dir[i] = this.state.ldir[i] * sv.vmax;
            }
        }
        this.commonProportionalOrArbitrary(dir);
    }
    
    commonProportionalOrArbitrary(dir) {
        /**
         * **** CREATE normalized VECTOR IN VIOLATED CONSTRAINT SPACE
         * *****
         */
        const { store } = this.context;
        console.log('store=',store);
        var design = store.getState();
        var dp;
        var sv;
        var temp2;
        var value = 0.0;
        var itemp = 0;
        var temp;
        for (let i = 0; i < this.state.nviol; i++) {
            temp2 = Math.abs(dir[i]);
            if (temp2 > value) {
                value = temp2;
                itemp = i;
            }
        }
        if (value < design.system_controls.smallnum) {
            // TODO: output failure message and keep strategy modal visible
            return;
        }
        var tc = [];
        for (let i = 0; i < this.state.nviol; i++) {
            dir[i] = dir[i] / value;
            let j = this.state.vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (this.state.ldir[i] < 0)
                    tc[i] = dp.cmin;
                else
                    tc[i] = dp.cmax;
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (this.state.ldir[i] < 0)
                    tc[i] = sv.cmin;
                else
                    tc[i] = sv.cmax;
            }
        }
        var rk1;
        var smallest;
        var bigest;
        var defaultest;
//          c1 = 0.0
        rk1 = design.result.objective_value;
        /* estimate best step size */
        smallest = 1.0;
        bigest = 0.0;
        for (let i = 0; i < this.state.nviol; i++) {
            temp2 = Math.abs(dir[i]);
            let j = this.state.vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (this.state.ldir[i] < 0)
                    if (temp2 > design.system_controls.smallnum)
                        temp = dp.vmin / temp2;
                    else
                        temp = dp.vmin;
                else if (temp2 > design.system_controls.smallnum)
                    temp = dp.vmax / temp2;
                else
                    temp = dp.vmax;
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (this.state.ldir[i] < 0)
                    if (temp2 > design.system_controls.smallnum)
                        temp = dp.vmin / temp2;
                    else
                        temp = dp.vmin;
                else if (temp2 > design.system_controls.smallnum)
                    temp = dp.vmax / temp2;
                else
                    temp = dp.vmax;
            }
            if (temp > design.system_controls.smallnum && temp < smallest)
                smallest = temp;
            if (temp > bigest)
                bigest = temp;
        }
        let j = this.state.vflag[itemp];
        if (j < design.design_parameters.length) {
            dp = design.design_parameters[j];
            if (this.state.ldir[itemp] < 0)
                defaultest = 0.90 * dp.vmin;
            else
                defaultest = 0.90 * dp.vmax;
        } else {
            sv = design.state_variables[j - design.design_parameters.length];
            if (this.state.ldir[itemp] < 0)
                defaultest = 0.90 * sv.vmin;
            else
                defaultest = 0.90 * sv.vmax;
        }
        if (defaultest < 0.01)
            defaultest = 0.01;
        this.setState({
            strategyModal: !this.state.strategyModal,
            proportionalModal: !this.state.proportionalModal,
            dir: dir,
            tc: tc,
            rk1: rk1,
            smallest: smallest,
            bigest: bigest,
            defaultest: defaultest
        });
    }

    //===========================================================
    // Proportional Modal
    //===========================================================
    
    onProportionalCancel() {
        console.log('In onProportionalCancel');
        console.log('state=',this.state);
//        const { store } = this.context;
//        console.log('store=',store);
//        var design = store.getState();
        this.setState({
            proportionalModal: !this.state.proportionalModal
        });
        var ncode = 'NO ACTION REQUESTED';
        this.props.changeResultTerminationCondition(ncode);
    }
    
    onProportionalContinue() {
        console.log('In onProportionalContinue');
        console.log('state=',this.state);
        const { store } = this.context;
        console.log('store=',store);
        var design = store.getState();
        var dp;
        var sv;
        var c2;
        var c3;
        var rk3;
        var value;
        var expSize = undefined;
        if (expSize === undefined)
            c3 = this.state.defaultest * 100.0;
        else {
            c3 = parseFloat(expSize);
        }
        if (c3 < design.system_controls.smallnum) {
            // TODO: output failure message and keep proportional modal visible
            return;
        }
        c3 = c3 / 100.0;
        // TAKE FIRST EXPLORATORY RELAXATION STEP
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (this.state.ldir[i] < 0) {
                    value = dp.cmin + this.state.dir[i] * dp.cmin * c3;
                    this.props.changeDesignParameterConstraint(dp.name, MIN, value);
                } else {
                    value = dp.cmax + this.state.dir[i] * dp.cmax * c3;
                    this.props.changeDesignParameterConstraint(dp.name, MAX, value);
                }
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (this.state.ldir[i] < 0) {
                    value = sv.cmin + this.state.dir[i] * sv.cmin * c3;
                    this.props.changeStateVariableConstraint(sv.name, MIN, value);
                } else {
                    value = sv.cmax + this.state.dir[i] * sv.cmax * c3;
                    this.props.changeStateVariableConstraint(sv.name, MAX, value);
                }
            }
        }
        design = store.getState();
        if (design.result.objective_value > design.system_controls.objmin) {
            this.props.search();
        }
        design = store.getState();
        if (design.result.objective_value <= design.system_controls.objmin) {
            // TODO: Feasible found
            this.setState({
                proportionalModal: !this.state.proportionalModal
            });
        } else {
            if (design.system_controls.ioopt > 1) {
                console.log('TRIAL (FULL STEP) CONSTRAINTS:');
                this.clister();
            }
            rk3 = design.result.objective_value;
            // MAKE SECOND EXPLORATORY STEP 1/2 WAY TO THE FIRST ONE
            c2 = c3 / 2.0;
            for (let i = 0; i < this.state.nviol; i++) {
                let j = this.state.vflag[i];
                if (j < design.design_parameters.length) {
                    dp = design.design_parameters[j];
                    if (this.state.ldir[i] < 0) {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c2;
                        this.props.changeDesignParameterConstraint(dp.name, MIN, value);
                    } else {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c2;
                        this.props.changeDesignParameterConstraint(dp.name, MAX, value);
                    }
                } else {
                    sv = design.state_variables[j - design.design_parameters.length];
                    if (this.state.ldir[i] < 0) {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c2;
                        this.props.changeStateVariableConstraint(sv.name, MIN, value);
                    } else {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c2;
                        this.props.changeStateVariableConstraint(sv.name, MAX, value);
                    }
                }
            }
            this.props.restoreDesignParameterValues();
            this.props.search();
            design = store.getState();
            if (design.result.objective_value <= design.system_controls.objmin) {
                // TODO: Loop
                return;
            }
            var c0;
            var rk2;
            var a;
            var b;
            var smc;
            var rk1ac;
            var rk2ab;
            var rk3bc;
            var capa;
            var capb;
            var capc;
            var arg;
            if (design.system_controls.ioopt > 1) {
                console.log('TRIAL (HALF STEP) CONSTRAINTS:');
                this.clister();
            }
            rk2 = design.result.objective_value;
            /** ******** QUADRATIC EXTRAPOLATION ****************************** */
            /* REFER TO THESIS FIGURE 4-2 */
            /* FOR THE CASE THAT C1 ^= 0 : */
            /* A=C1-C2; */
            /* SMC=C1-C3; */
            /* CAPB= C1*(RK2AB-RK3BC) -C2*(RK1AC+RK3BC) +C3*(RK2AB-RK1AC); */
            /* CAPC= C2*C3*RK1AC -C1*C3*RK2AB +C1*C2*RK3BC; */
            /* HOWEVER IN THIS CASE C1=0, SO TERMS DROP OUT */
            a = -c2;
            b = c2 - c3;
            smc = -c3;
            rk1ac = this.state.rk1 / (a * smc);
            rk2ab = rk2 / (a * b);
            rk3bc = rk3 / (b * smc);
            capa = rk1ac - rk2ab + rk3bc;
            capb = -c2 * (rk1ac + rk3bc) + c3 * (rk2ab - rk1ac);
            capc = this.state.rk1;
            arg = capb * capb - 4.0 * capa * capc;
            if (arg < 0.0) {
                console.log('THERE MAY BE NO FEASIBLE SOLUTION IN THIS DIRECTION.');
                console.log('PARABOLA AXIS OF SYMMETRY:');
                c0 = -capb / (2.0 * capa);
            } else {
                /* TAKE SMALLER ROOT */
                c0 = (-capb - Math.sqrt(arg)) / (2.0 * capa);
                /** ******************************************************************* */
                console.log('EXTRAPOLATION INDICATES A FEASIBLE SOLUTION AT:');
            }
            for (let i = 0; i < this.state.nviol; i++) {
                let j = this.state.vflag[i];
                if (j < design.design_parameters.length) {
                    dp = design.design_parameters[j];
                    if (this.state.ldir[i] < 0) {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeDesignParameterConstraint(dp.name, MIN, value);
                        console.log(dp.name + ' MIN ' + value + ' ' + dp.units);
                    } else {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeDesignParameterConstraint(dp.name, MAX, value);
                        console.log(dp.name + ' MAX ' + value + ' ' + dp.units);
                    }
                } else {
                    sv = design.state_variables[j - design.design_parameters.length];
                    if (this.state.ldir[i] < 0) {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeStateVariableConstraint(sv.name, MIN, value);
                        console.log(sv.name + ' MIN ' + value + ' ' + sv.units);
                    } else {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeStateVariableConstraint(sv.name, MAX, value);
                        console.log(sv.name + ' MAX ' + value + ' ' + sv.units);
                    }
                }
            }
        }
        this.setState({
            proportionalModal: !this.state.proportionalModal,
            establishModal: !this.state.establishModal
        });
    }

    //===========================================================
    // Establish Modal
    //===========================================================
    
    onEstablishNo() {
        console.log('In onEstablishNo');
        console.log('state=',this.state);
        const { store } = this.context;
        console.log('store=',store);
        var dp;
        var sv;
        var design = store.getState();
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (this.state.ldir[i] < 0) {
                    this.props.changeDesignParameterConstraint(dp.name, MIN, this.state.tc[i]);
                } else {
                    this.props.changeDesignParameterConstraint(dp.name, MAX, this.state.tc[i]);
                }
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (this.state.ldir[i] < 0) {
                    this.props.changeStateVariableConstraint(sv.name, MIN, this.state.tc[i]);
                } else {
                    this.props.changeStateVariableConstraint(sv.name, MAX, this.state.tc[i]);
                }
            }
        }
        this.props.restoreDesignParameterValues();
        this.setState({
            establishModal: !this.state.establishModal
        });
        var ncode = 'DECLINED TRADE RESULT';
        this.props.changeResultTerminationCondition(ncode);
    }
    
    onEstablishYes() {
        console.log('In onEstablishYes');
        console.log('state=',this.state);
        const { store } = this.context;
        console.log('store=',store);
        var design = store.getState();
        this.setState({
            establishModal: !this.state.establishModal
        });
        var ncode = 'DECLINED TRADE RESULT';
        this.props.changeResultTerminationCondition(ncode);
    }
    
    //===========================================================
    // Render 
    //===========================================================
    
    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.strategyToggle}>
                    Trade
                </DropdownItem>
                <Modal isOpen={this.state.strategyModal} className={this.props.className} size="lg">
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Strategy </ModalHeader>
                    <ModalBody>
                        Specify your trade strategy ...  relax constraints:<br/>
                        Proportional - in proportion to their current violation<br/>
                        Arbitrary - in an arbitrary ratio<br/>
                        Existing - to the point of the existing violations<br/>
                        Cancel - return<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onStrategyCancel}>Cancel</Button>{' '}
                        <Button color="secondary" onClick={this.onStrategyExisting}>Existing</Button>{' '}
                        <Button color="secondary" onClick={this.onStrategyArbitrary}>Arbitrary</Button>{' '}
                        <Button color="primary" onClick={this.onStrategyProportional}>Proportional</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.proportionalModal} className={this.props.className} size="lg">
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Proportional </ModalHeader>
                    <ModalBody>
                        Enter local exploration size  (%)<br/>
                        Possibilities range from {90.0 * this.state.smallest} to {100.0 * this.state.bigest}<br/>
                        (default = {this.state.defaultest * 100.0})<br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onProportionalCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onProportionalContinue}>Continue</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.establishModal} className={this.props.className} size="lg">
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Proportional </ModalHeader>
                    <ModalBody>
                        Do you wish to establish this set of constraints?
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onEstablishYes}>Yes</Button>{' '}
                        <Button color="primary" onClick={this.onEstablishNo}>No</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

    clister() {
        const { store } = this.context;
        console.log('store=',store);
        var design = store.getState();
        var dp;
        var sv;
        console.log('CONSTRAINT                % VIOLATION           LEVEL');
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            if (j < design.design_parameters.length) {
                dp = design.design_parameters[j];
                if (this.state.ldir[i] < 0) {
                    console.log(dp.name + ' MIN ' + dp.vmin * 100.0 + ' ' + dp.cmin + ' ' + dp.units);
                } else {
                    console.log(dp.name + ' MAX ' + dp.vmax * 100.0 + ' ' + dp.cmax + ' ' + dp.units);
                }
            } else {
                sv = design.state_variables[j - design.design_parameters.length];
                if (this.state.ldir[i] < 0) {
                    console.log(sv.name + ' MIN ' + sv.vmin * 100.0 + ' ' + sv.cmin + ' ' + sv.units);
                } else {
                    console.log(sv.name + ' MAX ' + sv.vmax * 100.0 + ' ' + sv.cmax + ' ' + sv.units);
                }
            }
        }
    }

}  

ActionTrade.contextTypes = {
    store: PropTypes.object
};

const mapStateToProps = state => ({
    design: state
});

const mapDispatchToProps = {
    changeDesignParameterConstraint: changeDesignParameterConstraint,
    saveDesignParameterValues: saveDesignParameterValues,
    restoreDesignParameterValues: restoreDesignParameterValues,
    changeStateVariableConstraint: changeStateVariableConstraint,
    changeResultTerminationCondition: changeResultTerminationCondition,
    search: search,
    trade: trade
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionTrade);
