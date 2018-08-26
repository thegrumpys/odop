import React from 'react';
import { Table, UncontrolledTooltip  } from 'reactstrap';
import NameValueUnitsRowConstant from './NameValueUnitsRowConstant';
import NameValueUnitsRowDesignParameter from './NameValueUnitsRowDesignParameter';
import NameValueUnitsRowStateVariable from './NameValueUnitsRowStateVariable';
import { connect } from 'react-redux';

export class NameValueUnitsTable extends React.Component {
    
    render() {
        return (
            <React.Fragment>
                <Table className="col-md-6 border border-secondary" size="sm">
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="6" id="IVTitle">Independent Variables</th>
                        </tr>
                        <tr>
                            <th className="text-left" colSpan="2" id="NameTitle">Name</th>
                            <th className="text-center" colSpan="2" id="ValueTitle">Value (Fix)</th>
                            <th className="text-left" id="UnitsTitle">Units</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.design_parameters.map((design_parameter,index) => {design_parameter.lmin & EQUATIONSET && <NameValueUnitsRowDesignParameter key={design_parameter.name} design_parameter={design_parameter} index={index} />})}
                    </tbody>
                    <thead>
                        <tr>
                            <th className="text-center bg-secondary text-white" colSpan="6" id="DVTitle">Dependent Variables</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.state_variables.map((state_variable,index) => {state_variable.lmin & EQUATIONSET && <NameValueUnitsRowStateVariable key={state_variable.name} state_variable={state_variable} index={index} />})}
                    </tbody>
                    <thead>
                        { (this.props.design_parameters.reduce((accum,design_parameter)=>{!(design_parameter.lmin & EQUATIONSET) ? return accum+1 : return accum}, 0) > 0 || 
                           this.props.state_variables.reduce((accum,state_variable)=>{!(state_variable.lmin & EQUATIONSET) ? return accum+1 : return accum}, 0) > 0) &&
                            (<tr>
                                <th className="text-center bg-secondary text-white" colSpan="6" id="CITitle">Calculation Inputs</th>
                                <UncontrolledTooltip placement="top" target="CITitle">Calculation Inputs Title ToolTip</UncontrolledTooltip>
                            </tr>)
                        }
                    </thead>
                    <tbody>
                        {this.props.design_parameters.map((design_parameter,index) => {!(design_parameter.lmin & EQUATIONSET) && <NameValueUnitsRowConstant key={design_parameter.name} constant={design_parameter} index={index} />})}
                        {this.props.state_variables.map((state_variable,index) => {!(state_variable.lmin & EQUATIONSET) && <NameValueUnitsRowConstant key={state_variable.name} constant={state_variable} index={index} />})}
                    </tbody>
                </Table>
                <UncontrolledTooltip placement="top" target="IVTitle">Inputs to design equations</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="NameTitle">Variable names</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="ValueTitle">Current values <br /> (Check box at right to FIX)</UncontrolledTooltip>
                <UncontrolledTooltip placement="bottom" target="UnitsTitle">Units (information only)</UncontrolledTooltip>
                <UncontrolledTooltip placement="top" target="DVTitle">Outputs from design equations</UncontrolledTooltip>
            </React.Fragment>
        );
    }
    
}

const mapStateToProps = state => ({
    design_parameters: state.design_parameters,
    state_variables: state.state_variables
});

export default connect(mapStateToProps)(NameValueUnitsTable);
