import PropTypes from 'prop-types';
import React from 'react';
import { DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, Button, Container, Row, Col, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
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
        
        this.onStrategyDone = this.onStrategyDone.bind(this);
        this.onStrategyExisting = this.onStrategyExisting.bind(this);
        this.onStrategyArbitrary = this.onStrategyArbitrary.bind(this);
        this.onStrategyProportional = this.onStrategyProportional.bind(this);
        
        this.onArbitraryCancel = this.onArbitraryCancel.bind(this);
        this.onArbitraryContinue = this.onArbitraryContinue.bind(this);
        this.onArbitraryChange = this.onArbitraryChange.bind(this);

        this.onSizeCancel = this.onSizeCancel.bind(this);
        this.onSizeContinue = this.onSizeContinue.bind(this);
        this.onSizeChange = this.onSizeChange.bind(this);
        
        this.onFeasibleRestart = this.onFeasibleRestart.bind(this);
        this.onFeasibleDone = this.onFeasibleDone.bind(this);
        
        this.onEstablishDone = this.onEstablishDone.bind(this);
        this.onEstablishAccept = this.onEstablishAccept.bind(this);
        
        this.onNotFeasibleRepeat = this.onNotFeasibleRepeat.bind(this);
        this.onNotFeasibleRestart = this.onNotFeasibleRestart.bind(this);
        this.onNotFeasibleDone = this.onNotFeasibleDone.bind(this);
        
        this.state = {
                strategyModal: false,
                arbitraryModal: false,
                sizeModal: false,
                feasibleModal: false,
                establishModal: false,
                notFeasibleModal: false,
                arbitraryContinueDisabled: false,
                nviol:  0,
                vflag: [],
                ldir: [],
                dir: []
            };
    }
    
    //===========================================================
    // Trade Menu Item
    //===========================================================
    
    strategyToggle() {
//        console.log('In strategyToggle');
//        console.log('state=',this.state);
        var design;
        var ncode;
        const { store } = this.context;
//        this.props.saveDesignParameterValues(); // @@@
//        this.props.search(); // @@@
        design = store.getState();
        var nviol = this.commonViolationSetup();
        if (design.result.objective_value <= design.system_controls.objmin || nviol === 0) {
            this.props.restoreDesignParameterValues();
            ncode = 'OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE';
            this.props.changeResultTerminationCondition(ncode);
            return;
        } else {
            this.setState({
                strategyModal: !this.state.strategyModal,
            });
        }
    }
    
    commonViolationSetup() {
        var design;
        var dp;
        var sv;
        var nviol = 0;
        var ldir = [];
        var vflag = [];
        const { store } = this.context;
        this.props.saveDesignParameterValues();
        this.props.search(); // @@@
        design = store.getState();
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
//        console.log('nviol=',nviol);
//        console.log('vflag=',vflag);
//        console.log('ldir=',ldir);
        this.setState({
            nviol: nviol,
            vflag: vflag,
            ldir: ldir
        });
        return nviol;
    }

    //===========================================================
    // Strategy Modal
    //===========================================================
    
    onStrategyDone() { // Option 3
//        console.log('In onStrategyDone');
//        console.log('state=',this.state);
        this.props.restoreDesignParameterValues();
        var ncode;
        ncode = 'TRADE CANCELLED';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            strategyModal: !this.state.strategyModal
        });
        return;
    }

    onStrategyExisting() { // Option 2
//        console.log('In onStrategyExisting');
//        console.log('state=',this.state);
        var design;
        var dp;
        var sv;
        var value;
        var ncode;
        const { store } = this.context;
        design = store.getState();
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
        ncode = 'CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            strategyModal: !this.state.strategyModal
        });
        return;
    }

    onStrategyArbitrary() { // Option 1
//        console.log('In onStrategyArbitrary');
//        console.log('state=',this.state);
        var design;
        var dp;
        var sv;
        var dir = [];
        const { store } = this.context;
        design = store.getState();
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
        this.setState({
            dir: dir,
            strategyModal: !this.state.strategyModal,
            arbitraryModal: !this.state.arbitraryModal
        });
    }

    onStrategyProportional() { // Option 0
//        console.log('In onStrategyProportional');
//        console.log('state=',this.state);
        var design;
        var dp;
        var sv;
        var dir = [];
        const { store } = this.context;
        design = store.getState();
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
        this.commonArbitraryOrProportional(dir);
        this.setState({
            strategyModal: !this.state.strategyModal,
            sizeModal: !this.state.sizeModal,
        });
    }
    
    commonArbitraryOrProportional(dir) {
        /**
         * **** CREATE normalized VECTOR IN VIOLATED CONSTRAINT SPACE
         * *****
         */
        var design;
        var dp;
        var sv;
        var temp2;
        var value = 0.0;
        var itemp = 0;
        var temp;
        const { store } = this.context;
        design = store.getState();
        for (let i = 0; i < this.state.nviol; i++) {
            temp2 = Math.abs(dir[i]);
            if (temp2 > value) {
                value = temp2;
                itemp = i;
            }
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
                        temp = sv.vmin / temp2;
                    else
                        temp = sv.vmin;
                else if (temp2 > design.system_controls.smallnum)
                    temp = sv.vmax / temp2;
                else
                    temp = sv.vmax;
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
            dir: dir,
            tc: tc,
            rk1: rk1,
            smallest: smallest,
            bigest: bigest,
            defaultest: defaultest
        });
    }

    //===========================================================
    // Arbitrary Modal
    //===========================================================
    
    onArbitraryCancel() {
//        console.log('In onArbitraryCancel');
//        console.log('state=',this.state);
        this.props.restoreDesignParameterValues();
        var ncode;
        ncode = 'TRADE CANCELLED';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            arbitraryModal: !this.state.arbitraryModal
        });
        return;
    }
    
    onArbitraryContinue() {
//        console.log('In onArbitraryContinue');
//        console.log('state=',this.state);
        this.commonArbitraryOrProportional(this.state.dir);
        this.setState({
            arbitraryModal: !this.state.arbitraryModal,
            sizeModal: !this.state.sizeModal,
        });
    }
    
    onArbitraryChange(i, event) {
//        console.log('=========================== i=',i,' event=',event.target.value);
//        console.log('state=',this.state);
        var design;
        const { store } = this.context;
        design = store.getState();
        var dir = [];
        var value;
        dir = this.state.ldir.map((entry,index)=>{
            var value;
            if (index === i) {
                value = entry * parseFloat(event.target.value);
                value = isNaN(value) ? this.state.dir[index] : value;
//                console.log('i1=',i,' entry=',entry,' index=',index,' value=',value);
                return value;
            }
            value = this.state.dir[index];
//            console.log('i2=',i,' entry=',entry,' index=',index,' value=',value);
            return value;
        })
//        console.log('dir=',dir);
        value = dir.reduce((value,dir) => {return Math.abs(dir) > value ? Math.abs(dir) : value}, 0.0);
//        console.log('value=',value);
        this.setState({
            dir: dir,
            arbitraryContinueDisabled: value < design.system_controls.smallnum
        });
    }
    
    //===========================================================
    // Size Modal
    //===========================================================
    
    onSizeCancel() {
//        console.log('In onSizeCancel');
//        console.log('state=',this.state);
        this.props.restoreDesignParameterValues();
        var ncode;
        ncode = 'TRADE CANCELLED';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            sizeModal: !this.state.sizeModal
        });
        return;
    }
    
    onSizeContinue() {
//        console.log('In onSizeContinue');
//        console.log('state=',this.state);
        var design;
        var dp;
        var sv;
        var c2;
        var c3;
        var rk3;
        var value;
        const { store } = this.context;
        design = store.getState();
        c3 = this.state.defaultest;
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
            // Feasible was found, go show Feasible Modal
            this.setState({
                sizeModal: !this.state.sizeModal,
                feasibleModal: !this.state.feasibleModal
            });
            return;
        } else {
//            if (design.system_controls.ioopt > 1) {
//                console.log('TRIAL (FULL STEP) CONSTRAINTS:');
//                this.clister();
//            }
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
                // Feasible was found, go show Feasible Modal
                this.setState({
                    sizeModal: !this.state.sizeModal,
                    feasibleModal: !this.state.feasibleModal
                });
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
//            if (design.system_controls.ioopt > 1) {
//                console.log('TRIAL (HALF STEP) CONSTRAINTS:');
//                this.clister();
//            }
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
//                console.log('THERE MAY BE NO FEASIBLE SOLUTION IN THIS DIRECTION.');
//                console.log('PARABOLA AXIS OF SYMMETRY:');
                c0 = -capb / (2.0 * capa);
            } else {
                /* TAKE SMALLER ROOT */
                c0 = (-capb - Math.sqrt(arg)) / (2.0 * capa);
                /** ******************************************************************* */
//                console.log('EXTRAPOLATION INDICATES A FEASIBLE SOLUTION AT:');
            }
            for (let i = 0; i < this.state.nviol; i++) {
                let j = this.state.vflag[i];
                if (j < design.design_parameters.length) {
                    dp = design.design_parameters[j];
                    if (this.state.ldir[i] < 0) {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeDesignParameterConstraint(dp.name, MIN, value);
//                        console.log(dp.name + ' MIN ' + value + ' ' + dp.units);
                    } else {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeDesignParameterConstraint(dp.name, MAX, value);
//                        console.log(dp.name + ' MAX ' + value + ' ' + dp.units);
                    }
                } else {
                    sv = design.state_variables[j - design.design_parameters.length];
                    if (this.state.ldir[i] < 0) {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeStateVariableConstraint(sv.name, MIN, value);
//                        console.log(sv.name + ' MIN ' + value + ' ' + sv.units);
                    } else {
                        value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                        this.props.changeStateVariableConstraint(sv.name, MAX, value);
//                        console.log(sv.name + ' MAX ' + value + ' ' + sv.units);
                    }
                }
            }
            design = store.getState(); // @@@
            this.props.search(); // @@@
        }
        this.setState({
            sizeModal: !this.state.sizeModal,
            establishModal: !this.state.establishModal
        });
    }

    onSizeChange(event) {
//        console.log('In onSizeChange');
//        console.log('state=',this.state);
        var value;
        value = parseFloat(event.target.value) / 100.0;
        this.setState({
            defaultest: isNaN(value) ? this.state.defaultest : value
        });
    }
    
    //===========================================================
    // Feasible Modal
    //===========================================================
    
    onFeasibleRestart() {
//        console.log('In onFeasibleRestart');
//        console.log('state=',this.state);
        var design;
        var dp;
        var sv;
        const { store } = this.context;
        design = store.getState();
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
        this.commonViolationSetup();
        this.commonArbitraryOrProportional(this.state.dir);
        this.setState({
            feasibleModal: !this.state.feasibleModal,
            sizeModal: !this.state.sizeModal
        });
    }

    onFeasibleDone() {
//        console.log('In onFeasibleDone');
//        console.log('state=',this.state);
        this.setState({
            feasibleModal: !this.state.feasibleModal
        });
        return;
    }

    //===========================================================
    // Establish Modal
    //===========================================================
    
    onEstablishAccept() {
//        console.log('In onEstablishAccept');
//        console.log('state=',this.state);
        var design;
        var ncode;
        const { store } = this.context;
//        design = store.getState(); // @@@
//        this.props.search(); // @@@
        design = store.getState(); // Re-access store to get latest dp and sv values
        if (design.result.objective_value <= design.system_controls.objmin) {
            ncode = 'ACCEPTED TRADE RESULT';
            this.props.changeResultTerminationCondition(ncode);
            this.setState({
                establishModal: !this.state.establishModal
            });
            return;
        }
        this.setState({
            establishModal: !this.state.establishModal,
            notFeasibleModal: !this.state.notFeasibleModal
        });
    }
    
    onEstablishDone() {
//      console.log('In onEstablishDone');
//      console.log('state=',this.state);
      this.props.restoreDesignParameterValues();
      var design;
      var dp;
      var sv;
      var ncode;
      const { store } = this.context;
      design = store.getState();
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
      ncode = 'DECLINED TRADE RESULT';
      this.props.changeResultTerminationCondition(ncode);
      this.setState({
          establishModal: !this.state.establishModal
      });
      return;
  }
  
    //===========================================================
    // Not Feasible Modal 
    //===========================================================
    
    onNotFeasibleRestart() {
//        console.log('In onNotFeasibleRestart');
//        console.log('state=',this.state);
        var design;
        const { store } = this.context;
        design = store.getState();
        var dp;
        var sv;
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
        this.commonViolationSetup()
        this.setState({
            notFeasibleModal: !this.state.notFeasibleModal,
            strategyModal: !this.state.strategyModal
        });
    }
    
    onNotFeasibleRepeat() {
//      console.log('In onNotFeasibleRepeat');
//      console.log('state=',this.state);
//      this.props.saveDesignParameterValues(); // @@@
      this.commonViolationSetup()
      this.setState({
          notFeasibleModal: !this.state.notFeasibleModal,
          strategyModal: !this.state.strategyModal
      });
  }
  
    onNotFeasibleDone() {
//        console.log('In onNotFeasibleDone');
//        console.log('state=',this.state);
        var ncode;
        ncode = 'ACCEPTED TRADE RESULT';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            notFeasibleModal: !this.state.notFeasibleModal
        });
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
                        Specify your trade strategy:<br/>
                        <ul>
                            <li>Proportional - relax constraints in proportion to their current violation</li>
                            <li>Arbitrary - relax constraints in a specified ratio</li>
                            <li>Existing - relax constraints to the point of the existing violations</li>
                            <li>Done - return to main page</li>
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onStrategyDone}> &nbsp; Done &nbsp; </Button>{' '}
                        <Button color="secondary" onClick={this.onStrategyExisting}>Existing</Button>{' '}
                        <Button color="info" onClick={this.onStrategyArbitrary}>Arbitrary</Button>{' '}
                        <Button color="primary" onClick={this.onStrategyProportional}>Proportional</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.arbitraryModal} className={this.props.className}>
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Arbitrary </ModalHeader>
                    <ModalBody>
                        <Container>
                            <Row>
                                <Col className="text-left font-weight-bold align-middle" xs="4">Name</Col>
                                <Col className="text-left font-weight-bold align-middle" xs="2"></Col>
                                <Col className="text-right font-weight-bold align-middle" xs="6">Weight</Col>
                            </Row>
                            {
                                this.state.vflag.map((j,i) => {
                                    var design;
                                    var dp;
                                    var sv;
                                    var dname;
                                    const { store } = this.context;
                                    design = store.getState();
                                    if (j < design.design_parameters.length) {
                                        dp = design.design_parameters[j];
                                        dname = dp.name;
                                    } else {
                                        sv = design.state_variables[j - design.design_parameters.length];
                                        dname = sv.name;
                                    }
                                    return (
                                        <Row key={dname}>
                                            <Col className="align-middle text-left" xs="4">{dname}</Col>
                                            <Col className="align-middle text-left" xs="2">{this.state.ldir[i] < 0 ? 'MIN' : 'MAX'}</Col>
                                            <Col className="align-middle text-right" xs="6">
                                                <Input className="align-middle text-right" type="number" value={Math.abs(this.state.dir[i])} onChange={(event) => {this.onArbitraryChange(i, event)}}/>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onArbitraryCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onArbitraryContinue} disabled={this.state.arbitraryContinueDisabled}>Continue</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.sizeModal} className={this.props.className}>
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Size </ModalHeader>
                    <ModalBody>
                        Enter local exploration step size (%)<br/>
                        Possibilities range from {(90.0 * this.state.smallest).toFixed(2)} to {(100.0 * this.state.bigest).toFixed(2)}<br/>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    Default
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input className="text-right" type="number" value={this.state.defaultest * 100.0} onChange={this.onSizeChange}/>
                        </InputGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onSizeCancel}>Cancel</Button>{' '}
                        <Button color="primary" onClick={this.onSizeContinue}>Continue</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.feasibleModal} className={this.props.className}>
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Feasible </ModalHeader>
                    <ModalBody>
                        A feasible point has been established.<br/>
                        <ul>
                            <li>Done - To return with these constraints</li>
                            <li>Resize - Enter a smaller local exploration step size</li>
                        </ul>
                        {this.list_constraints()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onFeasibleRestart}>Resize</Button>{' '}
                        <Button color="primary" onClick={this.onFeasibleDone}> &nbsp; Done &nbsp; </Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.establishModal} className={this.props.className}>
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Establish </ModalHeader>
                    <ModalBody>
                        Do you wish to establish this set of constraints?
                        <ul>
                            <li>Accept - establish this set of constraints</li>
                            <li>Done - Return to the main page with previously established constraints</li>
                        </ul>
                        {this.list_constraints()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onEstablishDone}> &nbsp; Done &nbsp; </Button>{' '}
                        <Button color="primary" onClick={this.onEstablishAccept}>Accept</Button>
                    </ModalFooter>
                </Modal>
                <Modal isOpen={this.state.notFeasibleModal} className={this.props.className}>
                    <ModalHeader><img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Not Feasible </ModalHeader>
                    <ModalBody>
                        The result is not feasible: obj = { parseFloat(this.props.design.result.objective_value).toFixed(6) }<br/>
                        <ul>
                            <li>Done &nbsp; - To return to the main page with these constraints</li>
                            <li>Repeat - To repeat Trade with these constraints</li>
                            <li>Restart - To restart Trade with the previously established constraints</li>
                        </ul>
                        {this.list_constraints()}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.onNotFeasibleRestart}>Restart</Button>{' '}
                        <Button color="secondary" onClick={this.onNotFeasibleRepeat}>Repeat</Button>{' '}
                        <Button color="primary" onClick={this.onNotFeasibleDone}> &nbsp; Done &nbsp; </Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
        );
    }

