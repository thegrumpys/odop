import React from 'react';
import { DropdownItem, Modal, ModalHeader, ModalBody, ModalFooter, InputGroup, InputGroupAddon, InputGroupText, Input, ButtonGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { changeResultTerminationCondition, 
    trade } from '../../store/actionCreators';

class ActionTrade extends React.Component {
    constructor(props) {
        super(props);
        this.strategyToggle = this.strategyToggle.bind(this);
        this.onStrategyCancel = this.onStrategyCancel.bind(this);
        this.onStrategyExisting = this.onStrategyExisting.bind(this);
        this.onStrategyArbitrary = this.onStrategyArbitrary.bind(this);
        this.onStrategyProportional = this.onStrategyProportional.bind(this);
        this.state = {
                strategyModal: false,
            };
    }
    
    strategyToggle() {
//        this.setState({ nviol: 0 });
//        for (let i = 0; i < this.props.design.design_parameters.length; i++) {
//            dp = this.props.design.design_parameters[i];
//            if (dp.lmin & CONSTRAINED && dp.vmin > 0.0) {
//                nviol++
//                vflag[nviol - 1] = i;
//                ldir[nviol - 1] = -1;
//            } else if (dp.lmax & CONSTRAINED && dp.vmax > 0.0) {
//                nviol++
//                vflag[nviol - 1] = i;
//                ldir[nviol - 1] = +1;
//            }
//        }
//        for (let i = 0; i < this.props.design.state_variables.length; i++) {
//            sv = this.props.design.state_variables[i];
//            if (sv.lmin & CONSTRAINED && sv.vmin > 0.0) {
//                nviol++
//                vflag[nviol - 1] = i + this.props.design.design_parameters.length;
//                ldir[nviol - 1] = -1;
//            } else if (sv.lmax & CONSTRAINED && sv.vmax > 0.0) {
//                nviol++
//                vflag[nviol - 1] = i + this.props.design.design_parameters.length;
//                ldir[nviol - 1] = +1;
//            }
//        }
        if (this.props.design.result.objective_value <= this.props.design.system_controls.objmin /* || this.state.nviol === 0 */) {
            var ncode = 'OBJ < OBJMIN - USE OF TRADE IS NOT APPROPRIATE';
            this.props.changeResultTerminationCondition(ncode);
        } else {
            this.setState({
                strategyModal: !this.state.strategyModal
            });
        }
    }

    onStrategyCancel() {
        console.log('In onStrategyCancel');
        this.setState({
            strategyModal: !this.state.strategyModal
        });
        var ncode = 'NO ACTION REQUESTED';
        this.props.changeResultTerminationCondition(ncode);
    }

    onStrategyExisting() {
        console.log('In onStrategyExisting');
        this.setState({
            strategyModal: !this.state.strategyModal
        });
        var ncode = 'CONSTRAINT LEVELS RELAXED TO EXISTING VIOLATIONS';
        this.props.changeResultTerminationCondition(ncode);
    }

    onStrategyArbitrary() {
        console.log('In onStrategyArbitrary');
        this.setState({
            strategyModal: !this.state.strategyModal
        });
    }

    onStrategyProportional() {
        console.log('In onStrategyProportional');
        this.setState({
            strategyModal: !this.state.strategyModal
        });
    }

    render() {
        return (
            <React.Fragment>
                <DropdownItem onClick={this.strategyToggle}>
                    Trade
                </DropdownItem>
                <Modal isOpen={this.state.strategyModal} className={this.props.className}>
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
            </React.Fragment>
        );
    }
}  

const mapStateToProps = state => ({
    design: state
});

const mapDispatchToProps = {
    changeResultTerminationCondition: changeResultTerminationCondition,
    trade: trade
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionTrade);
