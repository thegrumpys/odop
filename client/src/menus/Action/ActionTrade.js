import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavDropdown, Modal, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { MIN, MAX, CONSTRAINED, FDCL } from '../../store/actionTypes';
import { changeSymbolConstraint,
    saveInputSymbolValues,
    restoreInputSymbolValues,
    changeResultTerminationCondition,
    search,
    saveAutoSave } from '../../store/actionCreators';
import { logUsage } from '../../logUsage';
import FormControlTypeNumber from '../../components/FormControlTypeNumber';

class ActionTrade extends Component {

    constructor(props) {
//        console.log('In ActionTrade.constructor props=',props);
        super(props);
        
        this.strategyToggle = this.strategyToggle.bind(this);
        this.onNoop = this.onNoop.bind(this);
        
        this.onStrategyDone = this.onStrategyDone.bind(this);
        this.onStrategyExisting = this.onStrategyExisting.bind(this);
        this.onStrategyArbitrary = this.onStrategyArbitrary.bind(this);
        this.onStrategyProportional = this.onStrategyProportional.bind(this);
        this.onStrategyContextHelp = this.onStrategyContextHelp.bind(this);
        
        this.onArbitraryCancel = this.onArbitraryCancel.bind(this);
        this.onArbitraryContinue = this.onArbitraryContinue.bind(this);
        this.onArbitraryChangeValid = this.onArbitraryChangeValid.bind(this);
        this.onArbitraryChangeInvalid = this.onArbitraryChangeInvalid.bind(this);

        this.onSizeCancel = this.onSizeCancel.bind(this);
        this.onSizeContinue = this.onSizeContinue.bind(this);
        this.onSizeChangeValid = this.onSizeChangeValid.bind(this);
        this.onSizeChangeInvalid = this.onSizeChangeInvalid.bind(this);
        
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
                dir: [],
            };
    }
    
    //===========================================================
    // Trade Menu Item
    //===========================================================
    
    strategyToggle() {
//        console.log('In ActionTrade.strategyToggle this=',this);
//        console.log('state=',this.state);
        logUsage('event', 'ActionTrade', { event_label: 'ActionTrade'});
        this.props.saveAutoSave();
        var design;
        var ncode;
        const { store } = this.context;
//        this.props.saveInputSymbolValues();
//        this.props.search();
        design = store.getState();
        var nviol = this.commonViolationSetup();
        if (design.model.result.objective_value <= design.model.system_controls.objmin || nviol === 0) {
            this.props.restoreInputSymbolValues();
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
//        console.log('In ActionTrade.commonViolationSetup this=',this);
//        console.log('state=',this.state);
        var design;
        var element;
        var nviol = 0;
        var ldir = [];
        var vflag = [];
        const { store } = this.context;
        this.props.saveInputSymbolValues();
        this.props.search();
        design = store.getState();
        for (let i = 0; i < design.model.symbol_table.length; i++) {
            element = design.model.symbol_table[i];
            if (element.lmin & CONSTRAINED && !(element.lmin & FDCL) && element.vmin > 0.0) {
                nviol++
                vflag[nviol - 1] = i;
                ldir[nviol - 1] = -1;
            } else if (element.lmax & CONSTRAINED && !(element.lmax & FDCL) && element.vmax > 0.0) {
                nviol++
                vflag[nviol - 1] = i;
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
    
    onNoop() { // No-op for onHide
//      console.log('In ActionTrade.onNoop this=',this);
//      console.log('state=',this.state);
    }

    //===========================================================
    // Strategy Modal
    //===========================================================
    
    onStrategyDone() { // Option 3
//        console.log('In ActionTrade.onStrategyDone this=',this);
//        console.log('state=',this.state);
        this.props.restoreInputSymbolValues();
        var ncode;
        ncode = 'TRADE CANCELLED';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            strategyModal: !this.state.strategyModal
        });
        return;
    }

    onStrategyExisting() { // Option 2
//        console.log('In ActionTrade.onStrategyExisting this=',this);
//        console.log('state=',this.state);
        var design;
        var element;
        var value;
        var ncode;
        const { store } = this.context;
        design = store.getState();
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                value = element.cmin + element.vmin * element.smin * this.state.ldir[i];
                this.props.changeSymbolConstraint(element.name, MIN, value);
            } else {
                value = element.cmax + element.vmax * element.smax * this.state.ldir[i];
                this.props.changeSymbolConstraint(element.name, MAX, value);
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
//        console.log('In ActionTrade.onStrategyArbitrary this=',this);
//        console.log('state=',this.state);
        var design;
        var element;
        var dir = [];
        var isArbitraryInvalid = [];
        const { store } = this.context;
        design = store.getState();
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                dir[i] = this.state.ldir[i] * element.vmin;
            } else {
                dir[i] = this.state.ldir[i] * element.vmax;
            }
            isArbitraryInvalid[i] = false;
        }
        this.setState({
            dir: dir,
            isArbitraryInvalid: isArbitraryInvalid,
            arbitraryContinueDisabled: false,
            strategyModal: !this.state.strategyModal, // Hide strategy modal
            arbitraryModal: !this.state.arbitraryModal, // Show arbitrary modal
        });
    }

    onStrategyProportional() { // Option 0
//        console.log('In ActionTrade.onStrategyProportional this=',this);
//        console.log('state=',this.state);
        var design;
        var element;
        var dir = [];
        const { store } = this.context;
        design = store.getState();
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                dir[i] = this.state.ldir[i] * element.vmin;
            } else {
                dir[i] = this.state.ldir[i] * element.vmax;
            }
        }
        this.commonArbitraryOrProportional(dir);
        this.setState({
            strategyModal: !this.state.strategyModal,
            sizeModal: !this.state.sizeModal,
        });
    }
    
    onStrategyContextHelp() {
//        console.log('In ActionTrade.onStrategyContextHelp this=',this);
//        console.log('state=',this.state);
        this.setState({
            modal: !this.state.modal
        });
        window.open('/docs/Help/trade.html', '_blank');
    }
    
    commonArbitraryOrProportional(dir) {
//        console.log('In ActionTrade.commonArbitraryOrProportional dir=',dir);
//        console.log('state=',this.state);
        /**
         * **** CREATE normalized VECTOR IN VIOLATED CONSTRAINT SPACE
         * *****
         */
        var design;
        var element;
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
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                tc[i] = element.cmin;
            } else {
                tc[i] = element.cmax;
            }
        }
        var rk1;
        var smallest;
        var bigest;
        var default_est_percent;