//    clister() {
//        var design;
//        var dp;
//        var sv;
//        const { store } = this.context;
//        design = store.getState();
//        console.log('CONSTRAINT                % VIOLATION           LEVEL');
//        for (let i = 0; i < this.state.nviol; i++) {
//            let j = this.state.vflag[i];
//            if (j < design.design_parameters.length) {
//                dp = design.design_parameters[j];
//                if (this.state.ldir[i] < 0) {
//                    console.log(dp.name + ' MIN ' + dp.vmin * 100.0 + ' ' + dp.cmin + ' ' + dp.units);
//                } else {
//                    console.log(dp.name + ' MAX ' + dp.vmax * 100.0 + ' ' + dp.cmax + ' ' + dp.units);
//                }
//            } else {
//                sv = design.state_variables[j - design.design_parameters.length];
//                if (this.state.ldir[i] < 0) {
//                    console.log(sv.name + ' MIN ' + sv.vmin * 100.0 + ' ' + sv.cmin + ' ' + sv.units);
//                } else {
//                    console.log(sv.name + ' MAX ' + sv.vmax * 100.0 + ' ' + sv.cmax + ' ' + sv.units);
//                }
//            }
//        }
//    }

    list_constraints() {
        return (
            <Container>
                <Row>
                    <Col className="text-left font-weight-bold align-middle" xs="3">Name</Col>
                    <Col className="text-left font-weight-bold align-middle" xs="1"></Col>
                    <Col className="text-right font-weight-bold align-middle" xs="3">Violation</Col>
                    <Col className="text-right font-weight-bold align-middle" xs="3">Constraint</Col>
                    <Col className="text-right font-weight-bold align-middle" xs="2">Units</Col>
                </Row>
                {
                    this.state.vflag.map((j,i) => {
                        var design;
                        var dp;
                        var sv;
                        var constraint_class;
                        const { store } = this.context;
                        design = store.getState();
                        if (j < design.design_parameters.length) {
                            dp = design.design_parameters[j];
                            if (this.state.ldir[i] < 0) {
//                                console.log(dp.name + ' MIN ' + dp.vmin * 100.0 + ' ' + dp.cmin + ' ' + dp.units);
                                if (design.result.objective_value < design.system_controls.objmin) {
                                    constraint_class = (dp.lmin & CONSTRAINED && dp.vmin > 0.0) ? 'text-low-danger align-middle text-right' : 'text-right';
                                } else {
                                    constraint_class = (dp.lmin & CONSTRAINED && dp.vmin > 0.0) ? 'text-danger align-middle text-right font-weight-bold' : 'text-right';
                                }
                                return (
                                        <Row key={dp.name}>
                                            <Col className="align-middle text-left" xs="3">{dp.name}</Col>
                                            <Col className="align-middle text-left" xs="1">MIN</Col>
                                            <Col className="align-middle text-right" xs="3">{(dp.vmin * 100.0).toFixed(1)}%</Col>
                                            <Col className={constraint_class} xs="3">{dp.cmin.toFixed(4)}</Col>
                                            <Col className="align-middle text-right" xs="2">{dp.units}</Col>
                                        </Row>
                                    );
                            } else {
//                                console.log(dp.name + ' MAX ' + dp.vmax * 100.0 + ' ' + dp.cmax + ' ' + dp.units);
                                if (design.result.objective_value < design.system_controls.objmin) {
                                    constraint_class = (dp.lmax & CONSTRAINED && dp.vmax > 0.0) ? 'text-low-danger align-middle text-right' : 'text-right';
                                } else {
                                    constraint_class = (dp.lmax & CONSTRAINED && dp.vmax > 0.0) ? 'text-danger align-middle text-right font-weight-bold' : 'text-right';
                                }
                                return (
                                        <Row key={dp.name}>
                                            <Col className="align-middle text-left" xs="3">{dp.name}</Col>
                                            <Col className="align-middle text-left" xs="1">MAX</Col>
                                            <Col className="align-middle text-right" xs="3">{(dp.vmax * 100.0).toFixed(1)}%</Col>
                                            <Col className={constraint_class} xs="3">{dp.cmax.toFixed(4)}</Col>
                                            <Col className="align-middle text-right" xs="2">{dp.units}</Col>
                                        </Row>
                                    );
                            }
                        } else {
                            sv = design.state_variables[j - design.design_parameters.length];
                            if (this.state.ldir[i] < 0) {
//                                console.log(sv.name + ' MIN ' + sv.vmin * 100.0 + ' ' + sv.cmin + ' ' + sv.units);
                                if (design.result.objective_value < design.system_controls.objmin) {
                                    constraint_class = (sv.lmin & CONSTRAINED && sv.vmin > 0.0) ? 'text-low-danger align-middle text-right' : 'text-right';
                                } else {
                                    constraint_class = (sv.lmin & CONSTRAINED && sv.vmin > 0.0) ? 'text-danger align-middle text-right font-weight-bold' : 'text-right';
                                }
                                return (
                                        <Row key={sv.name}>
                                            <Col className="align-middle text-left" xs="3">{sv.name}</Col>
                                            <Col className="align-middle text-left" xs="1">MIN</Col>
                                            <Col className="align-middle text-right" xs="3">{(sv.vmin * 100.0).toFixed(1)}%</Col>
                                            <Col className={constraint_class} xs="3">{sv.cmin.toFixed(4)}</Col>
                                            <Col className="align-middle text-right" xs="2">{sv.units}</Col>
                                        </Row>
                                    );
                            } else {
//                                console.log(sv.name + ' MAX ' + sv.vmax * 100.0 + ' ' + sv.cmax + ' ' + sv.units);
                                if (design.result.objective_value < design.system_controls.objmin) {
                                    constraint_class = (sv.lmax & CONSTRAINED && sv.vmax > 0.0) ? 'text-low-danger align-middle text-right' : 'text-right';
                                } else {
                                    constraint_class = (sv.lmax & CONSTRAINED && sv.vmax > 0.0) ? 'text-danger align-middle text-right font-weight-bold' : 'text-right';
                                }
                                return (
                                        <Row key={sv.name}>
                                            <Col className="align-middle text-left" xs="3">{sv.name}</Col>
                                            <Col className="align-middle text-left" xs="1">MAX</Col>
                                            <Col className="align-middle text-right" xs="3">{(sv.vmax * 100.0).toFixed(1)}%</Col>
                                            <Col className={constraint_class} xs="3">{sv.cmax.toFixed(4)}</Col>
                                            <Col className="align-middle text-right" xs="2">{sv.units}</Col>
                                        </Row>
                                    );
                            }
                        }
                    })
                }
            </Container>
        );
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