//          c1 = 0.0
        rk1 = design.model.result.objective_value;
        /* estimate best step size */
        smallest = Number.MAX_VALUE;
        bigest = Number.MIN_VALUE;
        for (let i = 0; i < this.state.nviol; i++) {
            temp2 = Math.abs(dir[i]);
            let j = this.state.vflag[i];
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                if (temp2 > design.model.system_controls.smallnum) {
                    temp = element.vmin / temp2;
                } else {
                    temp = element.vmin;
                }
            } else {
                if (temp2 > design.model.system_controls.smallnum) {
                    temp = element.vmax / temp2;
                } else {
                    temp = element.vmax;
                }
            }
            if (temp > design.model.system_controls.smallnum && temp < smallest) {
                smallest = temp;
            }
            if (temp > bigest) {
                bigest = temp;
            }
        }
        let j = this.state.vflag[itemp];
        element = design.model.symbol_table[j];
        if (this.state.ldir[itemp] < 0) {
            default_est_percent = 90 * element.vmin; // 90% of vmin
        } else {
            default_est_percent = 90 * element.vmax; // 90% of vmax
        }
        if (default_est_percent / 100.0 < design.model.system_controls.smallnum) {
            default_est_percent = design.model.system_controls.smallnum * 100.0;
        }
        this.setState({
            dir: dir,
            tc: tc,
            rk1: rk1,
            smallest: smallest,
            bigest: bigest,
            default_est_percent: default_est_percent,
        });
    }

    //===========================================================
    // Arbitrary Modal
    //===========================================================
    
    onArbitraryCancel() {
//        console.log('In ActionTrade.onArbitraryCancel this=',this);
//        console.log('state=',this.state);
        this.props.restoreInputSymbolValues();
        var ncode;
        ncode = 'TRADE CANCELLED';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            arbitraryModal: !this.state.arbitraryModal, // Hide arbitrary modal
        });
        return;
    }
    
    onArbitraryContinue() {
//        console.log('In ActionTrade.onArbitraryContinue this=',this);
//        console.log('state=',this.state);
        this.commonArbitraryOrProportional(this.state.dir);
        this.setState({
            arbitraryModal: !this.state.arbitraryModal, // Hide arbitrary modal
            sizeModal: !this.state.sizeModal, // Show size modal
        });
    }
    
    onArbitraryChangeValid(i, event) {
//        console.log('In ActionTrade.onArbitraryChangeValid i=',i,' event.target.value=',event.target.value);
//        console.log('state=',this.state);
        var design;
        const { store } = this.context;
        design = store.getState();
        var dir = this.state.ldir.map((element,index)=>{
            var value;
            if (index === i) {
                value = element * parseFloat(event.target.value);
//                console.log('i1=',i,' element=',element,' index=',index,' value=',value);
            } else {
                value = this.state.dir[index];
//                console.log('i2=',i,' element=',element,' index=',index,' value=',value);
            }
            return value;
        });
//        console.log('In ActionTrade.onArbitraryChangeValid dir=',dir);
        var greatestValue = dir.reduce((previousValue,currentValue) => {return Math.abs(currentValue) > previousValue ? Math.abs(currentValue) : previousValue}, 0.0);
//        console.log('In ActionTrade.onArbitraryChangeValid greatestValue=',greatestValue);
        var isArbitraryInvalid = this.state.isArbitraryInvalid.map((element, index) => {
          if (index === i) {
            return false;
          } else {
            return element;
          }
        });
//        console.log('In ActionTrade.onArbitraryChangeValid isArbitraryInvalid=',isArbitraryInvalid);
        var notAllArbitraryValid = isArbitraryInvalid.reduce((previousValue,currentValue) => {return previousValue || currentValue}, false);
//        console.log('In ActionTrade.onArbitraryChangeValid notAllNumbers=',notAllArbitraryValid);
        var arbitraryContinueDisabled = greatestValue < design.model.system_controls.smallnum || notAllArbitraryValid;
//        console.log('In ActionTrade.onArbitraryChangeValid arbitraryContinueDisabled=',arbitraryContinueDisabled);
        this.setState({
            dir: dir,
            isArbitraryInvalid: isArbitraryInvalid,
            arbitraryContinueDisabled: arbitraryContinueDisabled,
        });
    }
    
    onArbitraryChangeInvalid(i, event) {
//        console.log('In ActionTrade.onArbitraryChangeInvalid i=',i,' event.target.value=',event.target.value);
//        console.log('state=',this.state);
        var design;
        const { store } = this.context;
        design = store.getState();
        var greatestValue = this.state.dir.reduce((previousValue,currentValue) => {return Math.abs(currentValue) > previousValue ? Math.abs(currentValue) : previousValue}, 0.0);
//        console.log('In ActionTrade.onArbitraryChangeInvalid greatestValue=',greatestValue);
        var isArbitraryInvalid = this.state.isArbitraryInvalid.map((element, index) => {
          if (index === i) {
            return true;
          } else {
            return element;
          }
        });
//        console.log('In ActionTrade.onArbitraryChangeInvalid isArbitraryInvalid=',isArbitraryInvalid);
        var notAllArbitraryValid = isArbitraryInvalid.reduce((previousValue,currentValue) => {return previousValue || currentValue}, false);
//        console.log('In ActionTrade.onArbitraryChangeInvalid notAllNumbers=',notAllArbitraryValid);
        var arbitraryContinueDisabled = greatestValue < design.model.system_controls.smallnum || notAllArbitraryValid;
//        console.log('In ActionTrade.onArbitraryChangeInvalid arbitraryContinueDisabled=',arbitraryContinueDisabled);
        this.setState({
            isArbitraryInvalid: isArbitraryInvalid,
            arbitraryContinueDisabled: arbitraryContinueDisabled,
        });
    }
    
    //===========================================================
    // Size Modal
    //===========================================================
    
    onSizeCancel() {
//        console.log('In ActionTrade.onSizeCancel this=',this);
//        console.log('state=',this.state);
        this.props.restoreInputSymbolValues();
        var ncode;
        ncode = 'TRADE CANCELLED';
        this.props.changeResultTerminationCondition(ncode);
        this.setState({
            sizeModal: !this.state.sizeModal
        });
        return;
    }
    
    onSizeContinue() {
//        console.log('In ActionTrade.onSizeContinue this=',this);
//        console.log('state=',this.state);
        var design;
        var element;
        var c2;
        var c3;
        var rk3;
        var value;
        const { store } = this.context;
        design = store.getState();
        c3 = this.state.default_est_percent / 100.0; // Convert from percent to actual value
        // TAKE FIRST EXPLORATORY RELAXATION STEP
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                value = element.cmin + this.state.dir[i] * element.cmin * c3;
                this.props.changeSymbolConstraint(element.name, MIN, value);
            } else {
                value = element.cmax + this.state.dir[i] * element.cmax * c3;
                this.props.changeSymbolConstraint(element.name, MAX, value);
            }
        }
        design = store.getState();
        if (design.model.result.objective_value > design.model.system_controls.objmin) {
            this.props.search();
        }
        design = store.getState();
        if (design.model.result.objective_value <= design.model.system_controls.objmin) {
            // Feasible was found, go show Feasible Modal
            this.setState({
                sizeModal: !this.state.sizeModal,
                feasibleModal: !this.state.feasibleModal
            });
            return;
        } else {
//            if (design.model.system_controls.ioopt > 1) {
//                console.log('TRIAL (FULL STEP) CONSTRAINTS:');
//                this.clister();
//            }
            rk3 = design.model.result.objective_value;
            // MAKE SECOND EXPLORATORY STEP 1/2 WAY TO THE FIRST ONE
            c2 = c3 / 2.0;
            for (let i = 0; i < this.state.nviol; i++) {
                let j = this.state.vflag[i];
                element = design.model.symbol_table[j];
                if (this.state.ldir[i] < 0) {
                    value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c2;
                    this.props.changeSymbolConstraint(element.name, MIN, value);
                } else {
                    value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c2;
                    this.props.changeSymbolConstraint(element.name, MAX, value);
                }
            }
            this.props.restoreInputSymbolValues();
            this.props.search();
            design = store.getState();
            if (design.model.result.objective_value <= design.model.system_controls.objmin) {
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
//            if (design.model.system_controls.ioopt > 1) {
//                console.log('TRIAL (HALF STEP) CONSTRAINTS:');
//                this.clister();
//            }
            rk2 = design.model.result.objective_value;
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
                element = design.model.symbol_table[j];
                if (this.state.ldir[i] < 0) {
                    value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                    this.props.changeSymbolConstraint(element.name, MIN, value);
//                        console.log(element.name + ' MIN ' + value + ' ' + element.units);
                } else {
                    value = this.state.tc[i] + this.state.dir[i] * this.state.tc[i] * c0;
                    this.props.changeSymbolConstraint(element.name, MAX, value);
//                        console.log(element.name + ' MAX ' + value + ' ' + element.units);
                }
            }
            design = store.getState();
            this.props.search();
        }
        this.setState({
            sizeModal: !this.state.sizeModal,
            establishModal: !this.state.establishModal
        });
    }

    onSizeChangeValid(event) {
//        console.log('In ActionTrade.onSizeChangeValid this=',this);
//        console.log('state=',this.state);
        this.setState({
            default_est: parseFloat(event.target.value),
            isSizeInvalid: false,
        });
    }
    
    onSizeChangeInvalid(event) {
//        console.log('In ActionTrade.onSizeChangeInvalid this=',this);
//        console.log('state=',this.state);
        this.setState({
            isSizeInvalid: true,
        });
    }

    //===========================================================
    // Feasible Modal
    //===========================================================
    
    onFeasibleRestart() {
//        console.log('In ActionTrade.onFeasibleRestart this=',this);
//        console.log('state=',this.state);
        var design;
        var element;
        const { store } = this.context;
        design = store.getState();
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                this.props.changeSymbolConstraint(element.name, MIN, this.state.tc[i]);
            } else {
                this.props.changeSymbolConstraint(element.name, MAX, this.state.tc[i]);
            }
        }
        this.props.restoreInputSymbolValues();
        this.commonViolationSetup();
        this.commonArbitraryOrProportional(this.state.dir);
        this.setState({
            feasibleModal: !this.state.feasibleModal,
            sizeModal: !this.state.sizeModal
        });
    }

    onFeasibleDone() {
//        console.log('In ActionTrade.onFeasibleDone this=',this);
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
//        console.log('In ActionTrade.onEstablishAccept this=',this);
//        console.log('state=',this.state);
        var design;
        var ncode;
        const { store } = this.context;
//        design = store.getState();
//        this.props.search();
        design = store.getState(); // Re-access store to get latest element values
        if (design.model.result.objective_value <= design.model.system_controls.objmin) {
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
//      console.log('In ActionTrade.onEstablishDone this=',this);
//      console.log('state=',this.state);
      this.props.restoreInputSymbolValues();
      var design;
      var element;
      var ncode;
      const { store } = this.context;
      design = store.getState();
      for (let i = 0; i < this.state.nviol; i++) {
          let j = this.state.vflag[i];
          element = design.model.symbol_table[j];
          if (this.state.ldir[i] < 0) {
              this.props.changeSymbolConstraint(element.name, MIN, this.state.tc[i]);
          } else {
              this.props.changeSymbolConstraint(element.name, MAX, this.state.tc[i]);
          }
      }
      this.props.restoreInputSymbolValues();
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
//        console.log('In ActionTrade.onNotFeasibleRestart this=',this);
//        console.log('state=',this.state);
        var design;
        const { store } = this.context;
        design = store.getState();
        var element;
        for (let i = 0; i < this.state.nviol; i++) {
            let j = this.state.vflag[i];
            element = design.model.symbol_table[j];
            if (this.state.ldir[i] < 0) {
                this.props.changeSymbolConstraint(element.name, MIN, this.state.tc[i]);
            } else {
                this.props.changeSymbolConstraint(element.name, MAX, this.state.tc[i]);
            }
        }
        this.props.restoreInputSymbolValues();
        this.commonViolationSetup()
        this.setState({
            notFeasibleModal: !this.state.notFeasibleModal,
            strategyModal: !this.state.strategyModal
        });
    }
    
    onNotFeasibleRepeat() {
//      console.log('In ActionTrade.onNotFeasibleRepeat this=',this);
//      console.log('state=',this.state);
//      this.props.saveInputSymbolValues();
      this.commonViolationSetup()
      this.setState({
          notFeasibleModal: !this.state.notFeasibleModal,
          strategyModal: !this.state.strategyModal
      });
  }
  
    onNotFeasibleDone() {
//        console.log('In ActionTrade.onNotFeasibleDone this=',this);
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
//        console.log('In ActionTrade.render this=',this);
        var design;
        const { store } = this.context;
        design = store.getState();

        var display_search_button;
        if (this.props.objective_value > this.props.system_controls.objmin) {
            display_search_button = true;
        } else {
            display_search_button = false;
        }

        return (
            <>
                <NavDropdown.Item onClick={this.strategyToggle} disabled={!display_search_button}>
                    Trade&hellip;
                </NavDropdown.Item>
                {/*==================================================*/}
                {/*=====================strategy=====================*/}
                {/*==================================================*/}
                <Modal show={this.state.strategyModal} size="lg" onHide={this.onStrategyDone}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Strategy
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Specify your trade strategy:<br/>
                        <ul>
                            <li>Help - View Trade information in a new tab</li>
                            <li>Proportional - relax constraints in proportion to their current violation</li>
                            <li>Arbitrary - relax constraints in a specified ratio</li>
                            <li>Existing - relax constraints to the point of the existing violations</li>
                            <li>Done - return to main page</li>
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="outline-info" onClick={this.onStrategyContextHelp}>Help</Button>{' '}
                        <Button variant="secondary" onClick={this.onStrategyDone}> &nbsp; Done &nbsp; </Button>{' '}
                        <Button variant="secondary" onClick={this.onStrategyExisting}>Existing</Button>{' '}
                        <Button variant="info" onClick={this.onStrategyArbitrary}>Arbitrary</Button>{' '}
                        <Button variant="primary" onClick={this.onStrategyProportional}>Proportional</Button>
                    </Modal.Footer>
                </Modal>
                {/*==================================================*/}
                {/*=====================arbitrary====================*/}
                {/*==================================================*/}
                <Modal show={this.state.arbitraryModal} onHide={this.onNoop}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Arbitrary
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col className="text-left font-weight-bold align-middle" xs="4">Name</Col>
                                <Col className="text-left font-weight-bold align-middle" xs="2"></Col>
                                <Col className="text-right font-weight-bold align-middle" xs="6">Weight</Col>
                            </Row>
                            {
                                this.state.vflag.map((j,i) => {
                                    var design;
                                    var element;
                                    var dname;
                                    const { store } = this.context;
                                    design = store.getState();
                                    element = design.model.symbol_table[j];
                                    dname = element.name;
                                    return (
                                        <Row key={dname}>
                                            <Col className="align-middle text-left" xs="4">{dname}</Col>
                                            <Col className="align-middle text-left" xs="2">{this.state.ldir[i] < 0 ? 'MIN' : 'MAX'}</Col>
                                            <Col className="align-middle text-right" xs="6">
                                                <FormControlTypeNumber value={Math.abs(this.state.dir[i])} onChangeValid={(event) => {this.onArbitraryChangeValid(i, event)}} onChangeInvalid={(event) => {this.onArbitraryChangeInvalid(i, event)}}/>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onArbitraryCancel}>Cancel</Button>{' '}
                        <Button variant="primary" onClick={this.onArbitraryContinue} disabled={this.state.arbitraryContinueDisabled}>Continue</Button>
                    </Modal.Footer>
                </Modal>
                {/*==================================================*/}
                {/*=======================size=======================*/}
                {/*==================================================*/}
                <Modal show={this.state.sizeModal} onHide={this.onNoop}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Size
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Enter local exploration step size (%)<br/>
                        Possibilities range from {(90.0 * this.state.smallest).toFixed(2)} to {(100.0 * this.state.bigest).toFixed(2)}<br/>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    Default
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControlTypeNumber value={this.state.default_est_percent} onChangeValid={this.onSizeChangeValid} onChangeInvalid={this.onSizeChangeInvalid}/>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onSizeCancel}>Cancel</Button>{' '}
                        <Button variant="primary" disabled={this.state.isSizeInvalid || this.state.default_est_percent / 100.0 < design.model.system_controls.smallnum} onClick={this.onSizeContinue}>Continue</Button>
                    </Modal.Footer>
                </Modal>
                {/*==================================================*/}
                {/*=====================feasible=====================*/}
                {/*==================================================*/}
                <Modal show={this.state.feasibleModal} onHide={this.onNoop}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Feasible
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        A feasible point has been established.<br/>
                        <ul>
                            <li>Done - To return with these constraints</li>
                            <li>Resize - Enter a smaller local exploration step size</li>
                        </ul>
                        {this.list_constraints()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onFeasibleRestart}>Resize</Button>{' '}
                        <Button variant="primary" onClick={this.onFeasibleDone}> &nbsp; Done &nbsp; </Button>
                    </Modal.Footer>
                </Modal>
                {/*==================================================*/}
                {/*=====================establish====================*/}
                {/*==================================================*/}
                <Modal show={this.state.establishModal} onHide={this.onNoop}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Establish
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Do you wish to establish this set of constraints?
                        <ul>
                            <li>Accept - establish this set of constraints</li>
                            <li>Done - Return to the main page with previously established constraints</li>
                        </ul>
                        {this.list_constraints()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onEstablishDone}> &nbsp; Done &nbsp; </Button>{' '}
                        <Button variant="primary" onClick={this.onEstablishAccept}>Accept</Button>
                    </Modal.Footer>
                </Modal>
                {/*==================================================*/}
                {/*====================notFeasible===================*/}
                {/*==================================================*/}
                <Modal show={this.state.notFeasibleModal} onHide={this.onNoop}>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <img src="favicon.ico" alt="Open Design Optimization Platform (ODOP) icon"/> &nbsp; Action : Trade : Not Feasible
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        The result is not feasible: obj = { parseFloat(design.model.result.objective_value).toFixed(6) }<br/>
                        <ul>
                            <li>Done &nbsp; - To return to the main page with these constraints</li>
                            <li>Repeat - To repeat Trade with these constraints</li>
                            <li>Restart - To restart Trade with the previously established constraints</li>
                        </ul>
                        {this.list_constraints()}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.onNotFeasibleRestart}>Restart</Button>{' '}
                        <Button variant="secondary" onClick={this.onNotFeasibleRepeat}>Repeat</Button>{' '}
                        <Button variant="primary" onClick={this.onNotFeasibleDone}> &nbsp; Done &nbsp; </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

//    clister() {
//        var design;
//        var element;
//        const { store } = this.context;
//        design = store.getState();
//        console.log('CONSTRAINT                % VIOLATION           LEVEL');
//        for (let i = 0; i < this.state.nviol; i++) {
//            let j = this.state.vflag[i];
//            element = design.model.symbol_table[j];
//            if (this.state.ldir[i] < 0) {
//                console.log(element.name + ' MIN ' + element.vmin * 100.0 + ' ' + element.cmin + ' ' + element.units);
//            } else {
//                console.log(element.name + ' MAX ' + element.vmax * 100.0 + ' ' + element.cmax + ' ' + element.units);
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
                        var element;
                        var constraint_class;
                        const { store } = this.context;
                        design = store.getState();
                        element = design.model.symbol_table[j];
                        if (this.state.ldir[i] < 0) {
//                                console.log(element.name + ' MIN ' + element.vmin * 100.0 + ' ' + element.cmin + ' ' + element.units);
                            if (design.model.result.objective_value < design.model.system_controls.objmin) {
                                constraint_class = (element.lmin & CONSTRAINED && element.vmin > 0.0) ? 'text-low-danger align-middle text-right' : 'text-right';
                            } else {
                                constraint_class = (element.lmin & CONSTRAINED && element.vmin > 0.0) ? 'text-danger align-middle text-right font-weight-bold' : 'text-right';
                            }
                            return (
                                    <Row key={element.name}>
                                        <Col className="align-middle text-left" xs="3">{element.name}</Col>
                                        <Col className="align-middle text-left" xs="1">MIN</Col>
                                        <Col className="align-middle text-right" xs="3">{(element.vmin * 100.0).toFixed(1)}%</Col>
                                        <Col className={constraint_class} xs="3">{element.cmin.toFixed(4)}</Col>
                                        <Col className="align-middle text-right" xs="2">{element.units}</Col>
                                    </Row>
                                );
                        } else {
//                                console.log(element.name + ' MAX ' + element.vmax * 100.0 + ' ' + element.cmax + ' ' + element.units);
                            if (design.model.result.objective_value < design.model.system_controls.objmin) {
                                constraint_class = (element.lmax & CONSTRAINED && element.vmax > 0.0) ? 'text-low-danger align-middle text-right' : 'text-right';
                            } else {
                                constraint_class = (element.lmax & CONSTRAINED && element.vmax > 0.0) ? 'text-danger align-middle text-right font-weight-bold' : 'text-right';
                            }
                            return (
                                    <Row key={element.name}>
                                        <Col className="align-middle text-left" xs="3">{element.name}</Col>
                                        <Col className="align-middle text-left" xs="1">MAX</Col>
                                        <Col className="align-middle text-right" xs="3">{(element.vmax * 100.0).toFixed(1)}%</Col>
                                        <Col className={constraint_class} xs="3">{element.cmax.toFixed(4)}</Col>
                                        <Col className="align-middle text-right" xs="2">{element.units}</Col>
                                    </Row>
                                );
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
    system_controls: state.model.system_controls,
    objective_value: state.model.result.objective_value,
});

const mapDispatchToProps = {
    changeSymbolConstraint: changeSymbolConstraint,
    saveInputSymbolValues: saveInputSymbolValues,
    restoreInputSymbolValues: restoreInputSymbolValues,
    changeResultTerminationCondition: changeResultTerminationCondition,
    search: search,
    saveAutoSave: saveAutoSave
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionTrade);
